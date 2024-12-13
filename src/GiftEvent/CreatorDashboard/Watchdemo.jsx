import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Modal } from "flowbite-react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import { ButtonSmallPurple } from "../../component/Buttons";
import { Link } from "react-router-dom";

const videos = [
  {
    id: 1,
    title:
      "Get familiar with the most Innovative platform to Digitize your business/services.",
    url: "https://youtu.be/XcIUaRqAXs4?si=qiUmQhYi5XulSl9c",
    duration: "11:42",
  },
];

const VideoGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVideoClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalOpen(true);
  };

  return (
    <CreatorDashboardLayout>
      <div className="p-6 lg:p-10 space-y-5">
        <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
          <Heading className="font-semibold text-[13px] lg:text-[26px] text-primary4">
            All Demo Videos
          </Heading>

          <img
            src={EditTemplateImage}
            alt=""
            className="w-32 pr-6 right-0 bottom-0 absolute"
          />
        </div>
        {/* Search and Back Button */}
        <div className="lg:flex justify-between items-center mb-8 space-y-3 lg:space-y-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-sec2 rounded-md px-4 py-2 pl-10 focus:outline-none focus:border-primary3"
            />
            {/* SVG for Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ter15 w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <line x1="21" y1="21" x2="15.8" y2="15.8" />
            </svg>
          </div>
          <Link to="/creator/dashboard/overview">
            <ButtonSmallPurple className="bg-primary3 text-primary1 rounded-md px-4 py-2 hover:bg-primary3">
              Back to Dashboard
            </ButtonSmallPurple>
          </Link>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-primary1 shadow-md rounded-md p-4"
            >
              <div
                className="relative"
                onClick={() => handleVideoClick(video.url)}
              >
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="200px"
                  controls={false}
                  light={true} // Enable light mode for preview
                />
                <div className="absolute bottom-3 right-3 bg-primary2 text-primary1 text-sm rounded-full px-2 py-1 opacity-75">
                  {video.duration}
                </div>
              </div>
              <Heading
                level={2}
                className="mt-2 font-semibold text-sm text-center"
              >
                {video.title}
              </Heading>
            </div>
          ))}
        </div>

        {/* Modal for Video Playback */}
        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>Playing Video</Modal.Header>
          <Modal.Body>
            {currentVideo && (
              <ReactPlayer
                url={currentVideo}
                width="100%"
                height="400px"
                controls={true}
                playing={modalOpen} // Auto-play when modal opens
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <button className="text-ter7" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </CreatorDashboardLayout>
  );
};

export default VideoGallery;

// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import { Modal } from "flowbite-react";
// import CreatorDashboardLayout from '../../layout/Creator/CreatorDashboardLayout';
// import axios from 'axios';

// const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube API key

// const videos = [
//   {
//     id: 1,
//     title: "How To Register With Dimp",
//     url: "https://www.youtube.com/watch?v=Uh3qN5EjL9U",
//   },
//   {
//     id: 2,
//     title: "How To Manage Service On Dimp",
//     url: "https://www.youtube.com/watch?v=Uh3qN5EjL9U",
//   },
//   // Add more video objects here...
// ];

// const VideoGallery = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [videoDurations, setVideoDurations] = useState({}); // Store video durations

//   useEffect(() => {
//     // Function to fetch video durations
//     const fetchVideoDuration = async (videoId) => {
//       try {
//         const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
//           params: {
//             part: 'contentDetails',
//             id: videoId,
//             key: API_KEY,
//           },
//         });
//         const duration = response.data.items[0]?.contentDetails?.duration;
//         return duration ? convertISO8601ToDuration(duration) : '00:00';
//       } catch (error) {
//         console.error("Error fetching video duration:", error);
//         return '00:00';
//       }
//     };

//     // Fetch durations for all videos
//     const fetchAllDurations = async () => {
//       const durations = {};
//       for (const video of videos) {
//         const videoId = new URL(video.url).searchParams.get('v');
//         durations[videoId] = await fetchVideoDuration(videoId);
//       }
//       setVideoDurations(durations);
//     };

//     fetchAllDurations();
//   }, []);

//   const convertISO8601ToDuration = (isoDuration) => {
//     const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
//     const hours = match[1] ? match[1].slice(0, -1) : '0';
//     const minutes = match[2] ? match[2].slice(0, -1) : '0';
//     const seconds = match[3] ? match[3].slice(0, -1) : '0';
//     return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   const filteredVideos = videos.filter(video =>
//     video.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleVideoClick = (videoUrl) => {
//     setCurrentVideo(videoUrl);
//     setModalOpen(true);
//   };

//   return (
//     <CreatorDashboardLayout>
//       <div className="p-6 lg:p-10">
//         {/* Header Section */}
//         <div className="bg-purple-100 p-4 rounded-md flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-semibold text-purple-800">All Demo Videos</h1>
//           <img
//             src="/path/to/your/image.svg" // Update with your image path
//             alt="Illustration"
//             className="w-20"
//           />
//         </div>

//         {/* Search and Back Button */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:border-purple-500"
//             />
//             {/* SVG for Search Icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="10.5" cy="10.5" r="6.5" />
//               <line x1="21" y1="21" x2="15.8" y2="15.8" />
//             </svg>
//           </div>
//           <button className="bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-600">
//             Back to Dashboard
//           </button>
//         </div>

//         {/* Video Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredVideos.map((video) => {
//             const videoId = new URL(video.url).searchParams.get('v');
//             return (
//               <div key={video.id} className="bg-white shadow-md rounded-md p-4">
//                 <div className="relative" onClick={() => handleVideoClick(video.url)}>
//                   <ReactPlayer
//                     url={video.url}
//                     width="100%"
//                     height="200px"
//                     controls={false}
//                     light={true} // Enable light mode for preview
//                   />
//                   <div className="absolute bottom-3 right-3 bg-black text-white text-sm rounded-full px-2 py-1 opacity-75">
//                     {videoDurations[videoId] || 'Loading...'}
//                   </div>
//                 </div>
//                 <h2 className="mt-2 font-semibold text-sm text-center">{video.title}</h2>
//               </div>
//             );
//           })}
//         </div>

//         {/* Modal for Video Playback */}
//         <Modal
//           show={modalOpen}
//           onClose={() => setModalOpen(false)}
//         >
//           <Modal.Header>Playing Video</Modal.Header>
//           <Modal.Body>
//             {currentVideo && (
//               <ReactPlayer
//                 url={currentVideo}
//                 width="100%"
//                 height="400px"
//                 controls={true}
//                 playing={modalOpen} // Auto-play when modal opens
//               />
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <button
//               className="text-red-500"
//               onClick={() => setModalOpen(false)}
//             >
//               Close
//             </button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </CreatorDashboardLayout>
//   );
// };

// export default VideoGallery;
