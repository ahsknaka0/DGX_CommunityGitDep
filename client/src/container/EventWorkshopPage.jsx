import { useState, useEffect, useContext } from "react";
import { images } from '../../public/index.js';
import GeneralUserCalendar from "../component/GeneralUserCalendar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faShare } from "@fortawesome/free-solid-svg-icons";
import ApiContext from "../context/ApiContext.jsx";

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
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-DGXwhite px-6 py-20 text-center sm:px-16 sm:shadow-sm">
        <p className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-[#111827] mb-10">
          Explore Events and Workshops
        </p>

        <div className="mt-6 flex justify-center gap-6">
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
        </div>

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
