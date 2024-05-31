import UserSearch from "./UserSearch";
import ChatList from "./ChatList";
import UserInfo from "./UserInfo";
import { useState } from "react";

const List = () => {

    const [input, setInput] = useState("");


    return (
        <section className='flex-1 flex flex-col'>
            <UserInfo />

            <UserSearch input={input} setInput={setInput} />

            <ChatList input={input} />
        </section>
    )
}

export default List