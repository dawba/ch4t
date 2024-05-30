import React, { useState } from 'react'
import styles from './SideMenu.module.css'
import NavigationButton from './NavigationButton'
import settingsButton from '../assets/settings_button.png'
import settingsButtonActive from '../assets/settings_button_active.png'
import chatsButton from '../assets/chats_button.png'
import chatsButtonActive from '../assets/chats_button_active.png'
import groupChatsButton from '../assets/group_chats_button.png'
import groupChatsButtonActive from '../assets/group_chats_button_active.png'
import addChatButton from '../assets/add_chat_button.png'
import addChatButtonActive from '../assets/add_chat_button_active.png'
import logo from '../assets/logo.png'

const SideMenu: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number | null>(null)

    const handleButtonClick = (index: number) => {
        setActiveButton(index)
    }
    const chatImages = [chatsButton, chatsButtonActive]

    const groupChatImages = [groupChatsButton, groupChatsButtonActive]

    const addChatImages = [addChatButton, addChatButtonActive]

    const settingsImages = [settingsButton, settingsButtonActive]


    return (
        <div className={styles.sideMenu}>
            <img src={logo} className={styles.logo}></img>
            <div className={styles.navigationButtonGroup}>
                <NavigationButton
                    index={0}
                    isActive={activeButton === 0}
                    onClick={handleButtonClick}
                    activeImage={chatImages[1]}
                    inactiveImage={chatImages[0]}
                ></NavigationButton>
                <NavigationButton
                    index={1}
                    isActive={activeButton === 1}
                    onClick={handleButtonClick}
                    activeImage={groupChatImages[1]}
                    inactiveImage={groupChatImages[0]}
                ></NavigationButton>
                <NavigationButton
                    index={2}
                    isActive={activeButton === 2}
                    onClick={handleButtonClick}
                    activeImage={addChatImages[1]}
                    inactiveImage={addChatImages[0]}
                ></NavigationButton>
                <div className={styles.settingsButton}>
                <NavigationButton
                    index={3}
                    isActive={activeButton === 3}
                    onClick={handleButtonClick}
                    activeImage={settingsImages[1]}
                    inactiveImage={settingsImages[0]} 
                    
                ></NavigationButton>
                </div>
            </div>
        </div>
    )
}

export default SideMenu
