import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-blue-600 text-sm font-semibold rounded-full bg-blue-100 mb-4">
            Your Voice Matters
          </span>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to EngageRwanda
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
            Your platform for submitting and tracking citizen complaints. Help us make Rwanda better by reporting issues that need attention.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/complaints/new">
              <Button size="lg" className="shadow-lg shadow-blue-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Submit a Complaint
              </Button>
            </Link>
            <Link to="/complaints/track">
              <Button variant="secondary" size="lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Track a Complaint
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-xl px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                      <svg
                        className="h-7 w-7 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold text-gray-900 tracking-tight">
                    Submit Complaints
                  </h3>
                  <p className="mt-5 text-base text-gray-500 leading-relaxed">
                    Easily submit your complaints about various issues in your community. We'll make sure they reach the right authorities.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-xl px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
                      <svg
                        className="h-7 w-7 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold text-gray-900 tracking-tight">
                    Track Progress
                  </h3>
                  <p className="mt-5 text-base text-gray-500 leading-relaxed">
                    Keep track of your submitted complaints and stay updated on their status. Get notified when there are updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-xl px-6 pb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg shadow-green-500/30">
                      <svg
                        className="h-7 w-7 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold text-gray-900 tracking-tight">
                    Quick Response
                  </h3>
                  <p className="mt-5 text-base text-gray-500 leading-relaxed">
                    Our system ensures that your complaints are quickly routed to the appropriate agencies for prompt action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-10 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Your voice helps build a better Rwanda
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 