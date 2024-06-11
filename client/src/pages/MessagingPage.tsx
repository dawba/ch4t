import React, {useState} from "react";
import NavigationMenu, {MenuItem} from "../components/NavigationMenu.tsx";
import ContextMenu from "../components/ContextMenu.tsx";
import {UserProvider} from "../components/UserProvider.tsx";


const MessagingPage: React.FC = () => {
    const [activeItem, setActiveItem] = useState<MenuItem>('DirectChats');

    return (
        <UserProvider>
            <div className="h-full w-full flex flex-row items-start">
                <NavigationMenu activeItem={activeItem} setActiveItem={setActiveItem}/>
                <ContextMenu activeMenuItem={activeItem}/>
            </div>
        </UserProvider>
    );
}

export default MessagingPage;