import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {
    SearchIcon,
    PlusIcon,
    PaperclipIcon,
    SmileIcon,
    SendIcon,
} from 'lucide-react'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { useEffect } from 'react';

// Connect to backend Socket io
const socket = io('http://localhost:4000');


function Messages() {
 
    const initialConversations = [
        {
            id: 'announcement',
            name: '📢 Announcement Group',
            child: 'All Parents & Staff',
            avatar: 'AG',
            unread: false,
            lastMessage: 'Welcome to the announcement channel.',
            time: 'Just now',
            messages: [
                {
                    id: 1,
                    sender: 'staff',
                    content: 'This is the official announcement channel.',
                    time: '9:00 AM',
                },
            ],
        },
        {
            id: 1,
            name: 'Sarah Johnson',
            child: 'Emma Johnson',
            avatar: 'SJ',
            unread: true,
            lastMessage: 'Will Emma be participating in the field trip next week?',
            time: '10m',
            messages: [
                {
                    id: 1,
                    sender: 'parent',
                    content: 'Good morning! I was wondering if Emma will need to bring anything...',
                    time: '9:32 AM',
                },
                {
                    id: 2,
                    sender: 'staff',
                    content: "Yes! We're doing a special t-shirt painting activity...",
                    time: '9:45 AM',
                },
                {
                    id: 3,
                    sender: 'parent',
                    content: "Great! I'll send one with her tomorrow...",
                    time: '10:02 AM',
                },
            ],
        },
    ]

    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState(initialConversations)
    const [activeConversation, setActiveConversation] = useState(initialConversations[0] || { messages: [] })
    const [searchTerm, setSearchTerm] = useState('')

    const messageEndRef = useRef(null);

    // Scroll to bottom on new messages
    // useEffect(() => {
    //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }, [activeConversation.messages])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })

        socket.on('receiveMessage', (data) => {
            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === data.conversationId
                        ? { ...conv, messages: [...conv.messages, data.message] }
                        : conv
                )
            );


            setActiveConversation((prev) => {
                if (prev.id === data.conversationId) {
                    return {
                        ...prev,
                        messages: [...prev.messages, data.message]
                    };
                }
                return prev;
            });
        });

        return () => {
            socket.off('receiveMessage')
        }

    }, []);

    if (!activeConversation) {
        return <div className="p-4">No conversation selected</div>
    }

    // Filtering messages
    const filteredConversations = conversations.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.child.toLowerCase().includes(searchTerm.toLowerCase())
    )


    // Handle send message
    const handleSend = () => {
        if (!messageInput.trim()) return;

        const newMessage = {
            id: uuidv4(),
            sender: 'staff',
            content: messageInput,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        // Emit to server
        socket.emit('sendMessage', {
            conversationId: activeConversation.id,
            message: newMessage,
        })

        setMessageInput('');
    }

    return (
        <div className="h-[calc(100vh-9rem)]">
            <div className="flex h-full overflow-hidden bg-white rounded-lg shadow">
                {/* Conversation list */}
                <div className="w-1/3 border-r border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Messages</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Communicate with parents and staff
                        </p>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Search messages..."
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-8rem)]">
                        <ul className="divide-y divide-gray-200">
                            {conversations.map((conversation) => (
                                <li
                                    key={conversation.id}
                                    onClick={() => setActiveConversation(conversation)}
                                    className={`hover:bg-gray-50 ${conversation.id === activeConversation.id ? 'bg-purple-50' : ''}`}
                                >
                                    <a href="#" className="block p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div
                                                    className={`h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center ${conversation.unread ? 'ring-2 ring-purple-500' : ''}`}
                                                >
                                                    <span className="font-medium text-sm text-purple-800">
                                                        {conversation.avatar}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p
                                                        className={`text-sm font-medium ${conversation.unread ? 'text-gray-900' : 'text-gray-700'}`}
                                                    >
                                                        {conversation.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {conversation.time}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">
                                                    Parent of {conversation.child}
                                                </p>
                                                <p
                                                    className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                                                >
                                                    {conversation.lastMessage}
                                                </p>
                                            </div>
                                            {conversation.unread && (
                                                <div className="flex-shrink-0">
                                                    <span className="inline-block h-2 w-2 rounded-full bg-purple-600"></span>
                                                </div>
                                            )}
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Active conversation */}
                <div className="flex-1 flex flex-col">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 relative">
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="font-medium text-sm text-purple-800">
                                        {activeConversation.avatar}
                                    </span>
                                </div>
                                {activeConversation.online && (
                                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
                                )}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                    {activeConversation.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Parent of {activeConversation.child}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            View Profile
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {activeConversation.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${message.sender === 'staff' ? 'bg-purple-100 text-purple-900' : 'bg-gray-100 text-gray-900'}`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs text-right mt-1 text-gray-500">
                                            {message.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="inline-flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500"
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500"
                            >
                                <PaperclipIcon className="h-5 w-5" />
                            </button>
                            <div className="flex-1 mx-2">
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    className="focus:ring-purple-500 focus:border-purple-500 block w-full border-gray-300 rounded-full"
                                    placeholder="Type a message..."
                                />
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center p-2 rounded-full text-gray-400 hover:text-gray-500"
                            >
                                <SmileIcon className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={handleSend}
                                className="inline-flex items-center p-2 rounded-full text-purple-600 hover:text-purple-700"
                            >
                                <SendIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;
