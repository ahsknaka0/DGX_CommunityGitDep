import { useState, useEffect, useContext } from "react";
import { images } from '../../public/index.js';
import GeneralUserCalendar from "../component/GeneralUserCalendar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShare } from "@fortawesome/free-solid-svg-icons";
import ApiContext from "../context/ApiContext.jsx";

import React from 'react';
import { motion } from 'framer-motion';


const EventDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-DGXwhite max-w-2xl w-full rounded-lg shadow-lg overflow-hidden">
        <div className="h-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{event.EventTitle}</h2>
            <button
              onClick={onClose}
              className="text-black font-bold text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">
            {/* Render HTML content from EventDescription */}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: event.EventDescription }}
            ></div>
          </div>

          <div className="flex justify-between mt-4">
            <p className="text-sm text-gray-500">
              <strong>Start Date:</strong> {new Date(event.StartDate).toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-sm text-gray-500">
              <strong>End Date:</strong> {new Date(event.EndDate).toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>

            <p className="text-sm text-gray-500">
              <strong>Venue:</strong> {event.Venue}
            </p>
          </div>
          <img
            src={event.EventImage}
            alt={`Image for ${event.EventTitle}`}
            className="w-full h-full object-cover rounded-lg my-4"
          />
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-DGXgreen text-DGXwhite rounded-md  hover:bg-green-600 transition"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-DGXgreen text-DGXwhite rounded-md  hover:bg-green-600 transition"
            >
              <a
                href={event.RegistrationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Here
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

const EventWorkshopPage = () => {
  const [activeTab, setActiveTab] = useState("myCompany");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useContext(ApiContext);
  const [dbevents, setDbvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Open the modal with the selected event
  const handleMoreInfoClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };


  const handleTabChange = (tab) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 300);
  };

  const handleShare = async (event) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.EventTitle,
          text: `Check out this event: ${event.EventTitle}`,
          url: window.location.href, // Share the current page's URL
        });
        alert("Event shared successfully!");
      } catch (error) {
        console.error("Error sharing event:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };


  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const events = [
    {
      title: "AI Workshop for Beginners",
      description: "An engaging workshop marking the commencement of a new AI training session at GL Bajaj. This workshop provided participants with a comprehensive introduction to AI, where they learned the fundamentals and built their first AI model. It was an interactive session designed for beginners, offering hands-on experience and insights into the world of artificial intelligence. Attendees left with practical knowledge and the confidence to explore further into the field of AI.",
      date: "January 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "GL Bajaj, Training Room 1",
      image: images.us1,
    },
    {
      title: "Advanced Data Science Seminar",
      description: "A comprehensive seminar focused on advanced data analysis techniques, cutting-edge AI tools, and real-world applications. Held at KIET, this event brought together experts and enthusiasts in the field of data science and AI. Attendees had the opportunity to learn from industry leaders, participate in hands-on training, and gain insights into the future of AI and machine learning. It was a highly interactive session that empowered participants with practical knowledge to tackle complex data challenges.",
      date: "February 20, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "KIET Hall 2",
      image: images.us2,
    },
    {
      title: "AI Workshop for Beginners",
      description: "An engaging workshop marking the commencement of a new AI training session at GL Bajaj. This workshop provided participants with a comprehensive introduction to AI, where they learned the fundamentals and built their first AI model. It was an interactive session designed for beginners, offering hands-on experience and insights into the world of artificial intelligence. Attendees left with practical knowledge and the confidence to explore further into the field of AI.",
      date: "January 15, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "GL Bajaj, Training Room 1",
      image: images.us3,
    },
    {
      title: "Advanced Data Science Seminar",
      description: "A comprehensive seminar focused on advanced data analysis techniques, cutting-edge AI tools, and real-world applications. Held at KIET, this event brought together experts and enthusiasts in the field of data science and AI. Attendees had the opportunity to learn from industry leaders, participate in hands-on training, and gain insights into the future of AI and machine learning. It was a highly interactive session that empowered participants with practical knowledge to tackle complex data challenges.",
      date: "February 20, 2025",
      time: "1:00 PM - 5:00 PM",
      location: "KIET Hall 2",
      image: images.us4,
    }
  ];

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const endpoint = "eventandworkshop/getEvent";
        const eventData = await fetchData(endpoint);
        setDbvents(eventData.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching event data:", error);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [fetchData]);

  return (
    <div className="w-full">
      <div className="relative isolate overflow-hidden bg-DGXwhite px-6 py-20 text-center sm:px-16 sm:shadow-sm">
      <div className="relative bg-DGXblue w-full">
  {/* Content */}
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative z-10 max-w-7xl mx-auto text-white p-6 bg-opacity-60 rounded-lg shadow-lg"
  >
    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Past Events & Workshops</h1>
    <p className="text-lg md:text-xl mb-6">
      Discover the impactful workshops and seminars we've hosted. These events have empowered professionals and enthusiasts, offering deep dives into cutting-edge technologies and practical applications.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.3 }}
          className="bg-DGXwhite bg-opacity-90 text-DGXblack rounded-lg shadow-xl flex flex-col md:flex-row items-center md:items-start p-6 w-full md:w-[500px] lg:w-[600px]"
        >
          {/* Event Image */}
          <div className="flex w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={event.image}
              alt={event.title}
              className="rounded-lg object-cover w-full h-48 md:h-56 lg:h-64"
            />
          </div>

          {/* Event Details */}
          <div className="p-4 md:p-6 md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">{event.title}</h2>
            <p className="text-sm md:text-md mb-2">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-sm md:text-md mb-2">
              <strong>Location:</strong> {event.location}
            </p>

            {/* More Info Button */}
            <button
              // onClick={() => handleMoreInfoClick(event)}
              className="mt-4 text-DGXblue hover:text-DGXgreen font-semibold"
            >
              More Info
            </button>
          </div>
        </motion.div>
      ))}

      {/* Modal */}
      {/* {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full md:w-[600px] lg:w-[800px]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{event.title}</h2>
            <p className="text-md md:text-lg mb-4">{event.description}</p>
            <p className="text-sm md:text-md mb-2">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-sm md:text-md mb-2">
              <strong>Location:</strong> {event.location}
            </p>
          </div>
        </div>
      )} */}
    </div>
  </motion.div>
</div>

        <p className="mx-auto max-w-full text-4xl font-bold tracking-tight text-[#111827] mb-10">
          Explore Events and Workshops
        </p>



        {/* <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => handleTabChange("myCompany")}
            className={`px-8 py-3 ${activeTab === "myCompany"
              ? "bg-DGXgreen text-white"
              : "bg-DGXwhite text-black"
              } border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            GI India Events
          </button>
          <button
            onClick={() => handleTabChange("nvidia")}
            className={`px-8 py-3 ${activeTab === "nvidia"
              ? "bg-DGXgreen text-white"
              : "bg-DGXwhite text-black"
              } border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            NVIDIA Events
          </button>
          <button
            onClick={() => handleTabChange("oldEvents")}
            className={`px-8 py-3 ${activeTab === "oldEvents"
              ? "bg-DGXgreen text-white"
              : "bg-DGXwhite text-black"
              } border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            GI India Old Events
          </button>
        </div> */}

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"
            }`}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse border-2 border-DGXgreen bg-DGXblue rounded-lg overflow-hidden shadow-lg p-6"
              >
                {/* Add loader */}
              </div>
            ))
          ) : (
            dbevents.map((event, index) => (
              <div
                key={index}
                className="border-2 border-DGXgreen bg-DGXblue rounded-lg overflow-hidden shadow-lg p-6"
              >
                <h2 className="text-xl font-bold text-DGXwhite mb-4">
                  {event.EventTitle}
                </h2>
                <img
                  src={event.EventImage}
                  alt={`Image for ${event.EventTitle}`}
                  className="mt-4 w-full h-40 object-fill rounded-md shadow-md"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleViewDetails(event)}
                    className="px-6 py-2 bg-DGXgreen text-DGXwhite rounded-md hover:bg-green-600 transition"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleShare(event)}
                    className="px-6 py-2 bg-DGXgreen hover:bg-green-600 text-DGXwhite rounded-md transition"
                  >
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </div>
              </div>
            ))

          )}
        </div>
      </div>
      <GeneralUserCalendar events={dbevents} />
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EventWorkshopPage;
