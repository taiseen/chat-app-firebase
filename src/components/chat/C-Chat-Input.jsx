import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../zustand/chatStore';
import { useUserStore } from '../../zustand/userStore';
import { db } from '../../firebase';
import { useState } from 'react';

import EmojiPicker from 'emoji-picker-react';
import upload from '../../lib/upload';
import Icon from '../helper/Icon';

const ChatInput = ({ img, setImg }) => {

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
    const { currentUser } = useUserStore();

    const [isEmojiShow, setIsEmojiShow] = useState(false);
    const [userInputMessage, setUserInputMessage] = useState('');

    const isBlock = isCurrentUserBlocked || isReceiverBlocked;


    const handleEmojiClick = (e) => {
        setUserInputMessage(pre => pre + e.emoji);
        setIsEmojiShow(false)
    }


    const handleImg = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImg({ file, url: URL.createObjectURL(file) })
        }
    };


    const handleSend = async () => {
        if (userInputMessage === "") return;

        let imgUrl = null;

        try {
            if (img.file) {
                imgUrl = await upload(img.file);
            }

            await updateDoc(
                doc(db, "chats", chatId),
                {
                    messages: arrayUnion({
                        senderId: currentUser.id,
                        text: userInputMessage,
                        createdAt: new Date(),
                        ...(imgUrl && { img: imgUrl }),
                    }),
                }
            );

            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async (id) => {

                const userChatsRef = doc(db, "userChats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = userInputMessage;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, { chats: userChatsData.chats });
                }
            });

        } catch (err) {
            console.log(err);
        } finally {
            setImg({ file: null, url: "" });
            setUserInputMessage("");
        }
    };


    return (
        <div className="p-4 flex items-center justify-between gap-3 border-t border-gray-700">

            <div className="iconContainer">
                <label htmlFor="imageFile">
                    <Icon imgSrc={"./img.png"} title='Image' />
                    <input id="imageFile" type="file" className='hidden' onChange={handleImg} />
                </label>

                <Icon imgSrc={"./camera.png"} title='Camera' />
                <Icon imgSrc={"./mic.png"} title='Mic' />
            </div>

            <input
                type="text"
                value={userInputMessage}
                placeholder={
                    isBlock
                        ? "🛑 You cannot send message..."
                        : "Type a message..."
                }
                disabled={isBlock}
                onChange={(e) => setUserInputMessage(e.target.value)}
                className="flex-1 px-2.5 py-2 outline-none border border-gray-700 rounded-md text-lg text-gray-200 bg-gray-700/50"
            />

            <div className='relative'>
                <div onClick={() => setIsEmojiShow(pre => !pre)}>
                    <Icon imgSrc={"./emoji.png"} title='Emoji' />
                </div>

                <div className={`absolute bottom-10 left-0 origin-bottom-left duration-300 z-10
                    ${isEmojiShow ? 'scale-100' : 'scale-0'}
                `}>
                    <EmojiPicker
                        theme='dark'
                        open={isEmojiShow}
                        lazyLoadEmojis={true}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            </div>

            <button
                disabled={isBlock}
                onClick={handleSend}
                className="px-2.5 py-1.5 rounded outline-none border-none duration-300 bg-green-700/80 hover:bg-green-700"
            >
                Send
            </button>

        </div>
    )
}

export default ChatInput