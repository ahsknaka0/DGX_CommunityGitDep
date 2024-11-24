// import { Link } from 'react-router-dom';
import { images } from '../constant/index.js';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import ApiContext from '../context/ApiContext.jsx';
import MyStoryboard from '../component/MyStoryboard.jsx';
import HomeAfterLoginComponent from '../component/HomeAfterLoginComponent.jsx';




const Home = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const { userToken } = useContext(ApiContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (userToken != null && userToken != undefined) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [userToken])
    const people = [
        {
            name: 'Ashiwini Thakur',
            role: 'Project Manager',
            imageUrl: `${images.AshwiniSir}`
        },
        {
            name: 'Sharad Srivastav',
            role: 'Project Manager',
            imageUrl: `${images.SharadSir}`
        },
        {
            name: 'Anubhav Patrick',
            role: 'Project Manager',
            imageUrl: `${images.PatrickSir}`
        },
        {
            name: 'Sugandh Gupta',
            role: 'Project Manger',
            imageUrl: `${images.SugandhMaam}`
        },
        // More people...
    ]

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/EventWorkshopPage');

    };
    const handleRedirect01 = () => {
        navigate('/Discussion');

    };


    // Define your slides here
    const slides = [
        images.Event1,
        images.Event2,
        images.Event3,
        images.Event4,
        images.Event5,
        images.Event6
        // Add more image paths as needed
    ];

    // Automatic slider functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 2000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
            <div
                className="relative py-14 sm:py-24 bg-cover bg-center"
                style={{ backgroundImage: `url(${images.HeroImg})` }} >
                <div className="absolute inset-0 bg-DGXblack opacity-50" ></div> {/* Overlay */}
                {isLoggedIn ? <>
                    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-8 flex justify-center ">
                            <h1 className="text-6xl font-mono px-4 py-1.5 text-DGXwhite">
                                Welcome &ldquo;Name&rdquo;!!
                            </h1>
                        </div>
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-DGXwhite sm:text-6xl">
                                DGX - COMMUNITY
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-DGXwhite">
                                Connect, Innovate, Automate: DGX Community Elevates AI Development
                            </p>

                        </div>
                    </div>
                </> :
                    <>
                        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mb-8 flex justify-center ">
                                <p className="relative rounded-full px-4 py-1.5 text-DGXwhite leading-6  bg-DGXgreen bg-opacity-90 ring-1 ring-inset ring-[#111827]/10 hover:ring-[#111827]/20 hover:bg-DGXblue">
                                    <a href="/SignInn" target="_blank" className="font-semibold text-DGXwhite bd">
                                        <span className="absolute inset-0 "></span> Join Us Today <span>→</span>
                                    </a>
                                </p>
                            </div>
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-DGXwhite sm:text-6xl">
                                    DGX - COMMUNITY
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-DGXwhite">
                                    Connect, Innovate, Automate: DGX Community Elevates AI Development
                                </p>

                            </div>
                        </div>
                    </>}



            </div>

            {isLoggedIn ? <><HomeAfterLoginComponent /> </> : <>
                <section className="bg-[#f5f5f5]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-4 bg-DGXblue p-4">
                      
                        <div className="flex flex-col justify-center items-center bg-DGXblue     opacity-100 w-full h-full p-4 md:p-6 lg:p-10">
                            <div className="text-center">
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-DGXwhite">Welcome to the DGX Community!

                                </h1>
                                <h2 className='text-DGXwhite font-bold'>Your Hub for Innovation, Collaboration, and Learning</h2>
                                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl leading-6 text-DGXwhite">
                                    We’re thrilled to have you here! Explore our community platform where students, researchers, and professionals come together to share knowledge, stay updated on the latest in AI and ML, and connect with like-minded individuals.

                                </p>
                            </div>
                        </div>
                        {/* Image and Text Section */}

                    </div>
                </section>

                <section className="bg-[#f5f5f5]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:p-8">
                        {/* Text and Button Section */}
                        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                            <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                                <span className="bg-gradient-to-r from-DGXgreen via-DGXblack to-DGXblue bg-clip-text text-transparent animate-pulse">
                                    Upcoming Events
                                </span>
                                <p className="mt-2 text-sm md:text-base lg:text-lg text-DGXblue">
                                    Attend our regular events and workshops to learn from the best in the industry. Enhance your skills and network with professionals.
                                </p>
                            </div>
                            <button className="text-sm md:text-md lg:text-lg bg-DGXgreen text-DGXwhite py-2 px-4 lg:py-2 lg:px-5 border border-DGXblue rounded-md mt-4 hover:bg-[#27272a] transition-colors duration-300">
                                Enroll Now
                            </button>
                        </div>
                        {/* Carousel Section */}
                        <div className="relative w-full h-64 lg:h-[500px] rounded-lg overflow-hidden">
                            <div className="relative h-full">
                                {slides.map((slide, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="absolute top-1/2 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none transform -translate-y-1/2"
                                onClick={prevSlide}
                            >
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-DGXwhite/30 group-hover:bg-DGXwhite/50">
                                    <svg
                                        className="w-4 h-4 text-DGXwhite"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 1 1 5l4 4"
                                        />
                                    </svg>
                                    <span className="sr-only">Previous</span>
                                </span>
                            </button>
                            <button
                                type="button"
                                className="absolute top-1/2 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none transform -translate-y-1/2"
                                onClick={nextSlide}
                            >
                                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-DGXwhite/30 group-hover:bg-DGXwhite/50">
                                    <svg
                                        className="w-4 h-4 text-DGXwhite"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    <span className="sr-only">Next</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </section> </>}

            <div className="bg-DGXgray/50 py-24 sm:py-32 ">
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">Meet our leadership</h2>
                        <p className="mt-6 text-lg leading-8 text-[#4b5563]">
                            &quot;Our leaders harness the NVIDIA DGX system to drive AI innovation and achieve exceptional results. Explore the future of AI with their visionary guidance.&quot;
                        </p>
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                        {people.map((person) => (
                            <li key={person.name}>
                                <div className="flex items-center gap-x-6">
                                    <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full" />
                                    <div>
                                        <h3 className="text-base font-semibold leading-7 tracking-tight text-[#111827]">{person.name}</h3>
                                        <p className="text-sm font-semibold leading-6 text-[#4f46e5]">{person.role}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h1 className="text-center text-2xl font-bold leading-8 text-DGXblue">
                        NVIDIA DGX systems are at the forefront of AI research and innovation. Trusted by the world’s most innovative universities and corporations, DGX provides the computational power needed to tackle the most complex AI challenges. Whether advancing research in academic institutions or driving breakthroughs in industry, DGX stands as the premier choice for those leading the charge in artificial intelligence.
                    </h1>
                    <div className="mx-auto mt-10 flex flex-wrap gap-10 items-center justify-center">
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="Transistor"
                                src={images.ABESIT}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="Reform"
                                src={images.KIET}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="SavvyCal"
                                src={images.glogo}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="Tuple"
                                src={images.SHARDA}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="utu"
                                src={images.utu}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="rvce"
                                src={images.rvce}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="glbajaj"
                                src={images.GLBAJAJ}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                        <div className="flex justify-center items-center w-full sm:w-auto">
                            <img
                                alt="BMS"
                                src={images.BMS}
                                className="w-44 h-24 object-contain"
                            />
                        </div>
                    </div>



                </div>
            </div>


            {/* <div className="relative flex justify-center items-center w-full h-screen bg-[#2e6d8e] p-8">
                <img src={images.AnimatedDGX} alt="NVIDIA DGX" className="max-w-[80%] h-auto border border-DGXgreen" />
            </div> */}



        </div>

    )
}

export default Home;