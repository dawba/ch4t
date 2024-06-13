import {
  ReactComponent as SettingsIconActive,
  ReactComponent as SettingsIcon,
  ReactComponent as AddChatIconActive,
  ReactComponent as AddChatIcon,
  ReactComponent as GroupChatsIconActive,
  ReactComponent as GroupChatsIcon,
  ReactComponent as DirectChatsIconActive,
  ReactComponent as DirectChatsIcon,
} from '*.svg';
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
