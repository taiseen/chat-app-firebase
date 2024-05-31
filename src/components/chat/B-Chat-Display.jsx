import { useUserStore } from "../../zustand/userStore";
import { useChatStore } from "../../zustand/chatStore";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react"
import { db } from "../../firebase";

const ChatDisplay = ({ img }) => {

    const endRef = useRef(null);

    const [chat, setChat] = useState();

    const { currentUser } = useUserStore();
    const { user, chatId } = useChatStore();

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // console.log(user);

    useEffect(() => {

        const unSub = onSnapshot(
            doc(db, "chats", chatId),
            (res) => setChat(res.data())
        );

        return () => unSub();

    }, [chatId]);



    const ChatUserImg = ({ imgSrc, name }) => (
        <img src={imgSrc} alt={name} className="w-9 h-9 rounded-full object-cover select-none" />
    )

    // const Owner = () => (
    //     <div className="messages ownMessage">
    //         <ChatUserImg imgSrc={"./avatar.png"} name={'Receiver'} />

    //         <div className="textResponseContainer">
    //             <p className="textCommon ownColor">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ducimus exercitationem eos optio, harum repellat nostrum quasi nam id dolor.</p>
    //             <span className="messageTime">1 min ago</span>
    //         </div>
    //     </div>
    // )

    // const Sender = () => (
    //     <div className="messages">
    //         <ChatUserImg imgSrc={"./avatar.png"} name={'Sender'} />

    //         <div className="textResponseContainer">
    //             <p className="textCommon senderColor">Lorem, ipsum dolor consectetur adipisicing elit.</p>
    //             <span className="messageTime">1 min ago</span>
    //         </div>
    //     </div>
    // )


    return (
        <div className="p-3 flex-1 flex flex-col gap-4 overflow-y-auto chatDisplayScroll">

            {
                chat && chat?.messages?.map((message, idx) =>

                    <div
                        key={idx}
                        className={
                            message.senderId === currentUser?.id ? "messages ownMessage" : "messages"
                        }
                    >

                        <ChatUserImg
                            imgSrc={message.senderId === currentUser?.id ? currentUser?.avatar : user?.avatar}
                            name={'Receiver'}
                        />

                        <div className="textResponseContainer">
                            {
                                message.img &&
                                <img src={message.img} alt="" className="w-full h-80 rounded-md object-cover" />
                            }

                            <p className="textCommon ownColor">{message.text}</p>
                            {/* <span className="messageTime">{message.createdAt}</span> */}
                        </div>

                    </div>
                )
            }

            {/* <Sender />
            <Owner /> */}

            {
                // current update send user side image data
                img.url && (
                    <div className="messages ownMessage">
                        <div className="texts">
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )
            }

            <div ref={endRef}></div>
        </div>
    )
}

export default ChatDisplay