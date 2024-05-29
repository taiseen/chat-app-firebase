import UserImg from "../helper/UserImg";
import Icon from "../helper/Icon";

const ChatHeader = () => {

    return (
        <div className="top p-4 flex items-center justify-between border-b border-gray-700 ">
            <div className="user flex items-center gap-4">
                <UserImg imgSrc="./avatar.png" title="User" />

                <div className="texts">
                    <span className="text-lg font-bold">Jon Do</span>
                    <p className="text-sm text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, minus?</p>
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