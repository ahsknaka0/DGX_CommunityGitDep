import { useState, useEffect, useContext } from "react";
import { images } from '../../public/index.js';
import GeneralUserCalendar from "../component/GeneralUserCalendar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare } from '@fortawesome/free-solid-svg-icons';
import ApiContext from "../context/ApiContext.jsx";

// CardContainer Component
const CardContainer = ({ children, className, containerClassName }) => {
  return (
    <div className={`py-20 flex items-center justify-center ${containerClassName}`}>
      <div className={`flex items-center justify-center relative transition-all duration-200 ease-linear ${className}`}>
        {children}
      </div>
    </div>
  );
};

// CardBody Component
const CardBody = ({ children, className }) => {
  return <div className={`h-70 w-96 ${className}`}>{children}</div>;
};

// CardItem Component
const CardItem = ({ children, className }) => {
  return <div className={`w-fit transition duration-200 ease-linear ${className}`}>{children}</div>;
};

// SkeletonLoader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="flex justify-center">
      <div className="bg-gray-200 h-14 w-72 rounded-md mb-6"></div>
    </div>
    <div className="h-36 bg-gray-300 rounded-md mb-4"></div>
    <div className="flex justify-between">
      <div className="h-10 bg-gray-300 rounded-md w-24 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded-md w-16 mb-4"></div>
    </div>
  </div>
);

const EventWorkshopPage = () => {
  const [activeTab, setActiveTab] = useState("myCompany");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Control for loader
  const { fetchData } = useContext(ApiContext);
  const [dbevents, setDbvents] = useState([]);

  const myCompanyEvents = [
    { title: "Company Workshop: AI & Robotics", image: images.Event1 },
    { title: "Company Event: Future of Data Science", image: images.Event2 },
    { title: "Company Workshop: AI & Robotics", image: images.Event1 },
  ];

  const nvidiaEvents = [
    { title: "NVIDIA CEO Jensen Huang and Lauren Goode at WIRED", image: images.Event1 },
    { title: "NVIDIA CEO Jensen Huang and Mark Zuckerberg", image: images.Event2 },
    { title: "NVIDIA CEO Jensen Huang and Lauren Goode at WIRED", image: images.Event1 },
  ];

  const oldEvents = [
    { title: "Old Event 1", image: images.Event1 },
    { title: "Old Event 2", image: images.Event2 },
    { title: "Old Event 3", image: images.Event1 },
  ];

  const events = activeTab === "myCompany" ? myCompanyEvents : activeTab === "nvidia" ? nvidiaEvents : oldEvents;

  const handleTabChange = (tab) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 300);
  };

  const handleShare = (event) => {
    const shareData = {
      title: event.title,
      text: `Check out this event: ${event.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => alert('Successfully shared!'))
        .catch((error) => alert(`Error sharing: ${error}`));
    } else {
      navigator.clipboard.writeText(shareData.url)
        .then(() => alert('Link copied to clipboard!'))
        .catch((error) => alert(`Error copying link: ${error}`));
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const endpoint = 'eventandworkshop/getEvent';
        const eventData = await fetchData(endpoint);
        console.log(eventData)
        // Assuming the event data is nested in `data`
        setDbvents(eventData.data);
  
        // Stop loading after successful fetch
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setIsLoading(false); // Ensure loader stops even if there's an error
      }
    };
  
    fetchEventData();
  }, []);
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="relative isolate overflow-hidden bg-DGXwhite px-6 py-20 text-center sm:px-16 sm:shadow-sm">
        <p className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-[#111827] mb-10">
          Explore Events and Workshops
        </p>

        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={() => handleTabChange("myCompany")}
            className={`px-8 py-3 ${activeTab === "myCompany" ? 'bg-DGXgreen text-white' : 'bg-DGXwhite text-black'} border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            GI India Events
          </button>
          <button
            onClick={() => handleTabChange("nvidia")}
            className={`px-8 py-3 ${activeTab === "nvidia" ? 'bg-DGXgreen text-white' : 'bg-DGXwhite text-black'} border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            NVIDIA Events
          </button>
          <button
            onClick={() => handleTabChange("oldEvents")}
            className={`px-8 py-3 ${activeTab === "oldEvents" ? 'bg-DGXgreen text-white' : 'bg-DGXwhite text-black'} border border-DGXgreen rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-DGXgreen`}
          >
            GI India Old Events
          </button>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {/* Show skeleton loader if loading */}
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CardContainer
                key={index}
                className="my-8 w-full"
                containerClassName="border-2 border-DGXgreen bg-DGXblue rounded-lg overflow-hidden shadow-lg"
              >
                <CardBody className="p-6 border border-DGXgreen flex flex-col justify-between h-full">
                  <SkeletonLoader />
                </CardBody>
              </CardContainer>
            ))
          ) : (
            // Show events once loaded
            events.map((event, index) => (
              <CardContainer
                key={index}
                className="my-8 w-full"
                containerClassName="border-2 border-DGXgreen bg-DGXblue rounded-lg overflow-hidden shadow-lg"
              >
                <CardBody className="bg-gradient-to-r from-DGXgray via-DGXblue to-DGXblue p-6 border border-DGXgreen flex flex-col justify-between h-full">
                  <CardItem>
                    <h2 className="text-xl font-bold text-DGXwhite mb-4">{event.title}</h2>
                    <img
                      src={event.image}
                      alt={`Image for ${event.title}`}
                      className="mt-4 w-full h-40 object-cover rounded-md shadow-md"
                    />
                  </CardItem>

                  <div className="flex justify-between mt-8">
                    <div className="flex gap-4">
                      <button className="px-6 py-2 bg-DGXgreen text-DGXwhite rounded-md hover:bg-green-600 transition">
                        View Details
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 bg-DGXwhite text-black rounded-md flex items-center gap-2 shadow-md hover:shadow-lg transition"
                        onClick={() => handleShare(event)}
                        aria-label={`Share ${event.title}`}
                      >
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                  </div>
                </CardBody>
              </CardContainer>
            ))
          )}
        </div>
      </div>

      <GeneralUserCalendar events={dbevents}/>
    </div>
  );
};

export default EventWorkshopPage;
