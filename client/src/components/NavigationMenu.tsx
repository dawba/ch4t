import styles from '../styles/NavigationMenu.module.css';
import * as React from 'react';
import {ReactComponent as Logo} from '../assets/logo.svg';
import { ReactComponent as DirectChatsIcon } from '../assets/nav_menu_icons/direct_chats_icon.svg';
import { ReactComponent as DirectChatsIconActive } from '../assets/nav_menu_icons/direct_chats_icon_active.svg';
import { ReactComponent as GroupChatsIcon } from '../assets/nav_menu_icons/group_chats_icon.svg';
import { ReactComponent as GroupChatsIconActive } from '../assets/nav_menu_icons/group_chats_icon_active.svg';
import { ReactComponent as AddChatIcon } from '../assets/nav_menu_icons/add_chat_icon.svg';
import { ReactComponent as AddChatIconActive } from '../assets/nav_menu_icons/add_chat_icon_active.svg';
import { ReactComponent as SettingsIcon } from '../assets/nav_menu_icons/settings_icon.svg';
import { ReactComponent as SettingsIconActive } from '../assets/nav_menu_icons/settings_icon_active.svg';

type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

export type MenuItem = 'DirectChats' | 'GroupChats' | 'AddChat' | 'Settings';
class MenuIconItem {
    menu: MenuItem
    icon: SVGIcon;
    activeIcon: SVGIcon;

    private constructor(menu: MenuItem, icon: SVGIcon, activeIcon: SVGIcon) {
        this.menu = menu;
        this.icon = icon;
        this.activeIcon = activeIcon;
    }

    static DirectChats = new MenuIconItem('DirectChats', DirectChatsIcon, DirectChatsIconActive, );
    static GroupChats = new MenuIconItem('GroupChats', GroupChatsIcon, GroupChatsIconActive);
    static AddChat = new MenuIconItem('AddChat', AddChatIcon, AddChatIconActive);
    static Settings = new MenuIconItem('Settings', SettingsIcon, SettingsIconActive);

    static allMenuIconItems = [
        MenuIconItem.DirectChats,
        MenuIconItem.GroupChats,
        MenuIconItem.AddChat,
        MenuIconItem.Settings
    ];
}

type NavigationButtonProps = {
    menuItem: MenuIconItem
    isActive: boolean;
    onClick: () => void;
}

const NavigationButton = ({menuItem, isActive, onClick}: NavigationButtonProps) => {
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
}
type NavigationMenuProps = {
    activeItem: MenuItem;
    setActiveItem: (item: MenuItem) => void;
};

const NavigationMenu = ({ activeItem, setActiveItem }: NavigationMenuProps) => {
    return (
        <div className="w-[8vw] h-full bg-primary-gray flex flex-col items-center mr-1">
            <Logo className="w-24 h-24 mx-auto mt-5 mb-12"/>
            <div className="flex flex-col items-center h-full">
                {MenuIconItem.allMenuIconItems.map((iconItem, index) => (
                    <div className={'mb-4' + (index === MenuIconItem.allMenuIconItems.length - 1 ? ' mt-auto' : '')}>
                        <NavigationButton
                            menuItem={iconItem}
                            isActive={activeItem === iconItem.menu}
                            onClick={() => setActiveItem(iconItem.menu)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationMenu;
