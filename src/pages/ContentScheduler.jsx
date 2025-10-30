import React, { useState } from 'react';
import { Calendar, Clock, Filter, Plus, MoreHorizontal, FileEdit } from 'lucide-react'; // Added FileEdit
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ScheduledPost = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${post.platformColor}`}>
            <span className="text-white font-bold">{post.platformIcon}</span>
          </div>
          <div>
            <h3 className="font-medium">{post.title}</h3>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{post.date}</span>
              <Clock className="w-3 h-3 ml-3 mr-1" />
              <span>{post.time}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 text-xs rounded-full ${post.statusColor}`}>
            {post.status}
          </span>
          <button className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        {post.content}
      </div>
      
      {post.image && (
        <div className="mt-3">
          <img src={post.image} alt="Post preview" className="rounded-md h-32 w-full object-cover" />
        </div>
      )}
    </div>
  );
};

const ContentScheduler = ({ isEmbedded = false }) => { // Add isEmbedded prop
  const [activeTab, setActiveTab] = useState('scheduled');
  const navigate = useNavigate(); // Initialize useNavigate
  
  const scheduledPosts = [
    {
      id: 1,
      title: 'Summer Sale Announcement',
      platformIcon: 'FB',
      platformColor: 'bg-blue-600',
      date: 'Today',
      time: '3:00 PM',
      status: 'Scheduled',
      statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
      content: 'Get ready for our biggest summer sale yet! Starting tomorrow, enjoy up to 50% off on all products.',
      image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/cde0/9161/7d3418a365ef54477675380faf33918c?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bPpokdK9WoK4eTBBouDNaiY7W-NhaUaSkycNUeFSpAXpBinp2FirNQmtWEza3H4SLm6cKyds6SUWKk5wckqOh8ueF2qy~DMwmzqkk3J0xRCu-rrfLsAJ2-0z2SrGMtuYbKUv3grMiWRHGw5a0-xI7pYHjI4Io~vCiha3GVpxf-nxNCtMLuzmn4kiJJZ8VgW8bzVVoGPTX9DnrMRiUuECVNlM-S4s2NvbkpuByxyTxWPqnSyzXFVqk-WZzgmuT~FBBDkH0dS36zGq-mtEp3fvh9YMQhQEkYSCs1C5K2UuFJ8DepKyMVw9VvwhQ8m04eMBAs2wSsfL0ex2QA5zZpeorQ__'
    },
    {
      id: 2,
      title: 'New Product Launch',
      platformIcon: 'IG',
      platformColor: 'bg-pink-600',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'Scheduled',
      statusColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200',
      content: 'Introducing our newest product line! Check out these amazing features that will revolutionize your experience.',
      image: null
    },
    {
      id: 3,
      title: 'Weekly Tips & Tricks',
      platformIcon: 'TW',
      platformColor: 'bg-blue-400',
      date: 'Jul 15, 2023',
      time: '2:30 PM',
      status: 'Draft',
      statusColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      content: 'Here are this week\'s top 5 tips to maximize your productivity while working from home.',
      image: null
    }
  ];
  
  const draftPosts = [
    {
      id: 4,
      title: 'Customer Testimonial',
      platformIcon: 'LI',
      platformColor: 'bg-blue-700',
      date: 'Not scheduled',
      time: '',
      status: 'Draft',
      statusColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      content: 'Hear what our customers are saying about their experience with our premium services.',
      image: null
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      platformIcon: 'YT',
      platformColor: 'bg-red-600',
      date: 'Not scheduled',
      time: '',
      status: 'Draft',
      statusColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      content: 'Take a look behind the scenes at our latest photoshoot for the upcoming fall collection.',
      image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/739b/c72e/00ccdfac86c98f764c0d40b9082c0948?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eVvY0kExVSk8VGAneULrqM2Pco4VJ7Mw6QwHRH9C2kFQJJ21zDnKl4S6a-WCgoEwGvLvtgLX3E1oXtEKZCtwV~QCZ3pJGZrULGwb-lFt50Vkz9GUkNWsO62AW-QJVvlMuyxEI83ze4I4AxRWtbP1KXpAoRanxyPfp1mIw6nW6HL~KYSVpIxOvBfCtsXhUdoYEuX23P2~2Is6e90aFNdD9hR5Nca-sXWaMFSqWRYx~SKcthrPBsV8l49eeiht-7BTEVIgpxNd2hJ75qJpaam6s7tRn9ADVHi7Fm5v1nvee-p9VJagdp-3DKc1-ADYXQm085srbBYWhiUY6mMb2HGYRg__'
    }
  ];
  
  const publishedPosts = [
    {
      id: 6,
      title: 'Weekend Flash Sale',
      platformIcon: 'FB',
      platformColor: 'bg-blue-600',
      date: 'Jul 10, 2023',
      time: '9:00 AM',
      status: 'Published',
      statusColor: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200',
      content: 'Flash sale this weekend only! Use code FLASH25 for 25% off your entire purchase.',
      image: null
    },
    {
      id: 7,
      title: 'Company Milestone',
      platformIcon: 'LI',
      platformColor: 'bg-blue-700',
      date: 'Jul 8, 2023',
      time: '11:30 AM',
      status: 'Published',
      statusColor: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200',
      content: 'We\'re proud to announce that we\'ve reached 100,000 customers worldwide! Thank you for your continued support.',
      image: null
    }
  ];

  const renderPosts = () => {
    switch (activeTab) {
      case 'scheduled':
        return scheduledPosts.map(post => <ScheduledPost key={post.id} post={post} />);
      case 'drafts':
        return draftPosts.map(post => <ScheduledPost key={post.id} post={post} />);
      case 'published':
        return publishedPosts.map(post => <ScheduledPost key={post.id} post={post} />);
      default:
        return null;
    }
  };

  return (
    <div>
      {!isEmbedded && ( // Only show header if not embedded
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Content Scheduler</h1>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button 
              onClick={() => navigate('/post-creation')} // Navigate to post creation
              className="flex items-center gap-2 px-4 py-2 bg-theme-primary hover:bg-opacity-90 text-white rounded-md">
              <FileEdit className="w-4 h-4" /> {/* Changed icon to FileEdit */}
              <span>Create Post</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'scheduled' 
                  ? 'border-theme-primary text-theme-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('scheduled')}
            >
              Scheduled ({scheduledPosts.length})
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'drafts' 
                  ? 'border-theme-primary text-theme-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('drafts')}
            >
              Drafts ({draftPosts.length})
            </button>
            <button
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'published' 
                  ? 'border-theme-primary text-theme-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('published')}
            >
              Published ({publishedPosts.length})
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {renderPosts()}
        </div>
      </div>
    </div>
  );
};

export default ContentScheduler;
