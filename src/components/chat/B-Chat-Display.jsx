import { useEffect, useRef } from "react"

const ChatDisplay = () => {

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const ChatUserImg = ({ imgSrc, name }) => (
        <img src={imgSrc} alt={name} className="w-9 h-9 rounded-full object-cover select-none" />
    )

    const Owner = () => (
        <div className="messages ownMessage">
            <ChatUserImg imgSrc={"./avatar.png"} name={'Receiver'} />

            <div className="textResponseContainer">
                <p className="textCommon ownColor">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ducimus exercitationem eos optio, harum repellat nostrum quasi nam id dolor.</p>
                <span className="messageTime">1 min ago</span>
            </div>
        </div>
    )

    const Sender = () => (
        <div className="messages">
            <ChatUserImg imgSrc={"./avatar.png"} name={'Sender'} />

            <div className="textResponseContainer">
                <p className="textCommon senderColor">Lorem, ipsum dolor consectetur adipisicing elit.</p>
                <span className="messageTime">1 min ago</span>
            </div>
        </div>
    )

    return (
        <div className="p-3 flex-1 flex flex-col gap-4 overflow-y-auto chatDisplayScroll">


            <Sender />
            <Owner />

            <Sender />
            <Owner />

            <Sender />
            <Owner />


            <Sender />
            <Owner />

            <Sender />
            <Owner />

            <Sender />
            <Owner />

            <Sender />
            <Owner />


            <div className="messages ownMessage">
                <ChatUserImg imgSrc={"./avatar.png"} name={'Receiver'} />

                <div className="textResponseContainer">

                    <img src="./avatar.png" alt="" className="w-full h-80 rounded-md object-cover" />

                    <p className="textCommon ownColor">Lorem, ipsum dolor.</p>
                    <span className="messageTime">1 min ago</span>
                </div>
            </div>


            <div ref={endRef}></div>
        </div>
    )
}

export default ChatDisplay