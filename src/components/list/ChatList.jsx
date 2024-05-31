import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useUserStore } from "../../zustand/userStore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

import UsersList from "./UsersList";


const ChatList = ({ input }) => {

    const { currentUser } = useUserStore();

    const [chats, setChats] = useState([]);


    useEffect(() => {
        // v.time => 2:10:10

        const unSub = onSnapshot(

            doc(db, "userChats", currentUser.id),

            async (res) => {

                const items = res.data().chats;

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data();

                    return { ...item, user };
                });

                const chatData = await Promise.all(promises);

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        );

        return () => unSub();

    }, [currentUser.id]);

    const filteredChats = chats.filter((c) =>
        c.user.username.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className="overflow-y-auto userListScroll">
            {
                filteredChats.map(chat => <UsersList key={chat.chatId} chat={chat} chats={chats} />)
            }
        </div>
    )
}

export default ChatList;