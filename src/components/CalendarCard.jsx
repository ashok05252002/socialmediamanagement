import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalendarCard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const navigate = useNavigate();
  
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);
  const monthTriggerRef = useRef(null);
  const yearTriggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target) && monthTriggerRef.current && !monthTriggerRef.current.contains(event.target)) {
        setShowMonthDropdown(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target) && yearTriggerRef.current && !yearTriggerRef.current.contains(event.target)) {
        setShowYearDropdown(false);
      }
    };

    if (showMonthDropdown || showYearDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMonthDropdown, showYearDropdown]);
  
  const scheduledPosts = {
    [new Date().toISOString().split('T')[0]]: [
      { id: 1, title: 'Summer Sale Announcement', time: '15:00', platform: 'Facebook' },
      { id: 2, title: 'Product Launch Teaser', time: '17:30', platform: 'Instagram' }
    ],
    [new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]]: [
      { id: 3, title: 'Customer Testimonial', time: '10:00', platform: 'LinkedIn' }
    ],
    [new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().split('T')[0]]: [
      { id: 4, title: 'Weekly Tips & Tricks', time: '14:30', platform: 'Twitter' }
    ]
  };
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getMonthName = (month) => {
    return months[month];
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleDateClick = (day) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
  };
  
  const handleMonthChange = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthDropdown(false);
  };
  
  const handleYearChange = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearDropdown(false);
  };

  const handleSchedulePost = () => {
    navigate('/scheduler');
  };
  
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const hasEvents = scheduledPosts[dateString] && scheduledPosts[dateString].length > 0;
      
      days.push(
        <div 
          key={day} 
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer relative
            ${isToday ? 'font-bold text-theme-primary' : ''}
            ${isSelected ? 'bg-theme-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
          `}
          onClick={() => handleDateClick(day)}
        >
          {day}
          {hasEvents && !isSelected && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-theme-primary rounded-full"></span>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const getSelectedDatePosts = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    return scheduledPosts[dateString] || [];
  };
  
  const selectedDatePosts = getSelectedDatePosts();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium mb-4">Upcoming Schedule</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2 relative">
              <div className="relative">
                <button 
                  ref={monthTriggerRef}
                  onClick={() => {
                    setShowMonthDropdown(!showMonthDropdown);
                    setShowYearDropdown(false);
                  }}
                  className="flex items-center font-medium hover:text-theme-primary"
                >
                  {getMonthName(currentDate.getMonth())}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {showMonthDropdown && (
                  <div ref={monthDropdownRef} className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {months.map((month, index) => (
                      <button
                        key={month}
                        onClick={() => handleMonthChange(index)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          index === currentDate.getMonth() ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  ref={yearTriggerRef}
                  onClick={() => {
                    setShowYearDropdown(!showYearDropdown);
                    setShowMonthDropdown(false);
                  }}
                  className="flex items-center font-medium hover:text-theme-primary"
                >
                  {currentDate.getFullYear()}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {showYearDropdown && (
                  <div ref={yearDropdownRef} className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearChange(year)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          year === currentDate.getFullYear() ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="h-8 w-8 flex items-center justify-center text-sm text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
        
        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-5 h-5 mr-2 text-theme-primary" />
            <h4 className="font-medium">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h4>
          </div>
          
          {selectedDatePosts.length > 0 ? (
            <div className="space-y-3">
              {selectedDatePosts.map(post => (
                <div key={post.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{post.title}</h5>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.platform === 'Facebook' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      post.platform === 'Instagram' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' :
                      post.platform === 'Twitter' ? 'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                    }`}>
                      {post.platform}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No posts scheduled for this day</p>
              <button 
                onClick={handleSchedulePost}
                className="mt-3 text-theme-primary hover:underline text-sm font-medium"
              >
                + Schedule a post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;
