import styles from '../styles/NavigationMenu.module.css';
import MenuIconItem from './MenuIconItem.tsx';

type NavigationButtonProps = {
  menuItem: MenuIconItem;
  isActive: boolean;
  onClick: () => void;
};

const NavigationButton = ({
  menuItem,
  isActive,
  onClick,
}: NavigationButtonProps) => {
  const Icon = isActive ? menuItem.activeIcon : menuItem.icon;

  return (
    <button
      className={styles.navigationButton}
      onClick={onClick}
      disabled={isActive}
    >
      <Icon className="w-full h-full" />
    </button>
  );
};

export default NavigationButton;
