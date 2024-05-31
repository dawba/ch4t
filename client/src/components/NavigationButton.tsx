import styles from './NavigationButton.module.css';

interface NavigationButtonProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  activeImage: string;
  inactiveImage: string;
}

const NavigationButton= ({ index, isActive, onClick, activeImage, inactiveImage }:NavigationButtonProps) => {

  const handleButtonClick = () => {
    if (!isActive) {
      onClick(index);
    }
  };

  return (
    <button 
      className={styles.navigationButton} 
      onClick={handleButtonClick}
      disabled={isActive}
    >
      
      <img 
        src={isActive ? activeImage : inactiveImage} 
      />
    </button>
  );
}

export default NavigationButton;
