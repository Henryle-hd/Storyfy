// 'use client'
// import React, { useEffect, useState } from 'react'
// import { Download, BookOpen } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import Link from 'next/link';

// export default function SystemOutput() {
//   const [path, setPath] = useState('');
//   const [data, setData] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [topic, setTopic] = useState('');

//   const fetchData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await fetch(`http://127.0.0.1:8080/api/test`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
//       if (result.script === 'No topic provided') {
//         setError('Please provide a topic');
//         setPath('');
//         setData('');
//       } else {
//         setPath(result.path);
//         setData(result.script);
//       }
//     } catch (error) {
//       setError(error instanceof Error ? error.message : String(error));
//       setPath('');
//       setData('');
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     const pollData = setInterval(() => {
//       if (data === '' && !error) {
//         fetchData();
//       }
//     }, 2000);

//     return () => clearInterval(pollData);
//   }, [data, error]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!data && !path) return null;

//   return (
//     // <div className="max-w-[1000px] mx-auto p-6">
//     //   <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-[700px]" >
//     //     <div className="flex items-center justify-between mb-4">
//     //       <h2 className="text-2xl font-bold text-gray-800">Your Story 😎</h2>
//     //       {path && (
//     //         <Link href={path} download>
//     //           <Button variant="outline" className="flex items-center gap-2 ring-2 focus:ring-blue-500">
//     //             <Download size={20} /> Download Audio
//     //           </Button>
//     //         </Link>
//     //       )}
//     //     </div>
//     //     <div className="bg-gray-50 rounded-lg p-4">
//     //       <audio controls className="w-full">
//     //         <source src={path} type="audio/mpeg" />
//     //         Your browser does not support the audio tag.
//     //       </audio>
//     //     </div>
//     //     <div className="bg-gray-50 rounded-lg p-4 mb-4">
//     //       <div className="flex items-center gap-2 mb-2">
//     //         <BookOpen size={20} className="text-blue-500" />
//     //         <h3 className="text-lg font-semibold">Script</h3>
//     //       </div>
//     //       <p className="text-gray-700 whitespace-pre-line">{data}</p>
//     //     </div>
//     //   </div>
//     // </div>
//   )
// }