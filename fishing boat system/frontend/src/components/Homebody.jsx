"use client";
import { Button, Card, Carousel } from "flowbite-react";
import { Link ,useNavigate  } from 'react-router-dom';  
import c1 from '../assets/images/c (1).png';
import c2 from '../assets/images/c (2).png';
import c3 from '../assets/images/c (3).png';

import c5  from '../assets/images/c (5).png';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import c6 from '../assets/images/c (6).png';
import c8 from '../assets/images/c (8).png';
import c7 from '../assets/images/c (7).png';
import c9 from '../assets/images/c (9).png';
import c10 from '../assets/images/c (10).png';
import c11 from '../assets/images/c (11).png';

import { useAuth } from "../AuthContext";

const Body = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
    });
  }, []);

  const navigate = useNavigate(); // Get the navigate function

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log("User signed out");
    // Redirect to the login page after signing out
    navigate('/login');
  };

  const { isAuthenticated, } = useAuth();
  return (
    <div className="w-full mt-16"> {/* Ensure the Body component takes full width */}
      <Card className="w-full  bg-blue-100"> {/* Ensure the Card takes full width */}
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="lg:w-1/2 flex flex-col justify-center "> {/* Center content vertically */}
            <h5 className="text-4xl  font-bold tracking-tight text-blue-600 dark:text-white mt-5 pt-5 pb-5"> {/* Decrease margin-bottom */}
            Empowering Fishermen with Smart Tools
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400 mb-6"> {/* Decrease margin-bottom */}
            FisherMate is a platform that simplifies fishermen's operations, providing safety alerts, market access, and resource management through an easy-to-use dashboard for improved efficiency and safety.

            </p>
            <div className="flex justify-center pb-3"> 
              {/* Center button horizontally */}
              {isAuthenticated ? (
                <Link to="/dashboard" onClick={handleSignOut}>
                <Button className="bg-blue-600 text-white hover:bg-blue-400">
        Go to Dashboard
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
  
  
  
                </Link>
              ):(
                <Link to="/login">
              <Button className="bg-blue-600 text-white hover:bg-blue-400">
      Get Started
      <svg
        className="-mr-1 ml-2 h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Button>



              </Link>
              )}
              
                

            </div>
          </div>
          <div className="lg:w-1/2 h-56 sm:h-64 xl:h-80 2xl:h-96 ">
            <Carousel>
              <img src={c1} alt="Carousel slide 1" />
              <img src={c9} alt="Carousel slide 2" />
              <img src={c3} alt="Carousel slide 3" />
              <img src={c10} alt="Carousel slide 4" />
              <img src={c11} alt="Carousel slide 5" />
            </Carousel>
          </div>
        </div>
      </Card>


      <section className="container mx-auto px-4 pt-10">
          <h2 className="text-4xl font-bold text-center mb-4" data-aos="fade-up">Enhance Your Fishing Experience with FisherMate</h2>
          <p className="text-center text-xl md:text-2xl text-gray-500 mb-5 mx-0 md:mx-32" data-aos="fade-up" data-aos-delay="200">
                    Discover a tailored platform for fishermen that provides real-time safety updates, market access, and resource management tools. With a user-friendly dashboard, stay organized and focused on fishing while streamlining your operations for maximum productivity and safety. Join us today!
            </p>
          <hr className="border-t-slate-700 mx-0 md:mx-11 mb-12 md:mb-24 mt-0" data-aos="fade-up" data-aos-delay="200" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-0 md:mx-44">

          </div>
        </section>


        <section className="text-white py-8 px-4 w-full bg-blue-100" >
          <div className="max-w-6xl mx-auto">
            
            <div className='flex flex-col md:flex-row justify-between items-start'>
              <h1 className="text-3xl md:text-4xl text-blue-950 font-bold mb-4 md:w-1/2">Tailored Solutions for Your Fishing Operations</h1>
              <p className="mb-8 md:w-1/2 text-blue-950 text-base md:text-lg">
              Discover our FisherMate platform designed specifically for fishermen. Each feature is crafted to enhance your fishing experience with efficiency and ease.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                { icon: c6, title: "Safety Alerts for Your Peace of Mind" },
                { icon: c7, title: "Comprehensive Resource Management" },
                { icon: c8, title: "Seamless Market Access for Your Catch" },
              ].map((item, index) => (
                <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                  <img src={item.icon} alt={item.title} className="w-24 h-20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 pt-10">
  <div className="flex justify-center space-x-8 mb-10"> {/* Center both cards and increase space */}
    <Card
      className="max-w-sm "
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={c2}
      data-aos="fade-right"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Critical Safety Alerts for Fishermen
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Get real-time updates on weather and hazards to fish safely and make informed decisions.
      </p>
    </Card>
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={c5}
      data-aos="fade-left"

    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Elevate Your Fishing with a Profile

      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Organize and update your personal details and fishing licenses for easy access and management.
      </p>
    </Card>
  </div>
</section>

<section className="bg-blue-100 dark:bg-gray-900 mb-10">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
          Discover the Future of Fishing with FisherMate
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Learn how FisherMate empowers fishermen through safety alerts, resource management, and market access to enhance sustainability and community growth.
          </p>
          {/* Updated Button Section */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 justify-center sm:justify-center"> {/* Center buttons */}
          {isAuthenticated ? (
                <Link to="/dashboard" onClick={handleSignOut}>
                <Button className="bg-blue-600 text-white hover:bg-blue-400">
        Go to Dashboard
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
  
  
  
                </Link>
              ):(
                <Link to="/login">
              <Button className="bg-blue-600 text-white hover:bg-blue-400">
      Get Started
      <svg
        className="-mr-1 ml-2 h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </Button>



              </Link>
              )}
              
            <a
              
              className="cursor-pointer py-3 px-10 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Learn more
            </a>
          </div>
        </div>
        <div>
          <iframe
            className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl"
            src="https://www.youtube.com/embed/KaLxCiilHns"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>




    </div>
  );
};

export default Body;
