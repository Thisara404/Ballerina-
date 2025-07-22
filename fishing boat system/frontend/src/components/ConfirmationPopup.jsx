// ConfirmationPopup.js

import { Link } from 'react-router-dom';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onCancel}
                        className="py-2 px-4 bg-gray-300 rounded-md mr-2"
                    >
                        Cancel
                    </button>
                    <Link to="/login">
                    <button
                        onClick={onConfirm}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md"
                    >
                        Yes
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
