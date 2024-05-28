// Usage example
import React from 'react'
import GroupChatsList from './components/GroupChatsList'
import profilePicture from './assets/profile.jpg'

const App: React.FC = () => {
    // Sample chat data
    const chats = [
        {
            chatName: 'Chat Group 1',
            profilePicture: profilePicture,
            lastMessage: 'Hello, how are you?',
            lastMessageSenderName: 'Alice',
            lastMessageStatus: 'read',
        },
        {
            chatName: 'Chat Group 2',
            profilePicture: profilePicture,
            lastMessage: 'See you tomorrow!',
            lastMessageSenderName: 'Bob',
            lastMessageStatus: 'unread',
        },
        // Add more chat objects as needed
    ]

    return (
        <div className="App">
            <GroupChatsList chats={chats} />
        </div>
    )
}

export default App
