import styles from './ChatView.module.css'
import Search from './Search'
import MessageList from './MesssageList'
import ImageButton from './ImageButton'
import attachmentButton from '../assets/attachment_button.png'
import sendButton from '../assets/send_button.png'
import CustomTextField from './CustomTextField'
import { v4 as uuidv4 } from 'uuid'

const ChatView = () => {
    const handleButtonClick = () => {
        console.log('clicked')
    }
    const data = [
        {
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus, diam vel imperdiet placerat, nisi libero facilisis tortor, vel varius lacus tortor quis purus. Aliquam vitae ullamcorper sapien. Integer dignissim tortor massa, sed maximus massa fringilla sed. Suspendisse eleifend mauris libero, vel laoreet enim fringilla eget.',
            senderName: 'Toamsz',
            timeSent: '21 Apr 2024 10:22',
            messageSentByUser: true,
            id: uuidv4(),
        },
        {
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus, diam vel imperdiet placerat, nisi libero facilisis tortor, vel varius lacus tortor quis purus. Aliquam vitae ullamcorper sapien. Integer dignissim tortor massa, sed maximus massa fringilla sed. Suspendisse eleifend mauris libero, vel laoreet enim fringilla eget.',
            senderName: 'Toamsz',
            timeSent: '21 Apr 2024 10:22',
            messageSentByUser: false,
            id: uuidv4(),
        },
        {
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus, diam vel imperdiet placerat, nisi libero facilisis tortor, vel varius lacus tortor quis purus. Aliquam vitae ullamcorper sapien. Integer dignissim tortor massa, sed maximus massa fringilla sed. Suspendisse eleifend mauris libero, vel laoreet enim fringilla eget.',
            senderName: 'Toamsz',
            timeSent: '21 Apr 2024 10:22',
            messageSentByUser: true,
            id: uuidv4(),
        },
        {
            message:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus, diam vel imperdiet placerat, nisi libero facilisis tortor, vel varius lacus tortor quis purus. Aliquam vitae ullamcorper sapien. Integer dignissim tortor massa, sed maximus massa fringilla sed. Suspendisse eleifend mauris libero, vel laoreet enim fringilla eget.',
            senderName: 'Toamsz',
            timeSent: '21 Apr 2024 10:22',
            messageSentByUser: false,
            id: uuidv4(),
        },
    ]

    return (
        <div className={styles.chatViewWrapper}>
            <div className={styles.topBar}>
                <Search />
            </div>
            <div className={styles.messageList}>
                <MessageList messages={data} />
            </div>
            <div className={styles.inputArea}>
                <div className={styles.attachmentButton}>
                    <ImageButton
                        image={attachmentButton}
                        onClick={handleButtonClick}
                    />
                </div>
                <div className={styles.textField}>
                    <CustomTextField />
                </div>
                <div className={styles.attachmentButton}>
                    <ImageButton
                        image={sendButton}
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatView
