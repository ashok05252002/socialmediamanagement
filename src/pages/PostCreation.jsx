import React, { useState, useEffect, useRef, useCallback } from 'react';
// Removed useNavigate from 'react-router-dom' as custom context handles it.
import { Link as LinkIconLucide, Smile, Calendar, Clock, Globe, Facebook, Instagram, Twitter, Linkedin, Youtube, Save, Send, X, Check, Trash2, Video as VideoIcon, AlertTriangle, FileUp, Type as TypeIcon, ChevronDown, Briefcase, Loader2 } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import VideoUploadModal from '../components/VideoUploadModal';
import MediaUploadModal from '../components/MediaUploadModal';
import { useTheme, themeOptions } from '../contexts/ThemeContext';
import { useNotification } from '../contexts/NotificationContext';
import Tooltip from '../components/Tooltip';
import { useNavigationBlocker } from '../contexts/NavigationBlockerContext'; 

import FacebookPreview from '../components/postPreview/FacebookPreview';
import InstagramPreview from '../components/postPreview/InstagramPreview';
import TwitterPreview from '../components/postPreview/TwitterPreview';
import LinkedInPreview from '../components/postPreview/LinkedInPreview';
import YouTubePreview from '../components/postPreview/YouTubePreview';

const mockBusinesses = [
  { id: 'biz1', name: 'TechCorp Solutions' },
  { id: 'biz2', name: 'Innovate Hub' },
  { id: 'biz3', 'name': 'GreenLeaf Organics' }
];

const initialFormState = {
  selectedBusinessId: mockBusinesses[0]?.id || '',
  postContent: '',
  youtubeTitle: '',
  selectedPlatforms: {
    facebook: true,
    instagram: true,
    twitter: false,
    linkedin: false,
    youtube: false
  },
  selectedMediaFile: null,
  selectedMediaPreviewUrl: null,
  selectedMediaType: null,
  selectedVideoFile: null,
  selectedVideoPreviewUrl: null,
  scheduleDate: '',
  scheduleTime: '',
};


