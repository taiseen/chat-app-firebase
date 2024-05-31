import { useUserStore } from "../../zustand/userStore";
import { useChatStore } from "../../zustand/chatStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import UserImg from "../helper/UserImg"


const UsersList = ({ chats, chat }) => {

    const { user, lastMessage } = chat;

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();

    const isBlock = user.blocked.includes(currentUser.id);

    const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
            // eslint-disable-next-line no-unused-vars
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);

        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userChats", currentUser.id);

        try {
            await updateDoc(userChatsRef, { chats: userChats });

            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            onClick={() => handleSelect(chat)}
            className="item flex items-center gap-5 px-4 py-3 cursor-pointer border-b border-gray-700 hover:bg-black/30 duration-300 rounded"
            style={{
                backgroundColor: chat?.isSeen ? "transparent" : "green",
            }}
        >
            <UserImg
                imgSrc={isBlock
                    ? "./avatar.png"
                    : user?.avatar || "./avatar.png"
                }
                title="User"
            />

            <div className="texts flex flex-col gap-1">

                <span className="font-semibold text-lg">
                    {
                        isBlock ? "Blocked User" : user?.username
                    }
                </span>

                <p className="text-sm">{lastMessage}</p>
            </div>

        </div>
    )
}

export default UsersList