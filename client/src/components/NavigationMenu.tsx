import styles from './NavigationMenu.module.css';
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
import {useState} from "react";

type SVGIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

class MenuItem {
    icon: SVGIcon;
    activeIcon: SVGIcon;

    private constructor(icon: SVGIcon, activeIcon: SVGIcon) {
        this.icon = icon;
        this.activeIcon = activeIcon;
    }

    static DirectChats = new MenuItem(DirectChatsIcon, DirectChatsIconActive);
    static GroupChats = new MenuItem(GroupChatsIcon, GroupChatsIconActive);
    static AddChat = new MenuItem(AddChatIcon, AddChatIconActive);
    static Settings = new MenuItem(SettingsIcon, SettingsIconActive);

    static allMenuItems = [
        MenuItem.DirectChats,
        MenuItem.GroupChats,
        MenuItem.AddChat,
        MenuItem.Settings
    ];
}

type NavigationButtonProps = {
    menuItem: MenuItem
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
const NavigationMenu = () => {
    const [activeItem, setActiveItem] = useState<MenuItem>(MenuItem.DirectChats);

    return (
        <div className="w-[8vw] h-full bg-primary-gray flex flex-col items-center mr-1">
            <Logo className="w-24 h-24 mx-auto mt-5 mb-12"/>
            <div className="flex flex-col items-center h-full">
                {MenuItem.allMenuItems.map((item, index) => (
                    <div className={'mb-4' + (index === MenuItem.allMenuItems.length - 1 ? ' mt-auto' : '')}>
                        <NavigationButton
                            menuItem={item}
                            isActive={activeItem === item}
                            onClick={() => setActiveItem(item)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationMenu;
