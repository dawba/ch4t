import ChatsListView, {Mock1, Mock2, Mock3} from "./ChatsListView.tsx";
import {MenuItem} from "./NavigationMenu.tsx";
import SettingsView from "./SettingsView.tsx";
import AddChatView from "./AddChatView.tsx";

type ContextMenuProps = {
    activeMenuItem: MenuItem;
};

const ContextMenu = ({ activeMenuItem }: ContextMenuProps) => {
    return (
        <div className="w-[20vw] h-full bg-primary-gray mr-1">
            {activeMenuItem === 'DirectChats' && (
                <ChatsListView areChatsDirect={true} chats={[Mock1, Mock2, Mock3]} />
            )}
            {activeMenuItem === 'GroupChats' && (
                <ChatsListView areChatsDirect={false} chats={[Mock1, Mock2, Mock3]} />
            )}
            {activeMenuItem === 'AddChat' && <AddChatView />}
            {activeMenuItem === 'Settings' && <SettingsView />}
        </div>
    );
}

export default ContextMenu;