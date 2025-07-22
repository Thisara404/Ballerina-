import { useState } from 'react';
import Navibar from '../components/Navbar';
import Leftbar from '../components/Sidebar';
import Foot from '../components/Footer';

const Settings = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [message, setMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setMessage('');

        if (newPassword.length < 6) {
            setMessage('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:9091/user/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setMessage('Password updated successfully');
        } catch (error) {
            setMessage('Error updating password');
        }
    };

    const handleAccountDeletion = async (e) => {
        e.preventDefault();
        setDeleteMessage('');

        try {
            const response = await fetch('http://localhost:9091/user/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: deletePassword,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            setEmail('');
            setDeletePassword('');
            setDeleteMessage('Account deleted successfully');
        } catch (error) {
            setDeleteMessage('Error deleting account');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navibar />
            <div className="flex flex-grow pt-16">
                <Leftbar />
                <div className="flex-grow p-6 sm:ml-64  bg-gray-200">
                    <div className="max-w-xl mx-auto space-y-8">
                        {/* Password Update Section */}
                        <div className="bg-white rounded-lg shadow-md p-8 transition duration-300 hover:shadow-lg">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                                Update Password
                            </h1>
                            
                            {message && (
                                <div className={`mb-6 px-4 py-3 rounded-md transition-all duration-300 ${
                                    message.includes('successfully') 
                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                    <p className="text-sm font-medium">{message}</p>
                                </div>
                            )}

                            <form onSubmit={handlePasswordUpdate} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>

                        {/* Delete Account Section */}
                        <div className="bg-white rounded-lg shadow-md p-8 transition duration-300 hover:shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                                Delete Account
                            </h2>

                            {deleteMessage && (
                                <div className={`mb-6 px-4 py-3 rounded-md transition-all duration-300 ${
                                    deleteMessage.includes('successfully') 
                                        ? 'bg-green-50 text-green-700 border border-green-200' 
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                    <p className="text-sm font-medium">{deleteMessage}</p>
                                </div>
                            )}

                            <form onSubmit={handleAccountDeletion} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={deletePassword}
                                        onChange={(e) => setDeletePassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                                        required
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                                    >
                                        Delete Account
                                    </button>
                                    <p className="mt-2 text-sm text-gray-500 text-center">
                                        This action cannot be undone.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto sm:ml-64">
                <Foot />
            </div>
        </div>
    );
};

export default Settings;