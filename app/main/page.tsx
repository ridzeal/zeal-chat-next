'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { brand } from '@/lib/brand';
import { Logo } from '@/components/Logo';

const mockChats = [
  { id: 1, name: 'Chat Room 1', lastMessage: 'Latest message here...', time: '2m ago' },
  { id: 2, name: 'Chat Room 2', lastMessage: 'Latest message here...', time: '5m ago' },
  { id: 3, name: 'Chat Room 3', lastMessage: 'Latest message here...', time: '1h ago' },
];

const mockMessages = [
  { id: 1, sender: 'John Doe', message: 'Hello there!', time: '2:30 PM' },
  { id: 2, sender: 'Me', message: 'Hi! How are you?', time: '2:31 PM' },
  { id: 3, sender: 'John Doe', message: 'I`m doing great, thanks!', time: '2:32 PM' },
];

export default function MainPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChatClick = (chatId: number) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally show an error message to the user
      alert('Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-x-hidden">
      {/* Chat List Sidebar */}
      <div
        className={clsx(
          "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800",
          "flex flex-col h-screen overflow-y-auto",
          isMobile ? (selectedChat ? "hidden" : "w-full") : "w-80",
        )}
      >
        {/* Sidebar Header with Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-[var(--primary)] hover:opacity-80 transition-opacity"
            >
              <Logo />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isLoggingOut ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              <span className="text-sm">Logout</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 
                       focus:ring-[var(--primary)] dark:text-gray-100"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className={clsx(
                "p-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer",
                "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                selectedChat === chat.id && "bg-gray-100 dark:bg-gray-800"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                  <span className="text-white">{chat.name[0]}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {chat.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {chat.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Room */}
      <div
        className={clsx(
          "flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 h-screen overflow-y-auto",
          isMobile && !selectedChat && "hidden"
        )}
      >
        {selectedChat ? (
          <>
            {/* Chat Room Header */}
            <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                {isMobile && (
                  <button
                    onClick={handleBackToList}
                    className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {mockChats.find(chat => chat.id === selectedChat)?.name}
                </h2>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-8rem)]">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    "max-w-[80%] p-3 rounded-lg",
                    message.sender === 'Me'
                      ? "ml-auto bg-[var(--primary)] text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  )}
                >
                  <p>{message.message}</p>
                  <span className="text-xs opacity-70">{message.time}</span>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 
                           focus:ring-[var(--primary)] dark:text-gray-100"
                />
                <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)]">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}