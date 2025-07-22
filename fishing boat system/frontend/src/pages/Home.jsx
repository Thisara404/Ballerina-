import React from 'react';
import Navibar from '../components/Navbar'; 
import Foot from '../components/Footer'; 
import Body from '../components/Homebody'; 

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen"> 
            <Navibar /> {/* Navbar at the top */}

            <main className="flex-grow flex flex-col items-center justify-center text-center  bg-gray-100"> {/* Main content area */}
                
                
              
                <Body /> 
                
            </main>

            <Foot /> {/* Footer at the bottom */}
        </div>
    );
};

export default Home;
