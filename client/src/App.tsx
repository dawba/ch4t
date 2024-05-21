import MessageTile from './components/ChatTile'
import profilePicture from './assets/profile.jpg'

const App = () => {
    return (
        <MessageTile
            chatName="Miłosz Wielgus"
            lastMessage="elo kurwa"
            profilePicture={profilePicture}
            lastMessageSenderName="Tomasz Problem"
            lastMessageStatus='read'
        />
    )
}
export default App
