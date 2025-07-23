import React, { useEffect, useRef, useState } from 'react';
import {
    SearchIcon,
    PlusIcon,
    PaperclipIcon,
    SmileIcon,
    SendIcon,
} from 'lucide-react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Connect to backend Socket io
const socket = io('http://localhost:4000');

export const Messages = () => {
    const initialConversations = [
        {
            _id: 'announcement',
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
    ]

    const [role, setRole] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [conversations, setConversations] = useState(initialConversations)
    const [activeConversation, setActiveConversation] = useState(initialConversations[0])
    const [user, setUser] = useState('')

    const messageEndRef = useRef(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) {
            setRole(userInfo.role);
            setUser(userInfo);
        }

        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })

        socket.on('newGroupCreated', (group) => {
            group.id = group.id || group._id || uuidv4();
            setConversations((prev) => [group, ...prev]);
        });

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
            socket.off('receiveMessage');
            socket.off('newGroupCreated');
        };

    }, []);

    useEffect(() => {
        if (activeConversation?.id) {
            socket.emit('joinRoom', activeConversation.id);
        }
    }, [activeConversation])

    useEffect(() => {
        if (!activeConversation) return;

        axios.get(`http://localhost:4000/api/groups/${activeConversation.id}/messages`)
            .then(response => {
                setActiveConversation(prev => ({
                    ...prev,
                    messages: response.data.messages
                }));
                // Also update conversations list with latest message info if needed
            })
            .catch(err => console.error(err));
    }, [activeConversation?.id]);


    if (!activeConversation) {
        return <div className="p-4">No conversation selected</div>
    }

    // Handle send message
    const handleSend = () => {
        if (!messageInput.trim()) return;

        console.log("Message input: ", messageInput);


        const newMessage = {
            id: uuidv4(),
            // sender: user.fullname,
            sender: "staff",
            role: role,
            content: messageInput,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        console.log("Message to send: ", newMessage);
        console.log("Active Conv: ", activeConversation);


        // Emit to server
        socket.emit('sendMessage', {
            conversationId: activeConversation.id,
            message: newMessage,
            sender: "staff",
            // senderRole: role,
        })

        setMessageInput('');
    }

    // Function for creating a new group
    const handleCreateGroup = async () => {
        try {
            const groupName = prompt("Enter group name:");
            if (!groupName) return;

            console.log(groupName);

            const newGroup = {
                name: groupName,
                avatar: groupName.charAt(0).toUpperCase(),
                createdBy: user.fullname,
                time: 'Just now',
                members: [],
                messages: [],
            };

            const response = await axios.post('http://localhost:4000/api/groups', newGroup)

            const savedGroup = await response?.data;

            console.log("Saved group: ", savedGroup);


            // Ensure `id` is always present
            if (!savedGroup.id) savedGroup.id = savedGroup._id || uuidv4();

            setConversations(prev => [savedGroup, ...prev]);
            setActiveConversation(savedGroup);

            // Optionally emit to server
            socket.emit('joinRoom', savedGroup._id);
            socket.emit('createGroup', savedGroup);
        } catch (error) {
            console.log(error);
        }

    };

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
                    {/* Create Group Button */}
                    <div className="p-4 border-b border-gray-200">
                        {(user?.role === 'admin' || user?.role === 'staff') && (
                            <div className="p-4">
                                <button
                                    className="w-full px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                                    onClick={handleCreateGroup}
                                >
                                    + Create Group
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-8rem)]">
                        <ul className="divide-y divide-gray-200">
                            {conversations.map((conversation) => (
                                <li
                                    key={conversation.id || uuidv4()}
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
                                                    {/* {conversation.child} */}
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
                                        {/* <p className="text-sm">{message.sender}</p> */}
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
