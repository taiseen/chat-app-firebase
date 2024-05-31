import { useUserStore } from "../../zustand/userStore";
import UserImg from "../helper/UserImg";
import Icon from "../helper/Icon";

const UserInfo = () => {

    const { currentUser } = useUserStore();

    return (
        <div className="p-4 flex items-center justify-between">

            <div className="flex items-center gap-5">
                <UserImg imgSrc={currentUser.avatar || "./avatar.png"} title="User" />
                
                <h2 className="text-xl">{currentUser.username}</h2>
            </div>

            <div className="iconContainer">
                <Icon imgSrc={"./more.png"} title='More' />
                <Icon imgSrc={"./video.png"} title='Video' />
                <Icon imgSrc={"./edit.png"} title='Edit' />
            </div>
        </div>
    )
}

export default UserInfo