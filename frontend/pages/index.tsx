// pages/index.tsx
import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [bio, setBio] = useState('');
  const [reply, setReply] = useState('');
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState('flirty');
  const [generatedReply, setGeneratedReply] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageResult, setImageResult] = useState('');

  const analyzeBio = async () => {
    const res = await fetch('/analyze-bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }),
    });
    const data = await res.json();
    setReply(data.reply);
  };

  const generateReply = async () => {
    const res = await fetch('/suggest-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, tone }),
    });
    const data = await res.json();
    setGeneratedReply(data.reply);
  };

  const analyzeImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch('/analyze-image', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setImageResult(data.reply);
  };

  return (
    <>
      <Head>
        <title>Tinder AI Copilot</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-8 text-white">
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 rounded-3xl p-6 shadow-xl backdrop-blur">
          <h1 className="text-4xl font-bold text-center mb-6">🔥 Tinder AI Copilot</h1>

          {/* Bio Analyzer */}
          <div className="mb-6">
            <h2 className="text-2xl mb-2">📄 Analyze Bio</h2>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Paste Tinder bio here..." className="w-full p-3 rounded bg-white text-black mb-2" />
            <button onClick={analyzeBio} className="bg-black text-white px-4 py-2 rounded">Analyze</button>
            {reply && <p className="mt-2 bg-white text-black p-3 rounded">💬 {reply}</p>}
          </div>

          {/* Smart Reply Generator */}
          <div className="mb-6">
            <h2 className="text-2xl mb-2">💡 Smart Message Reply</h2>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Paste a message..." className="w-full p-3 rounded bg-white text-black mb-2" />
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-2 rounded bg-white text-black mb-2">
              <option value="flirty">Flirty</option>
              <option value="witty">Witty</option>
              <option value="bold">Bold</option>
              <option value="romantic">Romantic</option>
            </select>
            <button onClick={generateReply} className="bg-black text-white px-4 py-2 rounded">Generate Reply</button>
            {generatedReply && <p className="mt-2 bg-white text-black p-3 rounded">💬 {generatedReply}</p>}
          </div>

          {/* Image Analyzer */}
          <div>
            <h2 className="text-2xl mb-2">🖼️ Screenshot Analyzer</h2>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0] || null)} className="mb-2" />
            <button onClick={analyzeImage} className="bg-black text-white px-4 py-2 rounded">Analyze Screenshot</button>
            {imageResult && <p className="mt-2 bg-white text-black p-3 rounded">💬 {imageResult}</p>}
          </div>
        </div>
      </main>
    </>
  );
}