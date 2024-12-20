'use client'
import { useState } from "react";
import { Download, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";

export default function UserArg() {
  const [topic, setTopic] = useState('');
  const [response, setResponse] = useState<{
    error?: string;
    path?: string;
    script?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [speed, setSpeed] = useState('normal');

  const handleSend: () => Promise<void> = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('https://storyfy-su92.onrender.com/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic: topic, speed:speed })
      });
      const data = await res.json();
      console.log('Response:', data);
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Error occurred during request' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 sm:p-6">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-[700px]">
          {!response &&(
            <>
            <div className="flex justify-center items-center mb-4">
              <select 
              title="Speed"
                onChange={(e) => setSpeed(e.target.value)}
                className="w-[100px] text-l px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              >
                <option value="" disabled selected>Speed</option>
                <option value="normal">Normal</option>
                <option value="slower">Slower</option>
              </select>
            </div>
            <div className="flex justify-center">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="py-4 px-4 text-base lg:text-xl border rounded-xl shadow-xl ring-2 focus:ring-blue-500 transition-all duration-200 w-full max-w-[700px] h-[100px] resize-none"
                placeholder="Type Topic to create a audio story (eg. village love)"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSend}
                disabled={isLoading || !topic.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-base lg:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating🚀
                  </>
                ) : (
                  <>
                    Create a Story👌
                  </>
                )}
              </button>
            </div>
            </>
          )}

          {response && (
            <div className="mt-4 p-4 bg-gray-100 rounded-xl">
              {response.error ? (
                <pre className="text-center">{response.error}</pre>
              ) : (
                <div className="w-full mx-auto">
                  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Story 😎🎉🔥</h2>
                      {response.path && (
                        <Link href={response.path} download>
                          <button className="border border-gray-200 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2 ring-2 focus:ring-blue-500">
                            <Download size={20} /> Download Audio
                          </button>
                        </Link>
                      )}
                    </div>
                    {response.path && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <audio controls className="w-full">
                          <source src={response.path} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      </div>
                    )}
                    {response.script && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4 overflow-y-scroll max-h-80 no-scrollbar">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen size={20} className="text-blue-500" />
                          <h3 className="text-lg font-semibold">Script</h3>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{response.script}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
