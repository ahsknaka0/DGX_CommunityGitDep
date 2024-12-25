import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="relative bg-DGXblue min-h-screen flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/path-to-your-background-image.jpg)',
                    }}
                />
            </div>

            {/* Content */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 max-w-4xl text-center text-white p-6 bg-opacity-60 bg-DGXblack rounded-lg shadow-lg"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Events & Workshops</h1>
                <p className="text-lg md:text-xl mb-6">
                    Discover inspiring events and hands-on workshops tailored for
                    professionals, enthusiasts, and beginners alike. Learn, grow, and connect
                    with our vibrant community.
                </p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-DGXgreen text-DGXblack px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-DGXwhite transition-all"
                >
                    Explore Events
                </motion.button>
            </motion.div>
        </div>
    );
};

export default HeroSection;
