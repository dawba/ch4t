import { useState } from 'react'
import ChatView from './components/ChatView.tsx'
import ChatList from './components/ChatList.tsx'
import useChats from './hooks/useChats.ts'
import useLogin from './hooks/useLogin.ts'

type Credentials = {
  username: string
  password: string
}

const App = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  })
  const { user, handleLoginUser } = useLogin()
  const { chats, selectedChat, setChats, setSelectedChat } = useChats(
    user?.id || ''
  )
  const { id: userId } = user || { id: '' }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    await handleLoginUser(credentials.username, credentials.password)
  }

  return (
    <div className="flex flex-row space-x-4">
      <ChatList chats={chats} setSelectedChat={setSelectedChat} />
      {selectedChat && (
        <ChatView
          chatId={selectedChat.id}
          currentUser={userId}
          users={selectedChat.users}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({
                username: e?.target?.value,
                password: credentials.password,
              })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                username: credentials.username,
                password: e?.target?.value,
              })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
