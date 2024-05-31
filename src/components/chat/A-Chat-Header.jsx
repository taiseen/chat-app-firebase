import { useChatStore } from "../../zustand/chatStore";
import UserImg from "../helper/UserImg";
import Icon from "../helper/Icon";

const ChatHeader = () => {

    const { user } = useChatStore();

    return (
        <div className="top p-4 flex items-center justify-between border-b border-gray-700 ">
            <div className="user flex items-center gap-4">
                <UserImg imgSrc={user?.avatar || "./avatar.png"} title="User" />

                <div className="texts">
                    <span className="text-lg font-bold">{user?.username}</span>
                    {/* <p className="text-sm text-gray-400">N/A</p> */}
                </div>
            </div>

            <div className="iconContainer">
                <Icon imgSrc={"./phone.png"} title='Audio' />
                <Icon imgSrc={"./video.png"} title='Video' />
                <Icon imgSrc={"./info.png"} title='Info' />
            </div>
        </div>
    )
}

export default ChatHeader