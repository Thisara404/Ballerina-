import ballerina/http;
import ballerina/io;
import ballerina/log;
import ballerina/uuid;
import ballerinax/mongodb;
import ballerina/os;  // Add this import

// Get connection string from environment variable
configurable string connectionString = os:getEnv("MONGODB_CONNECTION_STRING");

// Initialize the MongoDB client
final mongodb:Client mongoDb = check new ({
    connection: connectionString
});

// Define CORS configuration
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowHeaders: ["REQUEST_ID", "Content-Type"],
        exposeHeaders: ["RESPONSE_ID"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        maxAge: 84900
    }
}

service / on new http:Listener(9091) {
    private final mongodb:Database FisherMateDb;

    function init() returns error? {
        self.FisherMateDb = check mongoDb->getDatabase("FisherMateDB");
        io:println("MongoDB connected to FisherMateDB");
    }

    resource function options events(http:Caller caller, http:Request req) returns error? {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "REQUEST_ID, Content-Type");
        check caller->respond(res);
    }

    function init() returns error? {
        // Log connection string (masked for security)
        string maskedConnectionString = "";
        int? atIndex = connectionString.indexOf("@");
        int? protocolIndex = connectionString.indexOf("://");
        
        if atIndex is int && protocolIndex is int {
            maskedConnectionString = connectionString.substring(0, protocolIndex + 3) + "***:" + connectionString.substring(atIndex);
        } else {
            maskedConnectionString = "mongodb://***";
        }
        
        io:println("Attempting to connect to MongoDB with connection string: " + maskedConnectionString);
        
        // Initialize database connection
        self.FisherMateDb = check mongoDb->getDatabase("FisherMateDB");
        
        // Log connection status
        log:printInfo("MongoDB client initialized successfully");
        io:println("MongoDB connected to FisherMateDB");
    }
        User? existingUser = check users->findOne({email: input.email});

        if (existingUser is User) {
            return error("Email is already in use.");
        }

        // If email doesn't exist, proceed to create the user without hashing the password
        string id = uuid:createType1AsString();
        User user = {id, ...input}; // Store the password as is
        check users->insertOne(user);
        return {id: id};
    }

    resource function post boats(@http:Payload BoatInput input) returns Boat|error {
        mongodb:Collection boats = check self.FisherMateDb->getCollection("boats");
        string id = uuid:createType1AsString();
        Boat boat = {id, ...input};
        check boats->insertOne(boat);
        return boat;
    }

    resource function get boats() returns Boat[]|error {
        mongodb:Collection boats = check self.FisherMateDb->getCollection("boats");
        stream<Boat, error?> result = check boats->find();
        Boat[] boatList = [];
        int count = 0;
        check result.forEach(function(Boat|error boat) {
            if (boat is Boat) {
                boatList.push(boat);
                count += 1;
            } else {
                log:printError(string `Error processing boat: ${boat.message()}`, 'error = boat);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} events`);
        return boatList;
    }

    resource function put boats/[string id](@http:Payload BoatUpdate update) returns Boat|error {
        mongodb:Collection boats = check self.FisherMateDb->getCollection("boats");
        // Create a map<json> to hold the fields to update.
        map<json> updateFields = {};
        if update.name is string {
            updateFields["name"] = update.name;
        }
        if update.weight is string {
            updateFields["weight"] = update.weight;
        }
        if update.registrationNumber is string {
            updateFields["registrationNumber"] = update.registrationNumber;
        }

        mongodb:UpdateResult updateResult = check boats->updateOne({id}, {set: updateFields});
        if updateResult.modifiedCount != 1 {
            return error(string `Failed to update the event with id ${id}`);
        }
        return getBoat(self.FisherMateDb, id);
    }

    // Handle user login
    resource function post login(LoginInput input) returns json|error {
        mongodb:Collection users = check self.FisherMateDb->getCollection("fisherman");
        User? user = check users->findOne({email: input.email, password: input.password}); // Directly match the plain text password

        if (user is User) {
            return {id: user.id}; // Return user ID on successful login
        } else {
            return error("Invalid email or password"); // Return error message for failed login
        }
    }

    // Add this function to your Ballerina service
    resource function get user() returns User[]|error {
        mongodb:Collection users = check self.FisherMateDb->getCollection("fisherman");

        stream<User, error?> result = check users->find();
        User[] userList = [];

        int count = 0;
        check result.forEach(function(User|error user) {
            if (user is User) {
                userList.push(user);
                count += 1;
            } else {
                log:printError(string `Error processing user: ${user.message()}`, 'error = user);
            }
        });

        log:printInfo(string `Successfully retrieved ${count} users`);
        return userList;
    }

    resource function put user/[string id](@http:Payload UserUpdate update) returns User|error {
        mongodb:Collection users = check self.FisherMateDb->getCollection("fisherman");
        // Create a map<json> to hold the fields to update.
        map<json> updateFields = {};
        if update.firstName is string {
            updateFields["firstName"] = update.firstName;
        }
        if update.lastName is string {
            updateFields["lastName"] = update.lastName;
        }
        if update.phoneNumber is string {
            updateFields["phoneNumber"] = update.phoneNumber;
        }
        if update.registrationNumber is string {
            updateFields["registrationNumber"] = update.registrationNumber;
        }
        if update.email is string {
            updateFields["email"] = update.email;
        }
        if update.password is string {
            updateFields["password"] = update.password;
        }
        if update.address is string {
            updateFields["address"] = update.address;
        }
        if update.dob is string {
            updateFields["dob"] = update.dob;
        }
        if update.profilePhoto is string {
            updateFields["profilePhoto"] = update.profilePhoto;
        }

        mongodb:UpdateResult updateResult = check users->updateOne({id}, {set: updateFields});
        if updateResult.modifiedCount != 1 {
            return error(string `Failed to update the user with id ${id}`);
        }
        return getUser(self.FisherMateDb, id);
    }

    resource function delete user/[string id]() returns string|error {
        mongodb:Collection users = check self.FisherMateDb->getCollection("fisherman");
        mongodb:DeleteResult deleteResult = check users->deleteOne({id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the user ${id}`);
        }
        return id;
    }

    resource function delete boats/[string id]() returns string|error {
        mongodb:Collection boats = check self.FisherMateDb->getCollection("boats");
        mongodb:DeleteResult deleteResult = check boats->deleteOne({id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the boat ${id}`);
        }
        return id;
    }

    // Handle adding new gear
    resource function post gear(@http:Payload GearInput input) returns Gear|error {
        mongodb:Collection gears = check self.FisherMateDb->getCollection("gear");
        string id = uuid:createType1AsString();
        Gear gear = {id, ...input};
        check gears->insertOne(gear);
        return gear;
    }

    // Handle retrieving all gear
    resource function get gear() returns Gear[]|error {
        mongodb:Collection gears = check self.FisherMateDb->getCollection("gear");
        stream<Gear, error?> result = check gears->find();
        Gear[] gearList = [];
        int count = 0;
        check result.forEach(function(Gear|error gear) {
            if (gear is Gear) {
                gearList.push(gear);
                count += 1;
            } else {
                log:printError(string `Error processing gear: ${gear.message()}`, 'error = gear);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} gear items`);
        return gearList;
    }

    // Handle updating existing gear
    resource function put gear/[string id](@http:Payload GearUpdate update) returns Gear|error {
        mongodb:Collection gears = check self.FisherMateDb->getCollection("gear");
        // Create a map<json> to hold the fields to update.
        map<json> updateFields = {};
        if update.name is string {
            updateFields["name"] = update.name;
        }

        mongodb:UpdateResult updateResult = check gears->updateOne({id}, {set: updateFields});
        if updateResult.modifiedCount != 1 {
            return error(string `Failed to update the gear with id ${id}`);
        }
        return getGear(self.FisherMateDb, id);
    }

    // Handle deleting gear
    resource function delete gear/[string id]() returns string|error {
        mongodb:Collection gears = check self.FisherMateDb->getCollection("gear");
        mongodb:DeleteResult deleteResult = check gears->deleteOne({id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the gear ${id}`);
        }
        return id;
    }

    // Handle adding new fish
    resource function post fish(@http:Payload FishInput input) returns Fish|error {
        mongodb:Collection fishCollection = check self.FisherMateDb->getCollection("fish");
        string id = uuid:createType1AsString();
        Fish fish = {id, ...input};
        check fishCollection->insertOne(fish);
        return fish;
    }

    // Handle retrieving all fish
    resource function get fish() returns Fish[]|error {
        mongodb:Collection fishCollection = check self.FisherMateDb->getCollection("fish");
        stream<Fish, error?> result = check fishCollection->find();
        Fish[] fishList = [];
        int count = 0;
        check result.forEach(function(Fish|error fish) {
            if (fish is Fish) {
                fishList.push(fish);
                count += 1;
            } else {
                log:printError(string `Error processing fish: ${fish.message()}`, 'error = fish);
            }
        });
        log:printInfo(string `Successfully retrieved ${count} fish items`);
        return fishList;
    }

    // Handle updating existing fish
    resource function put fish/[string id](@http:Payload FishUpdate update) returns Fish|error {
        mongodb:Collection fishCollection = check self.FisherMateDb->getCollection("fish");
        // Create a map<json> to hold the fields to update.
        map<json> updateFields = {};
        if update.category is string {
            updateFields["category"] = update.category;
        }
        if update.weight is string {
            updateFields["weight"] = update.weight;
        }
        if update.price is string {
            updateFields["price"] = update.price;
        }
        if update.status is string {
            updateFields["status"] = update.status;
        }

        mongodb:UpdateResult updateResult = check fishCollection->updateOne({id}, {set: updateFields});
        if updateResult.modifiedCount != 1 {
            return error(string `Failed to update the fish with id ${id}`);
        }
        return getFish(self.FisherMateDb, id);
    }

    // Handle deleting fish
    resource function delete fish/[string id]() returns string|error {
        mongodb:Collection fishCollection = check self.FisherMateDb->getCollection("fish");
        mongodb:DeleteResult deleteResult = check fishCollection->deleteOne({id});
        if deleteResult.deletedCount != 1 {
            return error(string `Failed to delete the fish ${id}`);
        }
        return id;
    }

    resource function get fisherman/[string id]() returns User|error {
        return getUser(self.FisherMateDb, id);
    }

    // Add this to your existing service
    resource function put user/password(@http:Payload PasswordUpdate payload) returns json|error {
        mongodb:Collection users = check self.FisherMateDb->getCollection("fisherman");

        // Verify current password
        User? user = check users->findOne({password: payload.currentPassword});

        if user is () {
            return error("Current password is incorrect");
        }

        // Update password
        mongodb:UpdateResult updateResult = check users->updateOne(
        {id: user.id},
        {set: {password: payload.newPassword}}
        );

        return {message: "Password updated successfully"};
    }

}

isolated function getBoat(mongodb:Database FisherMateDb, string id) returns Boat|error {
    mongodb:Collection boats = check FisherMateDb->getCollection("boats");
    stream<Boat, error?> findResult = check boats->find({id});
    Boat[] result = check from Boat e in findResult
        select e;
    if result.length() != 1 {
        return error(string `Failed to find an boat with id ${id}`);
    }
    return result[0];
}

// Helper function to get gear by id
isolated function getGear(mongodb:Database FisherMateDb, string id) returns Gear|error {
    mongodb:Collection gears = check FisherMateDb->getCollection("gear");
    stream<Gear, error?> findResult = check gears->find({id});
    Gear[] result = check from Gear e in findResult
        select e;
    if result.length() != 1 {
        return error(string `Failed to find a gear with id ${id}`);
    }
    return result[0];
}

// Helper function to retrieve a specific fish by ID
isolated function getFish(mongodb:Database db, string id) returns Fish|error {
    mongodb:Collection fishCollection = check db->getCollection("fish");
    stream<Fish, error?> findResult = check fishCollection->find({id});
    Fish[] result = check from Fish e in findResult
        select e;
    if result.length() != 1 {
        return error(string `Failed to find a fish with id ${id}`);
    }
    return result[0];
}

// Add helper function to your Ballerina service
isolated function getUser(mongodb:Database FisherMateDb, string id) returns User|error {
    mongodb:Collection users = check FisherMateDb->getCollection("fisherman");
    stream<User, error?> findResult = check users->find({id});
    User[] result = check from User e in findResult
        select e;
    if result.length() != 1 {
        return error(string `Failed to find a user with id ${id}`);
    }
    return result[0];
}