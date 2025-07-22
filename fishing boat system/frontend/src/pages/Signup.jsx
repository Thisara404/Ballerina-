import { Button, Label, TextInput } from "flowbite-react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate(); // For navigation after successful signup
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Validate email format (basic regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Optional: Validate phone number format (e.g., 123-456-7890)
    const phonePattern = /^\d{3}\d{3}\d{4}$/;
    if (!phonePattern.test(phoneNumber)) {
      setErrorMessage("Please enter a valid phone number (e.g., 123-456-7890).");
      return;
    }

    // Prepare the user data for signup
    const userData = {
      firstName,
      lastName,
      phoneNumber,
      registrationNumber,
      email,
      password,
    };

    try {
      setLoading(true); // Start loading
      const response = await fetch('http://localhost:9091/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed! Please try again.');
      }

      const data = await response.json();
      setSuccessMessage("Signup successful! User ID: " + data.id);
      alert("Signup successful!");
      setErrorMessage('');

      // Reset form fields
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setRegistrationNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Navigate to a different page after successful signup
      navigate('/login'); // Replace with your desired route

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
      <div className="flex items-center justify-center w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 m-6">
        <form onSubmit={handleSignup} className="space-y-4 w-full">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">Create an account</h3>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
          {loading && <p className="text-blue-500 text-center">Loading...</p>}

          {/* First Name and Last Name */}
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="w-full">
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone Number and Registration Number */}
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="w-full">
              <Label htmlFor="phoneNumber" value="Phone Number" />
              <TextInput
                id="phoneNumber"
                placeholder="123-456-7890"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <Label htmlFor="registrationNumber" value="Registration Number" />
              <TextInput
                id="registrationNumber"
                placeholder="ABC123"
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <Label htmlFor="confirmPassword" value="Confirm Password" />
            <TextInput
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="w-full">
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500" disabled={loading}>
              Create Account
            </Button>
          </div>

          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account?&nbsp;
            <Link to="/login" className="text-cyan-700 hover:underline dark:text-cyan-500">
              Sign in
            </Link>
          </div>

          <div className="text-center mt-2">
            <Link
              to="/"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to Homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
