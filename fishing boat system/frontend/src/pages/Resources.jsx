import { useState, useEffect } from 'react';
import Navibar from '../components/Navbar';
import Leftbar from '../components/Sidebar';
import Foot from '../components/Footer';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('boats');
  const [boats, setBoats] = useState([]);
  const [gearInventory, setGearInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', weight: '', registrationNumber: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const boatsResponse = await fetch('http://localhost:9091/boats');
      const gearResponse = await fetch('http://localhost:9091/gear');
      const boatsData = await boatsResponse.json();
      const gearData = await gearResponse.json();

      setBoats(boatsData);
      setGearInventory(gearData);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleAddNewItem = () => {
    setShowForm(true);
    setNewItem({ name: '', weight: '', registrationNumber: '' });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewItem({ name: '', weight: '', registrationNumber: '' });
    setIsEditing(false);
  };

  const handleFormSubmit = async () => {
    try {
      if (activeTab === 'boats') {
        if (isEditing) {
          const response = await fetch(`http://localhost:9091/boats/${boats[editingIndex].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
          });
          if (response.ok) fetchResources();
        } else {
          const response = await fetch('http://localhost:9091/boats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
          });
          if (response.ok) fetchResources();
        }
      } else if (activeTab === 'gear') {
        if (isEditing) {
          const response = await fetch(`http://localhost:9091/gear/${gearInventory[editingIndex].id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newItem.name }),
          });
          if (response.ok) fetchResources();
        } else {
          const response = await fetch('http://localhost:9091/gear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newItem.name }),
          });
          if (response.ok) fetchResources();
        }
      }
      setNewItem({ name: '', weight: '', registrationNumber: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEditItem = (index) => {
    if (activeTab === 'boats') {
      setNewItem({
        name: boats[index].name,
        weight: boats[index].weight,
        registrationNumber: boats[index].registrationNumber,
      });
    } else if (activeTab === 'gear') {
      setNewItem({ name: gearInventory[index].name });
    }
    setEditingIndex(index);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteItem = async (index) => {
    try {
      if (activeTab === 'boats') {
        await fetch(`http://localhost:9091/boats/${boats[index].id}`, { method: 'DELETE' });
      } else if (activeTab === 'gear') {
        await fetch(`http://localhost:9091/gear/${gearInventory[index].id}`, { method: 'DELETE' });
      }
      fetchResources();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navibar />
      <div className="flex flex-grow mt-16">
        <Leftbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 sm:ml-64  bg-gray-200">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8">
              My Resources
            </h1>

            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['boats', 'gear'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-1 sm:flex-none px-6 py-3 text-lg font-medium rounded-lg
                    transition-all duration-200 transform hover:scale-105
                    ${activeTab === tab 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            {activeTab === 'boats' && (
  <div className="overflow-x-auto">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Boat List</h2>
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Weight</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Registration</th>
          <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {boats.map((boat, index) => (
          <tr
            key={boat.id}
            className="bg-gray-50 hover:bg-gray-200 transition-colors"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {boat.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {boat.weight}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {boat.registrationNumber}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
              <button
                onClick={() => handleEditItem(index)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(index)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


              {activeTab === 'gear' && (
                <div >
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gear Inventory</h2>
                  <div className="space-y-2">
                    {gearInventory.map((gear, index) => (
                      <div
                        key={gear.id}
                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <span className="text-gray-900 font-medium">{gear.name}</span>
                        <div className="space-x-3">
                          <button
                            onClick={() => handleEditItem(index)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(index)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Button */}
              <button
                onClick={handleAddNewItem}
                className="mt-6 px-6 py-3 bg-green-400 text-white rounded-lg font-medium
                  hover:bg-green-600 transform transition-all duration-200 hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Add New {activeTab.slice(0, -0.1)}
              </button>

              {/* Form Modal */}
              {showForm && (
                <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    {isEditing ? 'Edit' : 'Add New Item'} 
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {activeTab === 'boats' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Weight
                          </label>
                          <input
                            type="text"
                            value={newItem.weight}
                            onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                              focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Registration Number
                          </label>
                          <input
                            type="text"
                            value={newItem.registrationNumber}
                            onChange={(e) => setNewItem({ ...newItem, registrationNumber: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
                              focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={handleFormSubmit}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium
                          hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 
                          focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {isEditing ? 'Update' : 'Submit'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium
                          hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 
                          focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="sm:ml-64">
        <Foot />
      </div>
    </div>
  );
};

export default Resources;