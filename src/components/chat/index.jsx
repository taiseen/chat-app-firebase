import ChatDisplay from "./B-Chat-Display";
import ChatHeader from "./A-Chat-Header";
import ChatInput from "./C-Chat-Input";
import { useState } from "react";

const Chat = () => {

    const [img, setImg] = useState({ file: null, url: "" });

    return (
        <section className='flex-2 border-l border-r border-gray-700 flex flex-col'>

            <ChatHeader />

            <ChatDisplay img={img} />

            <ChatInput img={img} setImg={setImg} />

        </section>
    )
}

export default Chat