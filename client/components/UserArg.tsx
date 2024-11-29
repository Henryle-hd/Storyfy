'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Download, Send, BookOpen, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
      const res = await fetch('http://192.168.1.2:8080/api/test', {
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
    <div className="max-w-[1000px] mx-auto p-6">
      <div className="">
        
        <div className="">
          {!response &&(
            <>
            <div className="flex justify-start items-center mb-2">
          <Select onValueChange={(value)=>setSpeed(value)}>
            <SelectTrigger className="w-[100px] text-l p-5">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="slower">Slower</SelectItem>
            </SelectContent>
          </Select>
          </div>
          <Textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="py-4 pl-4 pr-16 lg:text-xl border rounded-xl shadow-xl  ring-2 focus:ring-blue-500 transition-all duration-200 w-[300px] lg:w-[700px] h-[100px] resize-none"
            placeholder="Type Topic to create a audio story (eg. History of Henry Ford)"
          />
          <div className="flex justify-end items-center">
          <Button
            onClick={handleSend}
            disabled={isLoading || !topic.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 lg:text-lg m-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create a Story<Send size={20} />
              </>
            )}
          </Button>
          </div>
          </>
          )}

          {response && (
            <div className="mt-4 p-4 bg-gray-100 rounded-xl">
              {response.error ? (
                <pre>{response.error}</pre>
              ) : (
                <div className="w-[100px] lg:max-w-[1000px] mx-auto p-6">
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-[700px]" >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">Your Story 😎</h2>
                      {response.path && (
                        <Link href={response.path} download>
                          <Button variant="outline" className="flex items-center gap-2 ring-2 focus:ring-blue-500">
                            <Download size={20} /> Download Audio
                          </Button>
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
                        <div className="flex items-center gap-2 mb-2 ">
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
