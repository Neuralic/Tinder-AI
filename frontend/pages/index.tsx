// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function TinderAICopilot() {
  const [activeTab, setActiveTab] = useState('bio');
  const [loading, setLoading] = useState({ bio: false, reply: false, askOut: false });
  const [bio, setBio] = useState('');
  const [bioReply, setBioReply] = useState('');
  const [message, setMessage] = useState('');
  const [messageReply, setMessageReply] = useState('');
  const [context, setContext] = useState('');
  const [askOutReply, setAskOutReply] = useState('');
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const analyzeBio = async () => {
    setLoading({ ...loading, bio: true });
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/analyze-bio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setBioReply(data.reply);
    } catch (err) {
      setError('Failed to analyze bio. Please try again.');
      console.error(err);
    } finally {
      setLoading({ ...loading, bio: false });
    }
  };

  const suggestReply = async () => {
    setLoading({ ...loading, reply: true });
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/suggest-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setMessageReply(data.reply);
    } catch (err) {
      setError('Failed to generate reply. Please try again.');
      console.error(err);
    } finally {
      setLoading({ ...loading, reply: false });
    }
  };

  const askThemOut = async () => {
    setLoading({ ...loading, askOut: true });
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/ask-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context }),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setAskOutReply(data.reply);
    } catch (err) {
      setError('Failed to generate ask-out suggestion. Please try again.');
      console.error(err);
    } finally {
      setLoading({ ...loading, askOut: false });
    }
  };

  // Clear error when switching tabs
  useEffect(() => {
    setError('');
  }, [activeTab]);

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
          </div>
          
          {/* Main Content */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
            {/* Bio Analyzer */}
            {activeTab === 'bio' && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Bio Analyzer</h2>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Paste a Tinder bio to get a clever, flirty, and funny first message to start a conversation
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Bio</label>
                    <textarea 
                      value={bio} 
                      onChange={e => setBio(e.target.value)} 
                      placeholder="Paste a Tinder bio here..."
                      className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all min-h-[120px]"
                    />
                  </div>
                  
                  <button 
                    onClick={analyzeBio}
                    disabled={loading.bio || !bio}
                    className={`w-full font-medium py-3 px-4 rounded-xl transition-all transform focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 ${
                      bio && !loading.bio
                        ? "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white hover:scale-[1.02]"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading.bio ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : "Generate Flirty Opener"}
                  </button>
                  
                  {bioReply && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-400 mb-1">Your Flirty Opener</h3>
                          <div className="bg-gray-800 p-4 rounded-lg mt-2 border-l-4 border-rose-500">
                            <p className="text-gray-300 italic">{bioReply}</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                              </svg>
                              Copy
                            </button>
                            <button onClick={() => setBioReply('')} className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors">
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
            
            {/* Reply Generator */}
            {activeTab === 'reply' && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Reply Generator</h2>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Craft a witty, fun, and engaging reply to keep the conversation going
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Received Message</label>
                    <textarea 
                      value={message} 
                      onChange={e => setMessage(e.target.value)} 
                      placeholder="Paste a message you received..."
                      className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all min-h-[120px]"
                    />
                  </div>
                  
                  <button 
                    onClick={suggestReply}
                    disabled={loading.reply || !message}
                    className={`w-full font-medium py-3 px-4 rounded-xl transition-all transform focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 ${
                      message && !loading.reply
                        ? "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white hover:scale-[1.02]"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading.reply ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Crafting reply...
                      </span>
                    ) : "Generate Witty Reply"}
                  </button>
                  
                  {messageReply && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <path d="m12 9 4 4" />
                            <path d="M12 17h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-400 mb-1">Your Perfect Reply</h3>
                          <div className="bg-gray-800 p-4 rounded-lg mt-2 border-l-4 border-amber-500">
                            <p className="text-gray-300 italic">"{messageReply}"</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                              </svg>
                              Copy
                            </button>
                            <button onClick={() => setMessageReply('')} className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors">
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
            
            {/* Ask Them Out */}
            {activeTab === 'askOut' && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Ask Them Out</h2>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Generate a smooth, confident way to ask your match out based on your conversation
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Conversation Context</label>
                    <textarea 
                      value={context} 
                      onChange={e => setContext(e.target.value)} 
                      placeholder="Paste your conversation history or describe your interaction..."
                      className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all min-h-[120px]"
                    />
                  </div>
                  
                  <button 
                    onClick={askThemOut}
                    disabled={loading.askOut || !context}
                    className={`w-full font-medium py-3 px-4 rounded-xl transition-all transform focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 ${
                      context && !loading.askOut
                        ? "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white hover:scale-[1.02]"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading.askOut ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating suggestion...
                      </span>
                    ) : "Suggest Ask-Out Approach"}
                  </button>
                  
                  {askOutReply && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-400 mb-1">Your Smooth Approach</h3>
                          <div className="bg-gray-800 p-4 rounded-lg mt-2 border-l-4 border-green-500">
                            <p className="text-gray-300 italic">"{askOutReply}"</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <button className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                              </svg>
                              Copy
                            </button>
                            <button onClick={() => setAskOutReply('')} className="text-sm bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors">
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