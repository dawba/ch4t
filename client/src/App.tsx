// Usage example
import React from 'react'
import SideMenu from './components/SideMenu'
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

    const handleNavigationClick = () => {
        console.log('Navigation button clicked!')
    }

    return (
        <div className="App">
            
           
            <SideMenu></SideMenu>
        </div>
    )
}

export default App
