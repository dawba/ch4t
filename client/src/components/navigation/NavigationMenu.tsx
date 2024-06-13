import { ReactComponent as Logo } from '../assets/logo.svg';
import MenuIconItem from './MenuIconItem.tsx';
import NavigationButton from './NavigationButton.tsx';
import { MenuItem } from '../../types/types.ts';

type NavigationMenuProps = {
  activeItem: MenuItem;
  setActiveItem: (item: MenuItem) => void;
};

const NavigationMenu = ({ activeItem, setActiveItem }: NavigationMenuProps) => {
  return (
    <div className="w-[8vw] h-full bg-primary-gray flex flex-col items-center mr-1">
      <Logo className="w-24 h-24 mx-auto mt-5 mb-12" />
      <div className="flex flex-col items-center h-full">
        {MenuIconItem.allMenuIconItems.map((iconItem, index) => (
          <div
            className={
              'mb-4' +
              (index === MenuIconItem.allMenuIconItems.length - 1
                ? ' mt-auto'
                : '')
            }
          >
            <NavigationButton
              menuItem={iconItem}
              isActive={activeItem === iconItem.menu}
              onClick={() => setActiveItem(iconItem.menu)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu;
