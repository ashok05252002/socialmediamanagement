import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// ThemeProvider is no longer imported here, as it's provided in main.jsx
import { SidebarProvider } from './contexts/SidebarContext';
import { NavigationBlockerProvider } from './contexts/NavigationBlockerContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MyChannels from './pages/MyChannels';
import PostCreation from './pages/PostCreation';
import EngagePage from './pages/EngagePage'; 
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Profile from './pages/Profile';
import ViewPosts from './pages/ViewPosts'; 
import PostDetailsAndCommentsPage from './pages/PostDetailsAndCommentsPage';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';
import LandingPage from './pages/LandingPage';
import AddBusinessPage from './pages/AddBusinessPage';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const emailForVerification = localStorage.getItem('emailForVerification');
  
  return (
    // The ThemeProvider is removed from here. It now correctly wraps this component in main.jsx
    <SidebarProvider>
      <Router>
        <NavigationBlockerProvider>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/register" 
              element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/verify-email" 
              element={!isAuthenticated ? (emailForVerification ? <VerifyEmailPage /> : <Navigate to="/login" />) : <Navigate to="/" />} 
            />
            <Route 
              path="/forgot-password" 
              element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/reset-password" 
              element={!isAuthenticated ? <ResetPasswordPage /> : <Navigate to="/" />}
            />
            
            <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />} >
              <Route index element={<Dashboard />} />
              <Route path="channels" element={<MyChannels />} />
              <Route path="post-creation" element={<PostCreation />} />
              <Route path="engage" element={<EngagePage />} />
              <Route path="posts" element={<ViewPosts />} /> 
              <Route path="post/:postId/details-and-comments" element={<PostDetailsAndCommentsPage />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="support" element={<Support />} />
              <Route path="profile" element={<Profile />} />
              <Route path="add-business" element={<AddBusinessPage />} />
            </Route>
            
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </NavigationBlockerProvider>
      </Router>
    </SidebarProvider>
  );
}

export default App;
