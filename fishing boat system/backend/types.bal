// Add this type definition
public type PasswordUpdate record {|
    string currentPassword;
    string newPassword;
|};

// UserInput type for creating new users
public type UserInput record {|
    string firstName;
    string lastName;
    string phoneNumber;
    string registrationNumber;
    string email;
    string password;
    string address = "";
    string dob = "";
    string profilePhoto = "";
|};

public type UserUpdate record {|
    string firstName?;
    string lastName?;
    string phoneNumber?;
    string registrationNumber?;
    string email?;
    string password?;
    string address?;
    string dob?;
    string profilePhoto?;
|};

// LoginInput type for user login 
public type LoginInput record {|
    string email;
    string password;
|};

// User type which includes a unique ID 
public type User record {|
    readonly string id;
    *UserInput;
|};

public type BoatInput record {|
    string name;
    string weight;
    string registrationNumber;

|};

public type BoatUpdate record {|
    string name?;
    string weight?;
    string registrationNumber?;

|};

public type Boat record {|
    readonly string id;
    *BoatInput;
|};

public type GearInput record {|
    string name;
|};

public type GearUpdate record {|
    string name?;
|};

public type Gear record {|
    readonly string id;
    *GearInput;
|};

// Fish type definition
public type Fish record {|
    readonly string id;
    *FishInput;

|};

public type FishUpdate record {|
    string category?;
    string weight?;
    string price?;
    string status?;
|};

// Input types for fish
public type FishInput record {|
    string category;
    string weight;
    string price;
    string status;
|};

