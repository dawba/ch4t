import { ReactComponent as SettingsIconActive } from '../../assets/nav_menu_icons/settings_icon_active.svg';
import { ReactComponent as SettingsIcon } from '../../assets/nav_menu_icons/settings_icon.svg';
import { ReactComponent as AddChatIconActive } from '../../assets/nav_menu_icons/add_chat_icon_active.svg';
import { ReactComponent as AddChatIcon } from '../../assets/nav_menu_icons/add_chat_icon.svg';
import { ReactComponent as GroupChatsIconActive } from '../../assets/nav_menu_icons/group_chats_icon_active.svg';
import { ReactComponent as GroupChatsIcon } from '../../assets/nav_menu_icons/group_chats_icon.svg';
import { ReactComponent as DirectChatsIconActive } from '../../assets/nav_menu_icons/direct_chats_icon_active.svg';
import { ReactComponent as DirectChatsIcon } from '../../assets/nav_menu_icons/direct_chats_icon.svg';
import { MenuItem, SVGIcon } from '../../types/types.ts';

class MenuIconItem {
  menu: MenuItem;
  icon: SVGIcon;
  activeIcon: SVGIcon;

  private constructor(menu: MenuItem, icon: SVGIcon, activeIcon: SVGIcon) {
    this.menu = menu;
    this.icon = icon;
    this.activeIcon = activeIcon;
  }

  static DirectChats = new MenuIconItem(
    'DirectChats',
    DirectChatsIcon,
    DirectChatsIconActive
  );
  static GroupChats = new MenuIconItem(
    'GroupChats',
    GroupChatsIcon,
    GroupChatsIconActive
  );
  static AddChat = new MenuIconItem('AddChat', AddChatIcon, AddChatIconActive);
  static Settings = new MenuIconItem(
    'Settings',
    SettingsIcon,
    SettingsIconActive
  );

  static allMenuIconItems = [
    MenuIconItem.DirectChats,
    MenuIconItem.GroupChats,
    MenuIconItem.AddChat,
    MenuIconItem.Settings,
  ];
}

export default MenuIconItem;
