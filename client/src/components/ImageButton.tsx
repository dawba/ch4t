import styles from '../styles/ImageButton.module.css'

interface ImageButtonProps {
    image: string
    onClick: () => void
}

const ImageButton = ({ onClick, image }:ImageButtonProps) => {
    return (
        <button className={styles.SendButton} onClick={onClick}>
            <img src={image} />
        </button>
    )
}

export default ImageButton
