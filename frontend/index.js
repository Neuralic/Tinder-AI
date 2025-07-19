import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [intent, setIntent] = useState("");
  const [tone, setTone] = useState("");
  const [mode, setMode] = useState("bio");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    let url = "";
    let payload = {};
    if (mode === "bio") {
      url = "https://tinder-ai-q1ym.onrender.com/analyze-bio";
      payload = { bio };
    } else if (mode === "reply") {
      url = "https://tinder-ai-q1ym.onrender.com/suggest-reply";
      payload = { message, intent };
    } else if (mode === "askout") {
      url = "https://tinder-ai-q1ym.onrender.com/ask-out";
      payload = { convo: message, tone };
    }
    try {
      const res = await axios.post(url, payload);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔥 Tinder AI Assistant</h1>
      <div className="mb-4">
        <select className="border p-2" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="bio">Analyze Bio</option>
          <option value="reply">Suggest Reply</option>
          <option value="askout">Ask Out</option>
        </select>
      </div>
      {mode === "bio" && (
        <textarea placeholder="Paste Tinder bio here" className="w-full border p-2 mb-2" value={bio} onChange={(e) => setBio(e.target.value)} />
      )}
      {mode === "reply" && (
        <>
          <textarea placeholder="Their message..." className="w-full border p-2 mb-2" value={message} onChange={(e) => setMessage(e.target.value)} />
          <input placeholder="Your intent (flirt, joke, tease...)" className="w-full border p-2 mb-2" value={intent} onChange={(e) => setIntent(e.target.value)} />
        </>
      )}
      {mode === "askout" && (
        <>
          <textarea placeholder="Chat so far..." className="w-full border p-2 mb-2" value={message} onChange={(e) => setMessage(e.target.value)} />
          <input placeholder="Tone (funny, bold, romantic...)" className="w-full border p-2 mb-2" value={tone} onChange={(e) => setTone(e.target.value)} />
        </>
      )}
      <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded">Submit</button>
      <pre className="bg-gray-100 p-4 mt-4">{response}</pre>
    </main>
  );
}
