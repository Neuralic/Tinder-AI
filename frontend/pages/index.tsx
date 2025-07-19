import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Tinder AI Assistant</title>
        <meta name="description" content="Find better matches with AI." />
      </Head>
      <div className="bg-gradient-to-tr from-slate-900 to-gray-800 min-h-screen text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg max-w-xl"
        >
          <h1 className="text-4xl font-bold mb-4">Your Personal Tinder Wingman</h1>
          <p className="mb-6 text-lg">Analyze bios, generate witty replies, and score dates with smart AI assistance.</p>
          <a href="#" className="px-6 py-3 rounded-xl bg-pink-600 text-white hover:bg-pink-500 transition">Try It Now</a>
        </motion.div>
      </div>
    </>
  );
}
