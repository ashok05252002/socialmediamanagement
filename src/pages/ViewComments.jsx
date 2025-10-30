import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, MessageSquare, Calendar, ChevronDown, Youtube, Send } from 'lucide-react'; // Added Send
import CommentItem from '../components/CommentItem';

const ViewComments = () => {
  const [selectedPostFilter, setSelectedPostFilter] = useState('all'); // Renamed from selectedPost to avoid confusion
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilterType, setDateFilterType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const dateFilterRef = useRef(null);

  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [currentReplyText, setCurrentReplyText] = useState('');
  
  const posts = [
    { id: 'post1', title: 'Summer Collection Launch', platform: 'Instagram', date: '2023-07-10' },
    { id: 'post2', title: 'Weekly Tips & Tricks', platform: 'Facebook', date: '2023-07-08' },
    { id: 'post3', title: 'Customer Testimonial Video', platform: 'LinkedIn', date: '2023-07-05' },
    { id: 'post4', title: 'Product Feature Announcement', platform: 'Twitter', date: '2023-07-02' },
    { id: 'post5', title: 'New YouTube Channel Trailer', platform: 'YouTube', date: '2023-07-12' },
  ];
  
  const comments = [ // Using the same mock data as ViewPosts
    { 
      id: 1, 
      postId: 'post1', 
      user: 'Sarah Johnson', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/women/12.jpg',
      text: 'Love the new collection! Can\'t wait to get my hands on that blue dress.',
      date: '2023-07-10T14:23:00',
      likes: 12,
      isReplied: true
    },
    { 
      id: 2, 
      postId: 'post1', 
      user: 'Michael Chen', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/22.jpg',
      text: 'The colors are amazing this season! Will you be restocking the sold out items?',
      date: '2023-07-10T15:42:00',
      likes: 5,
      isReplied: false
    },
    { 
      id: 3, 
      postId: 'post2', 
      user: 'Emily Rodriguez', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/women/32.jpg',
      text: 'These tips are super helpful! I\'ve been implementing them in my routine and seeing results already.',
      date: '2023-07-08T09:15:00',
      likes: 18,
      isReplied: true
    },
    { 
      id: 4, 
      postId: 'post2', 
      user: 'Alex Turner', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/42.jpg',
      text: 'Could you do a detailed tutorial on tip #3? That was really interesting!',
      date: '2023-07-08T11:30:00',
      likes: 7,
      isReplied: false
    },
    { 
      id: 5, 
      postId: 'post3', 
      user: 'Jessica Lee', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/women/52.jpg',
      text: 'I\'ve been a customer for years and completely agree with this testimonial. Your products are the best!',
      date: '2023-07-06T13:45:00',
      likes: 21,
      isReplied: true
    },
    { 
      id: 6, 
      postId: 'post4', 
      user: 'David Wilson', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/62.jpg',
      text: 'This feature is exactly what I\'ve been waiting for! Is there a way to get early access?',
      date: '2023-07-03T16:20:00',
      likes: 9,
      isReplied: false
    },
    { 
      id: 7, 
      postId: 'post1', 
      user: 'Olivia Brown', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/women/72.jpg',
      text: 'Just placed my order! So excited!',
      date: '2023-05-15T10:00:00',
      likes: 8,
      isReplied: true
    },
    { 
      id: 8, 
      postId: 'post2', 
      user: 'Daniel Green', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/82.jpg',
      text: 'Great tips! I shared this with my team.',
      date: '2023-04-20T11:30:00',
      likes: 15,
      isReplied: false
    },
    { 
      id: 9, 
      postId: 'post5', 
      user: 'Video Fan 1', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/92.jpg',
      text: 'Awesome trailer! Subscribed!',
      date: '2023-07-12T12:00:00',
      likes: 55,
      isReplied: true
    },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target)) {
        setShowDateFilter(false);
      }
    };

    if (showDateFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDateFilter]);

  const getAvailableYearsForComments = () => {
    const years = new Set();
    comments.forEach(comment => {
      const year = new Date(comment.date).getFullYear();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a);
  };
  const availableYears = getAvailableYearsForComments();

  const filteredComments = comments.filter(comment => {
    if (selectedPostFilter !== 'all' && comment.postId !== selectedPostFilter) {
      return false;
    }
    if (searchQuery && 
        !comment.text.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !comment.user.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    const commentDate = new Date(comment.date);
    if (dateFilterType === 'date' && selectedDate) {
      const selectedDateTime = new Date(selectedDate);
      return (
        commentDate.getFullYear() === selectedDateTime.getFullYear() &&
        commentDate.getMonth() === selectedDateTime.getMonth() &&
        commentDate.getDate() === selectedDateTime.getDate()
      );
    }
    if (dateFilterType === 'month' && selectedMonth && selectedYear) {
      const month = parseInt(selectedMonth);
      return (
        commentDate.getFullYear() === parseInt(selectedYear) &&
        commentDate.getMonth() === month
      );
    }
    if (dateFilterType === 'custom' && customDateFrom && customDateTo) {
      const fromDate = new Date(customDateFrom);
      const toDate = new Date(customDateTo);
      toDate.setHours(23, 59, 59, 999);
      return commentDate >= fromDate && commentDate <= toDate;
    }
    return true;
  });

  const handleReplyClick = (commentId) => {
    setReplyingToCommentId(commentId === replyingToCommentId ? null : commentId); // Toggle reply box
    setCurrentReplyText(''); // Clear previous reply text
  };

  const handleSendReply = () => {
    if (!currentReplyText.trim()) return;
    console.log(`Replying to comment ID: ${replyingToCommentId} with: "${currentReplyText}" from ViewComments page`);
    // Here you would typically send the reply to your backend
    // For now, let's just log it and clear the state
    alert(`Reply to comment ${replyingToCommentId} sent: "${currentReplyText}" (Check console)`);
    setReplyingToCommentId(null);
    setCurrentReplyText('');
  };


  const handleDateFilterChange = (type) => {
    setDateFilterType(type);
    if (type !== 'date') setSelectedDate('');
    if (type !== 'month') setSelectedMonth('');
    if (type !== 'custom') {
      setCustomDateFrom('');
      setCustomDateTo('');
    }
  };

  const clearDateFilters = () => {
    setDateFilterType('all');
    setSelectedDate('');
    setSelectedMonth('');
    setCustomDateFrom('');
    setCustomDateTo('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Comments</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedPostFilter}
              onChange={(e) => setSelectedPostFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"
            >
              <option value="all">All Posts</option>
              {posts.map(post => (
                <option key={post.id} value={post.id}>{post.title}</option>
              ))}
            </select>
            
            <div className="relative" ref={dateFilterRef}>
              <button 
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setShowDateFilter(!showDateFilter)}
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {dateFilterType === 'all' ? 'All Time' : 
                   dateFilterType === 'date' ? 'By Date' :
                   dateFilterType === 'month' ? 'By Month' : 'Custom Range'}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showDateFilter && (
                <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-20 min-w-[260px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Filter by Date</h3>
                      <button 
                        className="text-sm text-red-500 hover:text-red-700"
                        onClick={clearDateFilters}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" id="all-time-comments" name="date-filter-comments" checked={dateFilterType === 'all'} onChange={() => handleDateFilterChange('all')} className="text-theme-primary focus:ring-theme-primary"/>
                      <label htmlFor="all-time-comments">All Time</label>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" id="by-date-comments" name="date-filter-comments" checked={dateFilterType === 'date'} onChange={() => handleDateFilterChange('date')} className="text-theme-primary focus:ring-theme-primary"/>
                      <label htmlFor="by-date-comments">Specific Date</label>
                    </div>
                    {dateFilterType === 'date' && (
                      <div className="pl-6 mb-2">
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"/>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" id="by-month-comments" name="date-filter-comments" checked={dateFilterType === 'month'} onChange={() => handleDateFilterChange('month')} className="text-theme-primary focus:ring-theme-primary"/>
                      <label htmlFor="by-month-comments">By Month</label>
                    </div>
                    {dateFilterType === 'month' && (
                      <div className="pl-6 mb-2 space-y-2">
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700">
                          <option value="">Select Month</option>
                          {months.map((month, index) => (<option key={month} value={index}>{month}</option>))}
                        </select>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700">
                          {availableYears.map(year => (<option key={year} value={year}>{year}</option>))}
                        </select>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" id="custom-range-comments" name="date-filter-comments" checked={dateFilterType === 'custom'} onChange={() => handleDateFilterChange('custom')} className="text-theme-primary focus:ring-theme-primary"/>
                      <label htmlFor="custom-range-comments">Custom Range</label>
                    </div>
                    {dateFilterType === 'custom' && (
                      <div className="pl-6 space-y-2">
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">From</label>
                          <input type="date" value={customDateFrom} onChange={(e) => setCustomDateFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"/>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">To</label>
                          <input type="date" value={customDateTo} onChange={(e) => setCustomDateTo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"/>
                        </div>
                      </div>
                    )}
                    <button className="mt-2 bg-theme-primary hover:bg-opacity-90 text-white py-2 px-4 rounded-md" onClick={() => setShowDateFilter(false)}>Apply</button>
                  </div>
                </div>
              )}
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
          
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {(dateFilterType !== 'all' || selectedPostFilter !== 'all' || searchQuery) && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Active Filters:</span>
            {dateFilterType === 'date' && selectedDate && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                <span>Date: {new Date(selectedDate).toLocaleDateString()}</span>
                <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => { setDateFilterType('all'); setSelectedDate(''); }}>&times;</button>
              </div>
            )}
            {dateFilterType === 'month' && selectedMonth && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                <span>Month: {months[parseInt(selectedMonth)]} {selectedYear}</span>
                <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => { setDateFilterType('all'); setSelectedMonth(''); }}>&times;</button>
              </div>
            )}
            {dateFilterType === 'custom' && customDateFrom && customDateTo && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                <span>Range: {new Date(customDateFrom).toLocaleDateString()} - {new Date(customDateTo).toLocaleDateString()}</span>
                <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => { setDateFilterType('all'); setCustomDateFrom(''); setCustomDateTo(''); }}>&times;</button>
              </div>
            )}
            {selectedPostFilter !== 'all' && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                <span>Post: {posts.find(p => p.id === selectedPostFilter)?.title}</span>
                <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => setSelectedPostFilter('all')}>&times;</button>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                <span>Search: {searchQuery}</span>
                <button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => setSearchQuery('')}>&times;</button>
              </div>
            )}
            <button 
              className="text-xs text-theme-primary hover:underline"
              onClick={() => {
                clearDateFilters();
                setSelectedPostFilter('all');
                setSearchQuery('');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {selectedPostFilter !== 'all' && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-theme-primary" />
                <span className="font-medium">
                  {posts.find(post => post.id === selectedPostFilter)?.title || 'Selected Post'}
                </span>
                <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {posts.find(post => post.id === selectedPostFilter)?.platform || 'Platform'}
                </span>
                <span className="ml-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {posts.find(post => post.id === selectedPostFilter)?.date || 'Date'}
                </span>
              </div>
            </div>
          )}
          
          {filteredComments.length > 0 ? (
            filteredComments.map(comment => {
              const post = posts.find(post => post.id === comment.postId);
              return (
                <div key={comment.id}>
                  <CommentItem 
                    comment={comment}
                    postTitle={selectedPostFilter === 'all' ? post?.title : undefined}
                    platform={post?.platform}
                    onReplyClick={handleReplyClick}
                  />
                  {replyingToCommentId === comment.id && (
                    <div className="p-4 ml-14 bg-gray-50 dark:bg-gray-700/30 rounded-b-md">
                      <textarea
                        value={currentReplyText}
                        onChange={(e) => setCurrentReplyText(e.target.value)}
                        placeholder={`Replying to ${comment.user}...`}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700 text-sm"
                        rows="2"
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button 
                          onClick={() => setReplyingToCommentId(null)}
                          className="px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSendReply}
                          className="px-3 py-1 text-xs bg-theme-primary hover:bg-opacity-90 text-white rounded-md flex items-center gap-1"
                        >
                          <Send size={12} /> Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <h3 className="text-lg font-medium mb-1">No comments found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || dateFilterType !== 'all' ? 'Try adjusting your filters or search term' : 'There are no comments for the selected post'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-4">Comments Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 p-4 rounded-lg">
            <h3 className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">Total Comments</h3>
            <p className="text-2xl font-bold">{comments.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 p-4 rounded-lg">
            <h3 className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">Replied Comments</h3>
            <p className="text-2xl font-bold">{comments.filter(c => c.isReplied).length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 p-4 rounded-lg">
            <h3 className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">Awaiting Reply</h3>
            <p className="text-2xl font-bold">{comments.filter(c => !c.isReplied).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 p-4 rounded-lg">
            <h3 className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">Average Response Time</h3>
            <p className="text-2xl font-bold">4.2h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComments;
