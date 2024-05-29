import ChatDisplay from "./B-Chat-Display";
import ChatHeader from "./A-Chat-Header";
import ChatInput from "./C-Chat-Input";

const Chat = () => {

    return (
        <section className='chat flex-2 border-l border-r border-gray-700 flex flex-col'>

            <ChatHeader />

            <ChatDisplay />

            <ChatInput />

        </section>
    )
}

export default Chat