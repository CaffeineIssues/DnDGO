import Map from '@/components/Map';
import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6">
                <img src="/logo.png" alt="DND Go Logo" className="h-40" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Get Started
                </button>
            </nav>

            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
                {/* Content */}
                <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
                    <h2 className="text-5xl font-bold mb-6">
                        Adventure Awaits
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Embark on epic quests and explore dungeons like never before.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                        Start Your Journey
                    </button>
                </div>

                {/* Large Image Container */}
                <div className="lg:w-1/2 w-full">
                    <div className="w-full aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl flex items-center justify-center">
                       
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className=" mx-auto w-full h-96 bg-white">
                 <Map />
            </div>
        </div>
    );
}