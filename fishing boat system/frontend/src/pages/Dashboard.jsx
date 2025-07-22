
import Navibar from '../components/Navbar';
import Leftbar from '../components/Sidebar';
import Foot from '../components/Footer';

import FlowDiagram from '../components/Flowdiagram';


const Settings = () => {
    return (
        <>
        <div className="flex flex-col h-screen"> {/* Full height layout */}
      <Navibar /> {/* Navbar at the top */}
      <div className="flex flex-grow mt-16  bg-gray-200"> {/* Main content area */}
        <Leftbar /> {/* Sidebar on larger screens */}
        <div className="flex-grow bg-gray-200 sm:ml-64 flex flex-col pt-10 mt-10"> {/* Main content area */}
          
          <FlowDiagram /> {/* Flow diagram */}
          
        </div>
      </div>
      <div className="mt-auto sm:ml-64"> {/* Ensures the footer is at the bottom and matches sidebar width */}
        <Foot /> {/* Footer at the bottom of the viewport */}
      </div>
    </div>
      </>
    );
};

export default Settings;