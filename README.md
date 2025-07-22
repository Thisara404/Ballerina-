# Empowering Fishermen with Smart Tools
A comprehensive web application designed to help fishermen manage their resources, monitor safety conditions, and access markets efficiently.

## 🌟 Features
- **Resource Management**
  - Boat inventory tracking
  - Fishing gear management
- **Safety Alerts**
  - Weather updates (via OpenWeather API)
  - Fishing conditions monitoring
- **Market Access**
  - Catch details submission
  - Market access via EmailJS integration
- **Profile Management**
  - Personal information
  - Account settings

## 🛠️ Tech Stack
- Frontend: React + Vite + Tailwind CSS + Flowbite React
- Backend: Ballerina
- Database: MongoDB
- Third-Party APIs:
  - OpenWeather API for real-time weather data
  - EmailJS for market communications

## ⚙️ Prerequisites
Make sure you have these installed on your local machine:
- Node.js
- Ballerina
- MongoDB
- API Keys for:
  - OpenWeather API
  - EmailJS

## 🚀 Local Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/AdithaBuwaneka/iwb242-code-dynamos.git
cd iwb242-code-dynamos
```

### 2. Database Setup
- Make sure MongoDB is running on your local machine
- Default MongoDB URL: `mongodb://localhost:27017`
- Database will be created automatically when the application runs

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend
# Install dependencies
npm install
# Configure environment variables
cp .env.example .env
# Add your API keys to .env file
# Start development server
npm run dev
```
Frontend will run on: `http://localhost:5173`

### 4. Backend Setup
```bash
# Navigate to backend directory
cd backend
# Run Ballerina service
bal run
```
Backend will run on: `http://localhost:9090`

## 📁 Project Structure
```
fisherman-platform/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── service.bal
    └── Config.toml
```

## 🔧 Configuration
### Environment Variables
Create a `.env` file in the frontend directory with the following variables:
```
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## 🤝 Team Members
- Aditha Buwaneka - Team Leader
- Samasha Hettiarachchi
- Sakna Rajapakshe
- Lakshan Roshana

## 📞 Contact
-Phone: 0760454341
-Email: adithabuwaneka0@gmail.com

## 📝 Third-Party API Documentation
- OpenWeather API: https://openweathermap.org/api
- EmailJS: https://www.emailjs.com/docs/

#InnovateWithBallerina #Ballerinalang #WSO2 #IEEESBUOM #IEEECSUOM #TERM23/24 #Ballerina #BallerinaProgramming
