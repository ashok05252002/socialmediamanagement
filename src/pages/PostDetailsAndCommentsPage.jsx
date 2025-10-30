import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Send, Calendar, ThumbsUp, Facebook, Instagram, Twitter, Linkedin, Youtube as YoutubeIcon } from 'lucide-react';
import CommentItem from '../components/CommentItem';

// Updated Mock Data with replies
const mockPostsData = [ 
    { 
      id: 'post1', 
      title: 'Summer Collection Launch', 
      content: 'Introducing our new summer collection! 🌞 Fresh styles, vibrant colors, and breathable fabrics perfect for the season. Shop now and get 20% off with code SUMMER23.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      platform: 'Instagram',
      date: '2023-07-10T14:00:00',
      metrics: { likes: 1243, comments: 78, shares: 32, views: 8456 },
    },
    { 
      id: 'post2', 
      title: 'Weekly Tips & Tricks', 
      content: 'This week\'s productivity tips: 1️⃣ Use the two-minute rule: If it takes less than 2 minutes, do it now 2️⃣ Try the Pomodoro technique 3️⃣ Plan tomorrow\'s tasks today',
      image: null,
      platform: 'Twitter',
      date: '2023-07-08T09:00:00',
      metrics: { likes: 538, comments: 42, shares: 127, views: 3254 },
    },
    { 
      id: 'post3', 
      title: 'Customer Testimonial Video', 
      content: 'Hear what our customers are saying about their experiences! We\'re grateful for the fantastic feedback and honored to be part of your journey.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      platform: 'Facebook',
      date: '2023-07-05T16:30:00',
      metrics: { likes: 865, comments: 108, shares: 64, views: 5812 },
    },
    { 
      id: 'post4', 
      title: 'Company Milestone', 
      content: 'We\'re thrilled to announce that we\'ve reached 100,000 customers worldwide! 🎉 Thank you for your continued support and trust in our products and services.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      platform: 'LinkedIn',
      date: '2023-07-03T11:15:00',
      metrics: { likes: 1432, comments: 215, shares: 178, views: 7689 },
    },
     { 
      id: 'post5', 
      title: 'New YouTube Channel Trailer', 
      content: 'Exciting news! We\'ve launched our official YouTube channel. Check out our trailer and subscribe for amazing content!',
      image: 'https://images.unsplash.com/photo-1543286386-71314a496c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      platform: 'YouTube',
      date: '2023-07-12T10:00:00',
      metrics: { likes: 2500, comments: 312, shares: 150, views: 15200 },
    },
];

const mockAllComments = [
    { 
      id: 1, 
      postId: 'post1', 
      user: 'Sarah Johnson', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/women/12.jpg',
      text: 'Love the new collection! Can\'t wait to get my hands on that blue dress.',
      date: '2023-07-10T14:23:00',
      likes: 12,
      isReplied: true,
      replies: [
        { id: 101, user: 'Shop Admin', userAvatar: 'https://ui-avatars.com/api/?name=Admin&background=random', text: 'Thanks Sarah! We\'re glad you love it. More styles coming soon!', date: '2023-07-10T14:30:00' },
        { id: 102, user: 'Another User', userAvatar: 'https://ui-avatars.com/api/?name=Another+User&background=random', text: 'I agree, the blue dress is stunning!', date: '2023-07-10T15:00:00' }
      ]
    },
    { 
      id: 2, 
      postId: 'post1', 
      user: 'Michael Chen', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/22.jpg',
      text: 'The colors are amazing this season! Will you be restocking the sold out items?',
      date: '2023-07-10T15:42:00',
      likes: 5,
      isReplied: false,
      replies: []
    },
    { 
      id: 3, 
      postId: 'post2', 
      user: 'Emily Rodriguez', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/women/32.jpg',
      text: 'These tips are super helpful! I\'ve been implementing them in my routine and seeing results already.',
      date: '2023-07-08T09:15:00',
      likes: 18,
      isReplied: true,
      replies: [
        { id: 103, user: 'Content Creator', userAvatar: 'https://ui-avatars.com/api/?name=Creator&background=random', text: 'Glad you found them useful, Emily!', date: '2023-07-08T10:00:00' }
      ]
    },
    { 
      id: 4, 
      postId: 'post5', 
      user: 'Video Fan 1', 
      userAvatar: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://randomuser.me/api/portraits/men/92.jpg',
      text: 'Awesome trailer! Subscribed!',
      date: '2023-07-12T12:00:00',
      likes: 55,
      isReplied: true,
      replies: []
    },
];

