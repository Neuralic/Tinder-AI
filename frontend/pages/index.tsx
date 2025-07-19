// pages/index.tsx
import React, { useState, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [bio, setBio] = useState('');
  const [reply, setReply] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('flirty');
  const [generatedReply, setGeneratedReply] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageResult, setImageResult] = useState('');
  const [activeTab, setActiveTab] = useState('bio');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeBio = async () => {
    // Simulate API call
    setReply('This bio shows you enjoy outdoor activities and photography. Suggest highlighting your adventurous side while mentioning you recently visited Yosemite.');
  };

  const generateReply = async () => {
    // Simulate API call
    const replies = {
      flirty: "That sunset has nothing on you... I'd love to catch one together sometime 😉",
      witty: "I'm not a photographer, but I'd definitely make an exception to capture that smile!",
      bold: "Let's skip the small talk and grab drinks this weekend. What's your schedule like?",
      romantic: "Your message made my day brighter than that sunset. I'd love to get to know the person behind that beautiful view."
    };
    setGeneratedReply(replies[tone as keyof typeof replies]);
  };

  const analyzeImage = async () => {
    if (!image) return;
    // Simulate API call
    setImageResult('This photo shows a group of friends hiking. Suggest asking about their favorite hiking spot or if they prefer mountains vs beaches.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <Head>
        <title>Tinder AI Copilot</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-4 md:p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-rose-500 to-amber-500 p-1 rounded-full">
                <div className="bg-gray-900 rounded-full p-1">
                  <div className="bg-gradient-to-r from-rose-600 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400 mb-2">
              Tinder AI Copilot
            </h1>
            <p className="text-gray-400 max-w-md mx-auto">
              AI-powered tools to enhance your dating experience
            </p>
          </header>

          {/* Navigation Tabs */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-8">
            <button 
              onClick={() => setActiveTab('bio')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${activeTab === 'bio' ? 'bg-gray-700 shadow-lg' : 'hover:bg-gray-750'}`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
                Bio Analyzer
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('reply')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${activeTab === 'reply' ? 'bg-gray-700 shadow-lg' : 'hover:bg-gray-750'}`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Reply Generator
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('image')} 
              className={`flex-1 py-3 px-4 rounded-lg text-center transition-all ${activeTab === 'image' ? 'bg-gray-700 shadow-lg' : 'hover:bg-gray-750'}`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                Image Analyzer
              </span>
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
                  Paste a Tinder bio to get insights and suggestions for improving your match potential.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio Text</label>
                    <textarea 
                      value={bio} 
                      onChange={e => setBio(e.target.value)} 
                      placeholder="Paste Tinder bio here..." 
                      className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all min-h-[120px]"
                    />
                  </div>
                  
                  <button 
                    onClick={analyzeBio} 
                    className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-medium py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
                  >
                    Analyze Bio
                  </button>
                  
                  {reply && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-400 mb-1">Analysis Result</h3>
                          <p className="text-gray-300">{reply}</p>
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
                  Generate the perfect response to any message with your preferred tone.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Received Message</label>
                    <textarea 
                      value={message} 
                      onChange={e => setMessage(e.target.value)} 
                      placeholder="Paste a message you received..." 
                      className="w-full p-4 rounded-xl bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Tone</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['flirty', 'witty', 'bold', 'romantic'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={`py-3 px-4 rounded-xl transition-all ${tone === t 
                            ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white' 
                            : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'}`}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={generateReply} 
                    className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-medium py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
                  >
                    Generate Reply
                  </button>
                  
                  {generatedReply && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <path d="m12 9 4 4" />
                            <path d="M12 17h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-400 mb-1">Generated Reply</h3>
                          <p className="text-gray-300 italic">"{generatedReply}"</p>
                          <div className="mt-4 flex gap-2">
                            <button className="text-xs bg-gray-700 hover:bg-gray-600 py-1 px-3 rounded-lg transition-colors">
                              Copy to Clipboard
                            </button>
                            <button className="text-xs bg-gray-700 hover:bg-gray-600 py-1 px-3 rounded-lg transition-colors">
                              Regenerate
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Image Analyzer */}
            {activeTab === 'image' && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-rose-500/20 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Screenshot Analyzer</h2>
                </div>
                
                <p className="text-gray-400 mb-6">
                  Upload a screenshot of a Tinder profile or conversation to get insights and suggestions.
                </p>
                
                <div className="space-y-6">
                  <div 
                    className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-rose-500 transition-colors bg-gray-700/20"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                    <div className="flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                      </svg>
                      <p className="text-gray-400 mb-1">
                        {image ? "Image ready for analysis" : "Click to upload an image"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {image ? image.name : "PNG, JPG, GIF up to 10MB"}
                      </p>
                      {image && (
                        <div className="mt-4 max-w-xs mx-auto">
                          <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                            <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <path d="M21 15l-5-5L5 21" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={analyzeImage} 
                    disabled={!image}
                    className={`w-full font-medium py-3 px-4 rounded-xl transition-all transform focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 ${
                      image 
                        ? "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white hover:scale-[1.02]"
                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Analyze Screenshot
                  </button>
                  
                  {imageResult && (
                    <div className="mt-6 p-5 bg-gray-700/50 border border-gray-600 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-lg flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-400 mb-1">Analysis Result</h3>
                          <p className="text-gray-300">{imageResult}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <footer className="mt-8 text-center text-gray-500 text-sm">
            <p>Tinder AI Copilot • Your AI-powered dating assistant</p>
          </footer>
        </div>
      </main>
    </>
  );
}
