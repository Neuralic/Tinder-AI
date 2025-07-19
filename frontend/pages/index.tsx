// pages/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function TinderAICopilot() {
  const [activeTab, setActiveTab] = useState('bio');
  const [loading, setLoading] = useState({ 
    bio: false, 
    reply: false, 
    askOut: false,
    profile: false
  });
  const [bio, setBio] = useState('');
  const [bioReply, setBioReply] = useState('');
  const [message, setMessage] = useState('');
  const [messageReply, setMessageReply] = useState('');
  const [context, setContext] = useState('');
  const [askOutReply, setAskOutReply] = useState('');
  const [error, setError] = useState('');
  
  // New states for profile analyzer
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [goals, setGoals] = useState('');
  const [confidence, setConfidence] = useState('5');
  const [feedback, setFeedback] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Clear error when switching tabs
  useEffect(() => {
    setError('');
  }, [activeTab]);

  // Handle image preview
  useEffect(() => {
    if (!image) {
      setPreviewUrl('');
      return;
    }
    
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // Existing functions (analyzeBio, suggestReply, askThemOut) remain the same

  // New profile analyzer function
  const analyzeProfile = async () => {
    if (!image) {
      setError('Please upload a profile picture');
      return;
    }
    
    setLoading({ ...loading, profile: true });
    setError('');
    
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(image);
      
      const imageBase64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
        reader.onerror = error => reject(error);
      });

      const response = await fetch(`${API_URL}/analyze-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: imageBase64,
          name,
          age,
          gender,
          goals,
          confidence
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setFeedback(data.feedback);
    } catch (err) {
      setError('Failed to analyze profile. Please try again.');
      console.error(err);
    } finally {
      setLoading({ ...loading, profile: false });
    }
  };

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Head>
        <title>Tinder AI Copilot</title>
        <meta name="description" content="AI-powered Tinder assistant for better matches" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white font-sans">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `rgba(${Math.random() > 0.5 ? '255, 90, 90' : '255, 200, 100'}, ${Math.random() * 0.3 + 0.1})`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:px-6">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 p-1 rounded-full shadow-lg">
                <div className="bg-gray-900 p-1 rounded-full">
                  <div className="bg-gradient-to-r from-rose-600 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400 mb-3 font-poppins">
              Tinder AI Copilot
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto text-lg">
              AI-powered assistant to craft perfect messages, analyze profiles, and land dates
            </p>
          </header>
          
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-xl backdrop-blur flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {/* Navigation Tabs */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-8 shadow-lg">
            <button 
              onClick={() => setActiveTab('bio')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all flex items-center justify-center gap-2 ${
                activeTab === 'bio' 
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 shadow-lg' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
              Bio Analyzer
            </button>
            
            <button 
              onClick={() => setActiveTab('reply')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all flex items-center justify-center gap-2 ${
                activeTab === 'reply' 
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 shadow-lg' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Reply Generator
            </button>
            
            <button 
              onClick={() => setActiveTab('askOut')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all flex items-center justify-center gap-2 ${
                activeTab === 'askOut' 
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 shadow-lg' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Ask Them Out
            </button>

            {/* New Profile Analyzer Tab */}
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all flex items-center justify-center gap-2 ${
                activeTab === 'profile' 
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 shadow-lg' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              Profile Analyzer
            </button>
          </div>
          
          {/* Main Content */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
            {/* Bio Analyzer (existing) */}
            {activeTab === 'bio' && (
              // ... existing bio analyzer code
            )}
            
            {/* Reply Generator (existing) */}
            {activeTab === 'reply' && (
              // ... existing reply generator code
            )}
            
            {/* Ask Them Out (existing) */}
            {activeTab === 'askOut' && (
              // ... existing ask out code
            )}
            
            {/* New Profile Analyzer Tab Content */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Profile Analyzer</h2>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Upload your profile picture and provide details to get personalized feedback and improvement suggestions
                </p>
                
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Picture</label>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-rose-500 transition-colors"
                        >
                          {previewUrl ? (
                            <div className="relative">
                              <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full h-48 object-cover rounded-lg mb-3"
                              />
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setImage(null);
                                }}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="py-10">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                              </svg>
                              <p className="text-gray-500">Click to upload a photo</p>
                              <p className="text-sm text-gray-600 mt-1">JPG or PNG, max 5MB</p>
                            </div>
                          )}
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Name</label>
                          <input 
                            type="text" 
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Age</label>
                            <input 
                              type="number" 
                              value={age}
                              onChange={e => setAge(e.target.value)}
                              placeholder="Your age"
                              className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Gender</label>
                            <select 
                              value={gender}
                              onChange={e => setGender(e.target.value)}
                              className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="non-binary">Non-binary</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Dating Goals</label>
                          <select 
                            value={goals}
                            onChange={e => setGoals(e.target.value)}
                            className="w-full p-3 rounded-xl bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                          >
                            <option value="">What are you looking for?</option>
                            <option value="serious-relationship">Serious relationship</option>
                            <option value="casual-dating">Casual dating</option>
                            <option value="friendship">Friendship</option>
                            <option value="not-sure">Not sure yet</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Confidence Level: <span className="text-amber-400">{confidence}/10</span>
                          </label>
                          <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={confidence}
                            onChange={e => setConfidence(e.target.value)}
                            className="w-full accent-amber-500"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Not confident</span>
                            <span>Very confident</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={analyzeProfile}
                    disabled={loading.profile || !image}
                    className={`w-full font-medium py-3 px-4 rounded-xl transition-all transform focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 ${
                      image && !loading.profile
                        ? "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white hover:scale-[1.02]"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading.profile ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing profile...
                      </span>
                    ) : "Get Profile Feedback"}
                  </button>
                  
                  {feedback && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <div className="w-full">
                          <h3 className="font-semibold text-green-400 mb-1">Profile Feedback</h3>
                          <div className="bg-gray-800 p-4 rounded-lg mt-2 border-l-4 border-green-500">
                            <div className="whitespace-pre-line text-gray-300">{feedback}</div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button 
                              onClick={() => navigator.clipboard.writeText(feedback)}
                              className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                              </svg>
                              Copy
                            </button>
                            <button 
                              onClick={() => {
                                setFeedback('');
                                setImage(null);
                              }} 
                              className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-rose-900/30 to-amber-900/30 p-5 rounded-xl border border-rose-800/30 backdrop-blur">
              <div className="text-3xl font-bold text-rose-300 mb-2">95%</div>
              <div className="text-gray-400">Response Rate</div>
            </div>
            <div className="bg-gradient-to-br from-rose-900/30 to-amber-900/30 p-5 rounded-xl border border-rose-800/30 backdrop-blur">
              <div className="text-3xl font-bold text-amber-300 mb-2">87%</div>
              <div className="text-gray-400">Date Conversion</div>
            </div>
            <div className="bg-gradient-to-br from-rose-900/30 to-amber-900/30 p-5 rounded-xl border border-rose-800/30 backdrop-blur">
              <div className="text-3xl font-bold text-yellow-300 mb-2">3.2×</div>
              <div className="text-gray-400">More Matches</div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p className="mb-2">Tinder AI Copilot • Your AI-powered dating assistant</p>
            <p>Powered by OpenAI GPT-3.5 Turbo</p>
          </footer>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }
        h1, h2, h3 {
          font-family: 'Poppins', sans-serif;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f43f5e, #f59e0b);
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
