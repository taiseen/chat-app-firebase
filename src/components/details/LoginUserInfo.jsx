import { useChatStore } from "../../zustand/chatStore";

const LoginUserInfo = () => {

    const { user } = useChatStore();

    return (
        <div className="flexCol items-center gap-1 py-5 border-b border-gray-700">
            <img src={user?.avatar || "./avatar.png"} alt="" className="size-40 rounded-full object-cover" />

            <h2 className="text-2xl capitalize">{user?.username}</h2>

            {/* <p>{user.lastMessage}</p> */}
        </div>
    )
}

export default LoginUserInfo