const PostCreation = () => {
  const [selectedBusinessId, setSelectedBusinessId] = useState(initialFormState.selectedBusinessId);
  const [postContent, setPostContent] = useState(initialFormState.postContent);
  const [youtubeTitle, setYoutubeTitle] = useState(initialFormState.youtubeTitle);
  const [selectedPlatforms, setSelectedPlatforms] = useState({...initialFormState.selectedPlatforms});

  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);
  const [selectedMediaFile, setSelectedMediaFile] = useState(initialFormState.selectedMediaFile);
  const [selectedMediaPreviewUrl, setSelectedMediaPreviewUrl] = useState(initialFormState.selectedMediaPreviewUrl);
  const [selectedMediaType, setSelectedMediaType] = useState(initialFormState.selectedMediaType); 

  const [showVideoUploadModal, setShowVideoUploadModal] = useState(false);
  const [selectedVideoFile, setSelectedVideoFile] = useState(initialFormState.selectedVideoFile);
  const [selectedVideoPreviewUrl, setSelectedVideoPreviewUrl] = useState(initialFormState.selectedVideoPreviewUrl);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPostPreviewModal, setShowPostPreviewModal] = useState(false);
  
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [scheduleDate, setScheduleDate] = useState(initialFormState.scheduleDate);
  const [scheduleTime, setScheduleTime] = useState(initialFormState.scheduleTime);

  const [showDiscardConfirmModal, setShowDiscardConfirmModal] = useState(false);
  const [showSaveDraftConfirmModal, setShowSaveDraftConfirmModal] = useState(false);

  const [showPlatformWarning, setShowPlatformWarning] = useState(false);
  const [platformWarningMessage, setPlatformWarningMessage] = useState('');

  const [activePreviewPlatform, setActivePreviewPlatform] = useState('facebook');
  
  const { isDarkMode, themeColors } = useTheme(); 
  const { addNotification } = useNotification();
  const { blockNavigation, unblockNavigation } = useNavigationBlocker(); 

  const [isLoadingPublish, setIsLoadingPublish] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);

  const [isFormDirty, setIsFormDirty] = useState(false);
  
  const getCurrentFormState = useCallback(() => ({
    selectedBusinessId, postContent, youtubeTitle, selectedPlatforms,
    selectedMediaFile, selectedMediaPreviewUrl, selectedMediaType,
    selectedVideoFile, selectedVideoPreviewUrl, scheduleDate, scheduleTime,
  }), [selectedBusinessId, postContent, youtubeTitle, selectedPlatforms,
      selectedMediaFile, selectedMediaPreviewUrl, selectedMediaType,
      selectedVideoFile, selectedVideoPreviewUrl, scheduleDate, scheduleTime]);

  useEffect(() => {
    const currentForm = getCurrentFormState();
    const platformsChanged = JSON.stringify(currentForm.selectedPlatforms) !== JSON.stringify(initialFormState.selectedPlatforms);
    
    const dirty = currentForm.selectedBusinessId !== initialFormState.selectedBusinessId ||
                  currentForm.postContent !== initialFormState.postContent ||
                  currentForm.youtubeTitle !== initialFormState.youtubeTitle ||
                  platformsChanged ||
                  currentForm.selectedMediaFile !== initialFormState.selectedMediaFile ||
                  currentForm.selectedVideoFile !== initialFormState.selectedVideoFile ||
                  currentForm.scheduleDate !== initialFormState.scheduleDate ||
                  currentForm.scheduleTime !== initialFormState.scheduleTime;
    setIsFormDirty(dirty);
  }, [getCurrentFormState]);

  const resetPostState = useCallback(() => {
    setSelectedBusinessId(initialFormState.selectedBusinessId);
    setPostContent(initialFormState.postContent); 
    setYoutubeTitle(initialFormState.youtubeTitle); 
    setSelectedPlatforms({...initialFormState.selectedPlatforms});
    setSelectedMediaFile(initialFormState.selectedMediaFile); 
    setSelectedMediaPreviewUrl(initialFormState.selectedMediaPreviewUrl); 
    setSelectedMediaType(initialFormState.selectedMediaType);
    setSelectedVideoFile(initialFormState.selectedVideoFile); 
    setSelectedVideoPreviewUrl(initialFormState.selectedVideoPreviewUrl);
    setActivePreviewPlatform('facebook'); 
    setScheduleDate(initialFormState.scheduleDate); 
    setScheduleTime(initialFormState.scheduleTime); 
    setShowPlatformWarning(false);
    setIsFormDirty(false); // Important: Mark form as not dirty
    return true; // Indicate success for blocker context
  }, []);


  const handleSaveDraft = useCallback(async () => { 
    setIsLoadingDraft(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    console.log('Saving draft:', { selectedBusinessId, postContent, youtubeTitle, selectedMediaFile, selectedVideoFile, selectedPlatforms }); 
    addNotification({ type: 'info', title: 'Draft Saved!', message: 'Your post has been successfully saved as a draft.' });
    setShowSaveDraftConfirmModal(false); 
    setIsFormDirty(false); // Mark as not dirty after saving
    setIsLoadingDraft(false);
    return true; // Indicate success for blocker
  }, [selectedBusinessId, postContent, youtubeTitle, selectedMediaFile, selectedVideoFile, selectedPlatforms, addNotification]);
  
  useEffect(() => {
    if (isFormDirty) {
      blockNavigation({
        onDiscard: async () => { 
            resetPostState(); 
            return true; 
        }, 
        onSaveDraft: async () => {
          const success = await handleSaveDraft();
          return success; 
        }, 
        onCancel: () => {
          console.log("Navigation cancelled by user from PostCreation page.");
          return false; 
        }
      });
    } else {
      unblockNavigation();
    }
    return () => {
      unblockNavigation(); 
    };
  }, [isFormDirty, blockNavigation, unblockNavigation, resetPostState, handleSaveDraft]); 


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);


  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: <Facebook className="w-5 h-5" />, color: themeOptions.colors.blue.primary || '#2563eb', PreviewComponent: FacebookPreview },
    { id: 'instagram', name: 'Instagram', icon: <Instagram className="w-5 h-5" />, color: themeOptions.colors.pink.primary || '#db2777', PreviewComponent: InstagramPreview },
    { id: 'twitter', name: 'Twitter', icon: <Twitter className="w-5 h-5" />, color: '#60a5fa', PreviewComponent: TwitterPreview },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: themeOptions.colors.blue.dark || '#1d4ed8', PreviewComponent: LinkedInPreview },
    { id: 'youtube', name: 'YouTube', icon: <Youtube className="w-5 h-5" />, color: '#ff0000', PreviewComponent: YouTubePreview }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
    const firstSelectedPlatform = platforms.find(p => selectedPlatforms[p.id]);
    if (firstSelectedPlatform) {
      if (!activePreviewPlatform || !selectedPlatforms[activePreviewPlatform]) {
        setActivePreviewPlatform(firstSelectedPlatform.id);
      }
    } else {
      if (platforms.length > 0) {
        const defaultPlatformId = platforms[0].id;
        setSelectedPlatforms(prev => ({ ...prev, [defaultPlatformId]: true }));
      } else {
        setActivePreviewPlatform(null);
      }
    }
  }, [selectedPlatforms, platforms]); 
  
  useEffect(() => {
    let timer;
    if (showPlatformWarning) {
      timer = setTimeout(() => {
        setShowPlatformWarning(false);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [showPlatformWarning]);
  
  const emojis = ['😀', '😂', '😍', '🥰', '😎', '🙌', '👍', '🎉', '🔥', '❤️', '💯', '✨', '🌟', '💪', '🤔', '👏', 
                  '😊', '🥳', '😇', '🤩', '😋', '🙂', '😄', '😃', '😁', '😆', '😅', '🤣', '😭', '😘', '🤗', '😉'];
  
  const isOnlyYouTubeSelected = selectedPlatforms.youtube && !selectedPlatforms.facebook && !selectedPlatforms.instagram && !selectedPlatforms.twitter && !selectedPlatforms.linkedin;
  const isAnyNonYouTubeSelected = selectedPlatforms.facebook || selectedPlatforms.instagram || selectedPlatforms.twitter || selectedPlatforms.linkedin;

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => {
      let newSelection = { ...prev };
      let warning = '';
      const isCurrentlySelected = prev[platformId];
      const currentlyOnlyYouTube = prev.youtube && !prev.facebook && !prev.instagram && !prev.twitter && !prev.linkedin;

      if (platformId === 'youtube') {
        if (!isCurrentlySelected) { 
          newSelection = { youtube: true, facebook: false, instagram: false, twitter: false, linkedin: false };
          setSelectedMediaFile(null); setSelectedMediaPreviewUrl(null); setSelectedMediaType(null);
          warning = 'YouTube selected. Other platforms deselected. Only video uploads are supported for YouTube.';
        } else { 
          newSelection.youtube = false; setYoutubeTitle('');
          const anyOtherSelected = Object.keys(newSelection).some(key => key !== 'youtube' && newSelection[key]);
          if (!anyOtherSelected && platforms.length > 0) { newSelection[platforms[0].id] = true; } 
          setSelectedVideoFile(null); setSelectedVideoPreviewUrl(null);
        }
      } else { 
        newSelection[platformId] = !isCurrentlySelected;
        if (newSelection[platformId] && currentlyOnlyYouTube) { 
          newSelection.youtube = false; setSelectedVideoFile(null); setSelectedVideoPreviewUrl(null); setYoutubeTitle('');
          warning = `${platforms.find(p => p.id === platformId).name} selected. YouTube deselected.`;
        } else if (!newSelection[platformId] && prev.youtube) { 
          const otherSelectedCount = Object.values(newSelection).filter(v => v).length - (newSelection.youtube ? 1 : 0);
          if (newSelection.youtube && otherSelectedCount === 0) { 
             setSelectedMediaFile(null); setSelectedMediaPreviewUrl(null); setSelectedMediaType(null);
             warning = `Only YouTube selected. General media cleared.`;
          }
        }
      }
      
      const isAnyPlatformSelected = Object.values(newSelection).some(isSelected => isSelected);
      if (!isAnyPlatformSelected && platforms.length > 0) {
        newSelection[platforms[0].id] = true; 
        setSelectedVideoFile(null); setSelectedVideoPreviewUrl(null); setYoutubeTitle('');
        warning = 'At least one platform must be selected. Defaulting.';
      }

      if (warning) { setPlatformWarningMessage(warning); setShowPlatformWarning(true); } 
      return newSelection;
    });
  };

  useEffect(() => {
    if (!isOnlyYouTubeSelected && youtubeTitle) {
      setYoutubeTitle('');
    }
  }, [selectedPlatforms, isOnlyYouTubeSelected, youtubeTitle]);

  const handleAddEmoji = (emoji) => { setPostContent(prev => prev + emoji); };
  const handleAddLink = () => {
    if (linkUrl) {
      const linkText = linkTitle ? `[${linkTitle}](${linkUrl})` : linkUrl;
      setPostContent(prev => (prev ? prev + ' ' : '') + linkText + ' ');
      setLinkUrl(''); setLinkTitle(''); setShowLinkModal(false);
    }
  };
  const handleMediaUpload = (file, previewUrl) => {
    setSelectedMediaFile(file); setSelectedMediaPreviewUrl(previewUrl);
    if (file.type.startsWith('image/gif')) setSelectedMediaType('gif');
    else if (file.type.startsWith('image/')) setSelectedMediaType('image');
    else if (file.type.startsWith('video/')) setSelectedMediaType('video');
    else setSelectedMediaType('other');
    setShowMediaUploadModal(false);
  };
  const handleYouTubeVideoUpload = (videoFile, videoPreviewUrl) => {
    setSelectedVideoFile(videoFile); setSelectedVideoPreviewUrl(videoPreviewUrl); setShowVideoUploadModal(false);
  };
  
  const handleDiscard = () => { 
    resetPostState(); 
    setShowDiscardConfirmModal(false); 
  };
  
  const handleSchedulePost = async () => {
    if (!scheduleDate || !scheduleTime) {
      addNotification({ type: 'error', title: 'Scheduling Error', message: 'Please select both date and time for scheduling.' });
      return;
    }
    setIsLoadingSchedule(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Post scheduled for:', scheduleDate, scheduleTime, { selectedBusinessId, postContent, youtubeTitle, selectedMediaFile, selectedVideoFile, selectedPlatforms });
    addNotification({ type: 'success', title: 'Post Scheduled!', message: `Your post is scheduled for ${scheduleDate} at ${scheduleTime}.` });
    setShowScheduleModal(false); 
    resetPostState();
    setIsLoadingSchedule(false);
  };
  
  const handlePublishNow = async () => {
    setIsLoadingPublish(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Post published now:', { selectedBusinessId, postContent, youtubeTitle, selectedMediaFile, selectedVideoFile, selectedPlatforms });
    addNotification({ type: 'success', title: 'Post Published!', message: 'Your post has been published successfully.' });
    setShowPostPreviewModal(false); 
    resetPostState();
    setIsLoadingPublish(false);
  };

  const getSelectedPlatformsList = () => platforms.filter(platform => selectedPlatforms[platform.id]).map(platform => platform.name).join(', ');
  
  const ActivePreviewComponent = platforms.find(p => p.id === activePreviewPlatform)?.PreviewComponent;
  const mockUserName = "Your Page Name"; 
  const mockProfilePicUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(mockUserName.substring(0,2))}&background=random&color=fff&size=40`;
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-3 sm:mb-0">Create</h1>
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            <button onClick={() => setShowDiscardConfirmModal(true)} className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-red-500 dark:text-red-400"><Trash2 className="w-4 h-4" /><span>Discard</span></button>
            <button onClick={() => setShowSaveDraftConfirmModal(true)} disabled={isLoadingDraft} className="flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-70">
              {isLoadingDraft ? <><Loader2 className="w-4 h-4 animate-spin mr-1" />Saving...</> : <><Save className="w-4 h-4" /><span>Save Draft</span></>}
            </button>
            <button onClick={() => setShowScheduleModal(true)} disabled={isLoadingSchedule} className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-theme-secondary hover:bg-opacity-90 text-white rounded-md disabled:opacity-70">
              {isLoadingSchedule ? <><Loader2 className="w-4 h-4 animate-spin mr-1" />Scheduling...</> : <><Calendar className="w-4 h-4" /><span>Schedule</span></>}
            </button>
            <button onClick={() => setShowPostPreviewModal(true)} disabled={isLoadingPublish} className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-theme-primary hover:bg-opacity-90 text-white rounded-md disabled:opacity-70">
              {isLoadingPublish ? <><Loader2 className="w-4 h-4 animate-spin mr-1" />Publishing...</> : <><Send className="w-4 h-4" /><span>Publish Now</span></>}
            </button>
        </div>
      </div>
      
      {showPlatformWarning && (
        <div className="my-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600 rounded-md flex justify-between items-center shadow">
          <div className="flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /><p className="text-sm">{platformWarningMessage}</p></div>
          <button onClick={() => setShowPlatformWarning(false)} className="ml-2 text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-500"><X size={18} /></button>
        </div>
      )}

      {/* Business and Platform Selection Row */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <label htmlFor="businessSelect" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5">
            Select Business
          </label>
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              id="businessSelect"
              value={selectedBusinessId}
              onChange={(e) => setSelectedBusinessId(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700 text-sm"
            >
              {mockBusinesses.map(biz => (
                <option key={biz.id} value={biz.id}>{biz.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full sm:w-auto">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-0.5 text-left sm:text-right">
                Select Platforms
            </label>
            <div className="flex flex-wrap justify-start sm:justify-end gap-2">
            {platforms.map((platform) => (
                <Tooltip key={platform.id} text={platform.name} position="top">
                <button
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-800 flex items-center justify-center
                                ${selectedPlatforms[platform.id] ? 'shadow-inner scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'}
                                ${isDarkMode 
                                ? (selectedPlatforms[platform.id] ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700') 
                                : (selectedPlatforms[platform.id] ? 'bg-gray-200' : 'bg-white hover:bg-gray-100')}`}
                    style={{ borderColor: selectedPlatforms[platform.id] ? platform.color : (isDarkMode ? 'transparent' : '#e0e0e0')}}
                >
                    <div style={{ color: selectedPlatforms[platform.id] ? platform.color : (isDarkMode ? themeColors.current.text : '#6b7280') }}>
                    {React.cloneElement(platform.icon, { size: 20 })}
                    </div>
                </button>
                </Tooltip>
            ))}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {isOnlyYouTubeSelected && (
            <div className="mb-4">
              <label htmlFor="youtubeTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title (for YouTube) <span className="text-red-500">*</span></label>
              <div className="relative"><TypeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /><input type="text" id="youtubeTitle" value={youtubeTitle} onChange={(e) => setYoutubeTitle(e.target.value)} placeholder="Enter YouTube video title" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700" required={isOnlyYouTubeSelected}/></div>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{isOnlyYouTubeSelected ? 'Description (for YouTube)' : 'Post Content'}</label>
            <textarea id="postContent" className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary min-h-[150px] dark:bg-gray-700" placeholder={isOnlyYouTubeSelected ? "Describe your video..." : "What would you like to share today?"} value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
          </div>
          
          {selectedMediaPreviewUrl && isAnyNonYouTubeSelected && (
            <div className="mb-4 relative">
              {selectedMediaType === 'image' && <img src={selectedMediaPreviewUrl} alt="Uploaded media preview" className="w-full h-48 object-cover rounded-lg" />}
              {selectedMediaType === 'video' && <video controls src={selectedMediaPreviewUrl} className="w-full h-48 object-cover rounded-lg bg-black">Your browser does not support video.</video>}
              {selectedMediaType === 'gif' && <img src={selectedMediaPreviewUrl} alt="Uploaded GIF preview" className="w-full h-48 object-cover rounded-lg" />}
              <button onClick={() => { setSelectedMediaFile(null); setSelectedMediaPreviewUrl(null); setSelectedMediaType(null); }} className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-90"><X className="w-4 h-4" /></button>
              {selectedMediaFile && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selectedMediaFile.name}</p>}
            </div>
          )}
          {selectedVideoPreviewUrl && isOnlyYouTubeSelected && (
            <div className="mb-4 relative">
              <video controls src={selectedVideoPreviewUrl} className="w-full h-48 object-cover rounded-lg bg-black">Your browser does not support the video tag.</video>
              <button onClick={() => { setSelectedVideoFile(null); setSelectedVideoPreviewUrl(null); }} className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white p-1 rounded-full hover:bg-opacity-90"><X className="w-4 h-4" /></button>
              {selectedVideoFile && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selectedVideoFile.name}</p>}
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            {isAnyNonYouTubeSelected && (<button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setShowMediaUploadModal(true)}><FileUp className="w-5 h-5 text-gray-500" /><span>Add Media</span></button>)}
            {isOnlyYouTubeSelected && (<button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setShowVideoUploadModal(true)}><VideoIcon className="w-5 h-5 text-gray-500" /><span>Add Video (for YouTube)</span></button>)}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setShowLinkModal(true)}><LinkIconLucide className="w-5 h-5 text-gray-500" /><span>Add Link</span></button>
            <div className="relative" ref={emojiPickerRef}>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setShowEmojiPicker(!showEmojiPicker)}><Smile className="w-5 h-5 text-gray-500" /><span>Add Emoji</span></button>
              {showEmojiPicker && (<div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 border border-gray-200 dark:border-gray-700 w-64"><div className="grid grid-cols-8 gap-2">{emojis.map((emoji, index) => (<button key={index} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xl" onClick={() => handleAddEmoji(emoji)}>{emoji}</button>))}</div></div>)}
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Post Preview</h3>
          <div className="mb-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Previewing for: <span className="font-semibold">{activePreviewPlatform ? platforms.find(p => p.id === activePreviewPlatform)?.name : 'Select a platform'}</span>
            </p>
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
              {platforms.filter(p => selectedPlatforms[p.id]).map(platform => (
                <Tooltip key={platform.id} text={`Preview for ${platform.name}`} position="top">
                  <button
                    onClick={() => setActivePreviewPlatform(platform.id)}
                    className={`p-1.5 rounded-md border-2 transition-all duration-150 ease-in-out 
                                ${activePreviewPlatform === platform.id ? 'shadow-inner scale-105' : 'hover:opacity-80 hover:scale-105'}
                                ${isDarkMode 
                                  ? (activePreviewPlatform === platform.id ? 'bg-gray-600' : 'bg-gray-700')
                                  : (activePreviewPlatform === platform.id ? 'bg-gray-200' : 'bg-gray-100')
                                }`}
                    style={{ borderColor: activePreviewPlatform === platform.id ? platform.color : 'transparent' }}
                  >
                    <div style={{ color: platform.color }}>{React.cloneElement(platform.icon, { size: 18 })}</div>
                  </button>
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-0.5 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar">
            {ActivePreviewComponent ? (
              <ActivePreviewComponent 
                key={activePreviewPlatform} 
                userName={mockUserName}
                profilePicUrl={mockProfilePicUrl}
                postContent={postContent}
                mediaUrl={isOnlyYouTubeSelected ? selectedVideoPreviewUrl : selectedMediaPreviewUrl}
                mediaType={isOnlyYouTubeSelected ? 'video' : selectedMediaType}
                youtubeTitle={youtubeTitle}
              />
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic p-4">
                {selectedPlatforms && Object.values(selectedPlatforms).some(v => v) ? 'Loading preview...' : 'Select a platform to see its specific preview.'}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <MediaUploadModal isOpen={showMediaUploadModal} onClose={() => setShowMediaUploadModal(false)} onMediaUpload={handleMediaUpload} acceptTypes="image/*, video/*, image/gif"/>
      <VideoUploadModal isOpen={showVideoUploadModal} onClose={() => setShowVideoUploadModal(false)} onVideoUpload={handleYouTubeVideoUpload} />
      {showLinkModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"><div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"><h3 className="text-lg font-medium">Add Link</h3><button onClick={() => setShowLinkModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X className="w-5 h-5" /></button></div><div className="p-5"><div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL</label><input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"/></div><div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link Title (Optional)</label><input type="text" value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} placeholder="Enter a title for your link" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"/></div><div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowLinkModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button><button onClick={handleAddLink} disabled={!linkUrl} className="px-4 py-2 bg-theme-primary hover:bg-opacity-90 text-white rounded-md disabled:opacity-50">Add Link</button></div></div></div></div>)}
      {showScheduleModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"><div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"><h3 className="text-lg font-medium">Schedule Your Post</h3><button onClick={() => setShowScheduleModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X className="w-5 h-5" /></button></div><div className="p-5"><div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Date</label><input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700" min={new Date().toISOString().split('T')[0]}/></div><div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Time</label><input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary dark:bg-gray-700"/></div><div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platforms</label><div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md"><p className="text-sm">{getSelectedPlatformsList() || 'No platforms selected'}</p></div></div><div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowScheduleModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button><button onClick={handleSchedulePost} disabled={isLoadingSchedule || !scheduleDate || !scheduleTime || (isOnlyYouTubeSelected && !youtubeTitle.trim())} className="px-4 py-2 bg-theme-primary hover:bg-opacity-90 text-white rounded-md disabled:opacity-50 flex items-center justify-center">{isLoadingSchedule ? <><Loader2 className="w-4 h-4 animate-spin mr-1" />Scheduling...</> : 'Schedule Post'}</button></div></div></div></div>)}
      {showPostPreviewModal && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg"><div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"><h3 className="text-lg font-medium">Post Preview</h3><button onClick={() => setShowPostPreviewModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X className="w-5 h-5" /></button></div><div className="p-5"><div className="mb-6"><h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your post will appear like this:</h4><div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-900">{isOnlyYouTubeSelected && youtubeTitle && <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{youtubeTitle}</h4>}<p className="text-gray-800 dark:text-gray-200 mb-3 break-words">{postContent}</p>{selectedMediaPreviewUrl && isAnyNonYouTubeSelected && (selectedMediaType === 'image' ? <img src={selectedMediaPreviewUrl} alt="Preview" className="w-full max-h-60 object-contain rounded-md mb-2 bg-gray-100 dark:bg-gray-700"/> : selectedMediaType === 'video' ? <video controls src={selectedMediaPreviewUrl} className="w-full max-h-60 rounded-md bg-black">Your browser does not support video.</video> : selectedMediaType === 'gif' ? <img src={selectedMediaPreviewUrl} alt="GIF Preview" className="w-full max-h-60 object-contain rounded-md mb-2 bg-gray-100 dark:bg-gray-700"/> : null )}{selectedVideoPreviewUrl && isOnlyYouTubeSelected && (<video controls src={selectedVideoPreviewUrl} className="w-full max-h-60 rounded-md bg-black">Your browser does not support the video tag.</video>)}</div></div><div className="mb-4"><h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Will be posted to:</h4><div className="flex flex-wrap gap-2">{platforms.map((platform) => (selectedPlatforms[platform.id] && (<div key={platform.id} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: `${platform.color}20`, color: platform.color }}>{React.cloneElement(platform.icon, {size: 14})}<span>{platform.name}</span></div>)))}</div></div><div className="flex justify-end gap-3 mt-6"><button onClick={() => setShowPostPreviewModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button><button onClick={handlePublishNow} disabled={isLoadingPublish || (isOnlyYouTubeSelected && !youtubeTitle.trim())} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center gap-1 disabled:opacity-50">{isLoadingPublish ? <><Loader2 className="w-4 h-4 animate-spin mr-1" />Publishing...</> : <><Check className="w-4 h-4" />Publish Now</>}</button></div></div></div></div>)}
      <ConfirmationModal isOpen={showDiscardConfirmModal} onClose={() => setShowDiscardConfirmModal(false)} onConfirm={handleDiscard} title="Discard Post" message="Are you sure you want to discard this post? All content and selections will be lost." confirmText="Discard"/>
      <ConfirmationModal isOpen={showSaveDraftConfirmModal} onClose={() => setShowSaveDraftConfirmModal(false)} onConfirm={handleSaveDraft} title="Save as Draft" message="Are you sure you want to save this post as a draft?" confirmText={isLoadingDraft ? 'Saving...' : 'Save Draft'} confirmButtonClass="bg-theme-secondary hover:bg-opacity-90 text-white" isDestructive={false} icon={<Save className="h-6 w-6 text-theme-secondary" />} disabled={isLoadingDraft}/>
    </div>
  );
};

export default PostCreation;
