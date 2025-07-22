import  { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import Navibar from '../components/Navbar';
import Leftbar from '../components/Sidebar';
import Foot from '../components/Footer';
import { useAuth } from '../AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../components/ConfirmationPopup';

const Profile = () => {
    const { userInfo, setUserInfo } = useAuth();
    const [profilePhoto, setProfilePhoto] = useState('https://via.placeholder.com/150');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [base64Image, setBase64Image] = useState('');

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`http://localhost:9091/user/${userInfo.id}`);
                if (response.ok) {
                    const updatedUser = await response.json();
                    setUserInfo(updatedUser);
                } else {
                    throw new Error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        if (userInfo) {
            fetchUserInfo();
        }
    }, [userInfo, setUserInfo]);

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.firstName || '');
            setLastName(userInfo.lastName || '');
            setEmail(userInfo.email || '');
            setPhone(userInfo.phoneNumber || '');
            setAddress(userInfo.address || '');
            setDob(userInfo.dob || '');
            if (userInfo.profilePhoto) {
                setProfilePhoto(userInfo.profilePhoto);
                setBase64Image(userInfo.profilePhoto);
            }
        }
    }, [userInfo]);

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handlePhotoChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setBase64Image(base64);
                setProfilePhoto(base64);
            } catch (error) {
                toast.error('Error processing image');
                console.error('Error converting image:', error);
            }
        }
    };

    const handleSaveClick = () => {
        setShowPopup(true);
    };

    const confirmSaveChanges = async () => {
        setIsLoading(true);
        setShowPopup(false);
        try {
            const response = await fetch(`http://localhost:9091/user/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber: phone,
                    address,
                    dob,
                    profilePhoto: base64Image,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();
            setUserInfo(updatedUser);

            const fetchResponse = await fetch(`http://localhost:9091/user/${userInfo.id}`);
            if (fetchResponse.ok) {
                const newUserInfo = await fetchResponse.json();
                setUserInfo(newUserInfo);
            }

            setIsEditing(false);
            toast.success('Profile updated successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Error updating profile');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navibar />
            <div className="flex flex-grow mt-16">
                <Leftbar />
                <div className="flex-grow p-6 sm:p-8 bg-gray-200 sm:ml-64">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                            My Profile
                        </h1>

                        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-transform transform hover:scale-105 duration-300">
                            {/* Profile Photo Section */}
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <img
                                        src={profilePhoto}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <button
                                        onClick={handleUploadClick}
                                        className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                                    >
                                        <Camera className="w-5 h-5" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: 'First Name', value: firstName, setter: setFirstName },
                                    { label: 'Last Name', value: lastName, setter: setLastName },
                                    { label: 'Email', value: email, setter: setEmail, type: 'email' },
                                    { label: 'Phone Number', value: phone, setter: setPhone, type: 'tel' },
                                    { label: 'Address', value: address, setter: setAddress },
                                    { label: 'Date of Birth', value: dob, setter: setDob, type: 'date' },
                                ].map(({ label, value, setter, type = 'text' }) => (
                                    <div key={label}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {label}
                                        </label>
                                        <input
                                            type={type}
                                            value={value}
                                            onChange={(e) => setter(e.target.value)}
                                            disabled={!isEditing}
                                            placeholder={`Enter your ${label.toLowerCase()}`}
                                            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={handleEditClick}
                                    className="py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors text-white"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>

                                {isEditing && (
                                    <button
                                        onClick={handleSaveClick}
                                        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-auto sm:ml-64">
                <Foot />
            </div>
            {showPopup && (
                <ConfirmationPopup
                    message="Are you sure you want to save changes and log out?"
                    onConfirm={confirmSaveChanges}
                    onCancel={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default Profile;