const platformIconMapPage = {
    Facebook: <Facebook className="w-5 h-5 text-blue-600" />,
    Instagram: <Instagram className="w-5 h-5 text-pink-600" />,
    Twitter: <Twitter className="w-5 h-5 text-blue-400" />,
    LinkedIn: <Linkedin className="w-5 h-5 text-blue-700" />,
    YouTube: <YoutubeIcon className="w-5 h-5 text-red-600" />,
};

const PostDetailsAndCommentsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [currentReplyText, setCurrentReplyText] = useState('');

  useEffect(() => {
    const foundPost = mockPostsData.find(p => p.id === postId);
    setPost(foundPost);
    if (foundPost) {
      const postComments = mockAllComments.filter(c => c.postId === postId);
      setComments(postComments);
    }
  }, [postId]);

  const handleReplyClick = (commentId) => {
    setReplyingToCommentId(commentId === replyingToCommentId ? null : commentId);
    setCurrentReplyText('');
  };

  const handleSendReply = () => {
    if (!currentReplyText.trim()) return;
    console.log(`Replying to comment ID: ${replyingToCommentId} for post ${postId} with: "${currentReplyText}"`);
    
    // Simulate adding reply to the specific comment's replies array
    const updatedComments = comments.map(comment => {
      if (comment.id === replyingToCommentId) {
        const newReply = {
          id: Date.now(), 
          user: 'Current User (Demo)',
          userAvatar: `https://ui-avatars.com/api/?name=Current+User&background=random`,
          text: currentReplyText,
          date: new Date().toISOString(),
        };
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
          isReplied: true // Mark parent comment as replied
        };
      }
      return comment;
    });
    setComments(updatedComments);
    
    // Also update the global mockAllComments if needed for consistency (optional for this demo)
    // const globalCommentIndex = mockAllComments.findIndex(c => c.id === replyingToCommentId);
    // if (globalCommentIndex !== -1) {
    //   mockAllComments[globalCommentIndex] = updatedComments.find(c => c.id === replyingToCommentId);
    // }

    alert(`Reply to comment ${replyingToCommentId} sent: "${currentReplyText}" (Check console)`);
    setReplyingToCommentId(null);
    setCurrentReplyText('');
  };

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-lg">Post not found or loading...</p>
        <Link to="/posts" className="mt-4 inline-flex items-center text-theme-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to View Content
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link to="/posts" className="inline-flex items-center text-sm text-theme-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to View Content
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 p-6">
        <div className="flex items-center mb-2">
            {platformIconMapPage[post.platform]}
            <span className="ml-2 font-medium text-gray-600 dark:text-gray-400">{post.platform}</span>
        </div>
        <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Posted on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full max-h-80 object-contain rounded-md mb-4 bg-gray-100 dark:bg-gray-700"
          />
        )}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 border-t pt-3 border-gray-200 dark:border-gray-700">
            <div className="flex items-center"><ThumbsUp size={16} className="mr-1"/> {post.metrics.likes.toLocaleString()} Likes</div>
            <div className="flex items-center"><MessageSquare size={16} className="mr-1"/> {comments.length} Comments</div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {comments.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map(comment => (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  platform={post.platform}
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
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No comments for this post yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailsAndCommentsPage;
