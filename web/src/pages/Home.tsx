import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Welcome to SoftBarter
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Trade goods and services with confidence. Connect with people in your community
              and discover amazing exchange opportunities.
            </p>
            <div className="space-x-4">
              {user ? (
                <>
                  <Link
                    to="/trades"
                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200"
                  >
                    Browse Trades
                  </Link>
                  <Link
                    to="/create-trade"
                    className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-400 transition duration-200"
                  >
                    Create Trade
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/trades"
                    className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-400 transition duration-200"
                  >
                    Browse Trades
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              How SoftBarter Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trading has never been easier. Follow these simple steps to start exchanging
              with your community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Trade</h3>
              <p className="text-gray-600">
                Post what you have to offer and what you're looking for. Include photos
                and detailed descriptions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Offers</h3>
              <p className="text-gray-600">
                Browse offers from other traders or wait for them to come to you. 
                Review each offer carefully.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete the Trade</h3>
              <p className="text-gray-600">
                Accept an offer, meet up safely, complete the exchange, and rate
                your trading experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Why Choose SoftBarter?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Trading</h3>
                <p className="text-gray-600 text-sm">
                  User verification and rating system ensure safe and reliable trades.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Fees</h3>
                <p className="text-gray-600 text-sm">
                  Trade without any hidden costs or transaction fees. It's completely free.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Community</h3>
                <p className="text-gray-600 text-sm">
                  Connect with people in your area for convenient in-person exchanges.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Reduce waste by giving items a second life through trading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      {!user && (
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of users who are already trading on SoftBarter.
              </p>
              <Link
                to="/register"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;