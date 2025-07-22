import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Navibar from '../components/Navbar';
import Leftbar from '../components/Sidebar';
import Foot from '../components/Footer';

const Market = () => {
    const [fishDetails, setFishDetails] = useState({ category: '', weight: '', price: '', status: 'Unsent' });
    const [fishList, setFishList] = useState([]);
    const [selectedFish, setSelectedFish] = useState([]);
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const form = useRef();

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const fishResponse = await fetch('http://localhost:9091/fish');
            const fishData = await fishResponse.json();
            setFishList(fishData);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFishDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      const { category, weight, price } = fishDetails;
      if (!category || !weight || !price) {
          alert('Please fill in all fields.');
          return;
      }
  
      if (editingIndex !== null) {
          // Fish exists, perform update (PUT)
          try {
              const response = await fetch(`http://localhost:9091/fish/${fishList[editingIndex].id}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      category: fishDetails.category,
                      weight: String(fishDetails.weight), // Convert to string
                      price: String(fishDetails.price), // Convert to string
                      status: 'Unsent', // Include other necessary fields
                  }),
              });
  
              if (response.ok) {
                  fetchResources();
                  setFishDetails({ category: '', weight: '', price: '', status: 'Unsent' });
                  setEditingIndex(null); // Reset editing index to null after update
              } else {
                  const errorMessage = await response.text();
                  alert(`Error updating fish details: ${errorMessage}`);
              }
          } catch (error) {
              console.error('Error updating fish:', error);
              alert('Failed to update the fish. Please try again.');
          }
      } else {
          // Fish doesn't exist, perform insert (POST)
          try {
              const response = await fetch('http://localhost:9091/fish', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      category: fishDetails.category,
                      weight: String(fishDetails.weight), // Convert to string
                      price: String(fishDetails.price), // Convert to string
                      status: 'Unsent', // Include other necessary fields
                  }),
              });
  
              if (response.ok) {
                  fetchResources();
                  setFishDetails({ category: '', weight: '', price: '', status: 'Unsent' });
              } else {
                  const errorMessage = await response.text();
                  alert(`Error adding fish details: ${errorMessage}`);
              }
          } catch (error) {
              console.error('Error submitting form:', error);
              alert('Failed to submit the form. Please try again.');
          }
      }
  };
  

    const handleFishSelection = (fish) => {
        setSelectedFish((prevSelected) =>
            prevSelected.includes(fish) ? prevSelected.filter(f => f !== fish) : [...prevSelected, fish]
        );
    };

    const editFish = (index) => {
        const fishToEdit = fishList[index];
        setFishDetails(fishToEdit);
        setEditingIndex(index); // Set editing index to track which fish is being edited
    };

    const deleteFish = async (id) => {
        try {
            const response = await fetch(`http://localhost:9091/fish/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchResources();
            } else {
                alert('Error deleting fish');
            }
        } catch (error) {
            console.error('Error deleting fish:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const sendEmail = async (e) => {
      e.preventDefault();
  
      if (email === '' || selectedFish.length === 0 || description === '') {
          alert("Please provide a valid email, select at least one fish, and include a description.");
          return;
      }
  
      const formattedFishList = selectedFish.map(fish => ({
          category: fish.category,
          weight: fish.weight,
          price: fish.price,
      }));
  
      try {
          // Send email using EmailJS
          await emailjs.send('service_boipo9n', 'template_z8mqjvf', {
              user_email: email,
              description: description,
              fish_list: formattedFishList
          }, 'V0aH9P1Nyp91tM_IB');
  
          // Update the status of selected fish to 'Sent' in the database
          await Promise.all(selectedFish.map(async (fish) => {
              // Find the index of the fish in the fishList
              const fishIndex = fishList.findIndex(f => f.id === fish.id);
              
              if (fishIndex !== -1) {
                  const response = await fetch(`http://localhost:9091/fish/${fishList[fishIndex].id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          category: fishList[fishIndex].category,
                          weight: String(fishList[fishIndex].weight), // Convert to string
                          price: String(fishList[fishIndex].price), // Convert to string
                          status: 'Sent', // Update the status to 'Sent'
                      }),
                  });
  
                  if (!response.ok) {
                      const errorMessage = await response.text();
                      console.error('Error updating fish status in the database:', errorMessage);
                      throw new Error('Error updating fish status in the database');
                  }
              }
          }));
  
          // Update the state to reflect the changes
          const updatedFishList = fishList.map(fish => {
              if (selectedFish.includes(fish)) {
                  return { ...fish, status: 'Sent' }; // Update status to 'Sent' in the local state
              }
              return fish;
          });
          setFishList(updatedFishList);
          setSelectedFish([]);
          setDescription('');
          setEmail('');
          alert('Email sent successfully and status updated!');
      } catch (error) {
          console.error('Error sending email or updating status:', error);
          alert('Failed to send email or update fish status. Please try again.');
      }
  };
  
  

 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <Navibar />
        <div className="flex flex-grow pt-16">
            <Leftbar />
            <main className="flex-grow p-4 sm:p-6 lg:p-8 sm:ml-64  bg-gray-200">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="border-b-2 border-gray-200 pb-4 mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gray-900 text-center">
                            Market Access
                        </h1>
                        <p className="text-gray-600 text-center">
                            Add fish details and send them to the market via email.
                        </p>
                    </div>

                    {/* Add Fish Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                            Add New Fish
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                            <input
                                type="text"
                                name="category"
                                value={fishDetails.category}
                                onChange={handleInputChange}
                                placeholder="Fish Category"
                                className="w-full sm:w-1/4 px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                required
                            />
                            <input
                                type="number"
                                name="weight"
                                value={fishDetails.weight}
                                onChange={handleInputChange}
                                placeholder="Weight (kg)"
                                className="w-full sm:w-1/4 px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                value={fishDetails.price}
                                onChange={handleInputChange}
                                placeholder="Price (LKR)"
                                className="w-full sm:w-1/4 px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out focus:ring-4 focus:ring-blue-300 border border-blue-700"
                            >
                                {editingIndex !== null ? 'Update Fish' : 'Add Fish'}
                            </button>
                        </form>
                    </div>

                    {/* Fish List */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                            Fish List
                        </h2>
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-500 border-b border-gray-200">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200">Select</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200">Category</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200">Weight (kg)</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200">Price (LKR)</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border-r border-gray-200">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {fishList.map((fish, index) => (
                                        <tr key={fish.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-4 py-3 border-r border-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFish.includes(fish)}
                                                    onChange={() => handleFishSelection(fish)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{fish.category}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{fish.weight}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{fish.price}</td>
                                            <td className="px-4 py-3 border-r border-gray-200">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${
                                                    fish.status === 'Sent' 
                                                        ? 'bg-green-100 text-green-800 border-green-200' 
                                                        : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                                }`}>
                                                    {fish.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <button 
                                                    onClick={() => editFish(index)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3 border-b border-transparent hover:border-blue-900"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => deleteFish(fish.id)}
                                                    className="text-red-600 hover:text-red-900 border-b border-transparent hover:border-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Email Form */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 text-gray-900">
                            Send Email
                        </h2>
                        <form onSubmit={sendEmail} className="space-y-4">
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required
                                />
                            </div>
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Description"
                                    rows="4"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required
                                />
                            </div>
                            <div className="flex justify-end pt-4 border-t border-gray-200">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out focus:ring-4 focus:ring-blue-300 border border-blue-700"
                                >
                                    Send Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
        <div className="sm:ml-64 border-t border-gray-200">
            <Foot />
        </div>
    </div>
);
};

export default Market;



