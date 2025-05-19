import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Add animations CSS
const animationStyles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes fadeInDown {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInRight {
    0% { opacity: 0; transform: translateX(-20px); }
    100% { opacity: 1; transform: translateX(0); }
  }
`;

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Add the animations */}
      <style>{animationStyles}</style>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 z-0"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{animation: 'blob 7s infinite'}}></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{animation: 'blob 7s infinite 2s'}}></div>
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{animation: 'blob 7s infinite 4s'}}></div>
        
        <div className="max-w-7xl mx-auto py-20 px-4 sm:py-28 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:space-x-10">
            <div className="text-center lg:text-left lg:w-1/2">
              <div className="flex items-center justify-center lg:justify-start mb-4" style={{animation: 'fadeInDown 0.6s ease-out'}}>
                <span className="relative inline-flex">
                  <span className="inline-flex items-center px-4 py-2 text-blue-600 text-sm font-semibold rounded-full bg-blue-100">
                    <span className="flex h-3 w-3 mr-2">
                    
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Your Voice Matters
                  </span>
                </span>
              </div>
              
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 sm:text-5xl sm:tracking-tight lg:text-6xl" style={{animation: 'fadeInDown 0.6s ease-out 0.2s both'}}>
                Welcome to <br className="hidden sm:block" />
                <span className="text-blue-700">Engage</span>Rwanda
              </h1>
              
              <p className="mt-5 max-w-2xl mx-auto lg:mx-0 text-xl text-gray-600" style={{animation: 'fadeInDown 0.6s ease-out 0.4s both'}}>
                Empowering citizens to report and resolve issues directly with government agencies. 
                Together, we can build a more responsive and accountable Rwanda.
              </p>
              
              <div className="flex flex-wrap mt-8 justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4" style={{animation: 'fadeInDown 0.6s ease-out 0.6s both'}}>
                <Link to="/complaints/new">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-blue-500/20 group transition-all duration-300 transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Submit a Complaint
                  </Button>
                </Link>
                <Link to="/complaints/track">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto group transition-all duration-300 transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Track Your Complaint
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8" style={{animation: 'fadeInDown 0.6s ease-out 0.8s both'}}>
                <div className="inline-flex items-center text-sm text-gray-500">
                  <span className="flex flex-nowrap -space-x-1 mr-3">
                    {/* User avatars */}
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" />
                    </span>
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" />
                    </span>
                    <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" />
                    </span>
                  </span>
                  <span>
                    <span className="font-medium">2,300+</span> citizens engaged since launch
                  </span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block lg:w-1/2 mt-12 lg:mt-0" style={{animation: 'fadeInRight 0.8s ease-out both'}}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1564681112758-bae484cff6b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                    alt="Citizens collaborating"
                    className="rounded-xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      <div className="rounded-full bg-green-500 h-3 w-3 animate-pulse"></div>
                    </div>
                    <p className="text-xs font-medium text-gray-600">Issues resolved within 7 days on average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 relative lg:hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1564681112758-bae484cff6b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Citizens collaborating"
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 flex items-center space-x-2">
                <div className="flex -space-x-1">
                  <div className="rounded-full bg-green-500 h-3 w-3 animate-pulse"></div>
                </div>
                <p className="text-xs font-medium text-gray-600">7-day avg. resolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            A simple process to ensure your concerns reach the right authorities
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden absolute top-1/2 w-full h-0.5 bg-gray-200 md:block" aria-hidden="true"></div>
            
            <div className="relative z-10 grid gap-8 grid-cols-1 md:grid-cols-4">
              {/* Step 1 */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4 transition-transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Submit</h3>
                <p className="text-center text-gray-500">Fill out the complaint form with details about your issue</p>
              </div>

              {/* Step 2 */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4 transition-transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Route</h3>
                <p className="text-center text-gray-500">Your complaint is sent to the appropriate government agency</p>
              </div>

              {/* Step 3 */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4 transition-transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Process</h3>
                <p className="text-center text-gray-500">Officials review and take action on your complaint</p>
              </div>

              {/* Step 4 */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 transition-transform hover:scale-110 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Resolve</h3>
                <p className="text-center text-gray-500">Get updates as your issue is addressed and resolved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Key Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Everything you need to get your concerns addressed efficiently
          </p>
        </div>

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
                  Easy Submission
                </h3>
                <p className="mt-5 text-base text-gray-500 leading-relaxed">
                  Submit complaints with our user-friendly form - upload photos, describe your issue, and let us handle the rest.
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-gray-900 tracking-tight">
                  Smart Routing
                </h3>
                <p className="mt-5 text-base text-gray-500 leading-relaxed">
                  Our platform automatically directs your complaint to the right government agency based on the category you select.
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-8 text-lg font-semibold text-gray-900 tracking-tight">
                  Real-Time Tracking
                </h3>
                <p className="mt-5 text-base text-gray-500 leading-relaxed">
                  Track the progress of your complaints in real-time with status updates at every stage of the resolution process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Institutions Section */}
      <div className="bg-white py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Supported Institutions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              We work with key government agencies to address citizen concerns
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {/* Agency 1 - RIB */}
            <div className="col-span-1 flex justify-center">
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 hover:bg-gray-200 transition-colors duration-300">
                <span className="text-gray-400 font-medium">RIB Logo</span>
              </div>
            </div>
            
            {/* Agency 2 - MINEDUC */}
            <div className="col-span-1 flex justify-center">
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 hover:bg-gray-200 transition-colors duration-300">
                <span className="text-gray-400 font-medium">MINEDUC Logo</span>
              </div>
            </div>
            
            {/* Agency 3 - MINADEF */}
            <div className="col-span-1 flex justify-center">
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 hover:bg-gray-200 transition-colors duration-300">
                <span className="text-gray-400 font-medium">MINADEF Logo</span>
              </div>
            </div>
            
            {/* Agency 4 */}
            <div className="col-span-1 flex justify-center">
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 hover:bg-gray-200 transition-colors duration-300">
                <span className="text-gray-400 font-medium">Agency Logo</span>
              </div>
            </div>
            
            {/* Agency 5 */}
            <div className="col-span-1 flex justify-center">
              <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center p-4 hover:bg-gray-200 transition-colors duration-300">
                <span className="text-gray-400 font-medium">Agency Logo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Citizens Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Real stories from Rwandans who have used our platform
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                JN
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Jean Niyimena</h4>
                <p className="text-gray-500">Kigali, Rwanda</p>
              </div>
            </div>
            <div className="relative">
              <svg className="absolute top-0 left-0 h-8 w-8 text-gray-200 transform -translate-x-3 -translate-y-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative text-gray-600 italic">
                I reported a broken streetlight in my neighborhood, and it was fixed within a week. This platform really makes a difference.
              </p>
            </div>
            <div className="mt-4 flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <svg key={index} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                CM
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Claire Mutesi</h4>
                <p className="text-gray-500">Musanze, Rwanda</p>
              </div>
            </div>
            <div className="relative">
              <svg className="absolute top-0 left-0 h-8 w-8 text-gray-200 transform -translate-x-3 -translate-y-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative text-gray-600 italic">
                The education department responded to my complaint about school facilities within 3 days. I'm impressed with the efficiency!
              </p>
            </div>
            <div className="mt-4 flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <svg key={index} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                PK
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Patrick Kagabo</h4>
                <p className="text-gray-500">Huye, Rwanda</p>
              </div>
            </div>
            <div className="relative">
              <svg className="absolute top-0 left-0 h-8 w-8 text-gray-200 transform -translate-x-3 -translate-y-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative text-gray-600 italic">
                Being able to track the status of my complaint gives me confidence that my voice is being heard. Great service!
              </p>
            </div>
            <div className="mt-4 flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <svg key={index} className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact & Support Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Need Help?
              </h2>
              <p className="mt-4 text-lg text-blue-100 max-w-3xl">
                Our support team is here to assist you with any questions or issues you may have with the platform.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-blue-50">
                    <p>+250 788 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-blue-50">
                    <p>support@engagerwanda.gov.rw</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3 text-base text-blue-50">
                    <p>KG 123 St, Kigali, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                  <h3 className="text-2xl font-semibold text-gray-900">Send us a message</h3>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" id="name" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" placeholder="Your name" />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" placeholder="you@example.com" />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                      <textarea id="message" rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border" placeholder="How can we help you?"></textarea>
                    </div>
                    
                    <div>
                      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">EngageRwanda</h3>
              <p className="text-gray-400 max-w-md">
                A government initiative to improve communication between citizens and public institutions, enhancing accountability and responsiveness.
              </p>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</Link></li>
                <li><Link to="/complaints/faq" className="text-gray-400 hover:text-white transition-colors duration-200">FAQs</Link></li>
                <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors duration-200">News & Updates</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} EngageRwanda. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 