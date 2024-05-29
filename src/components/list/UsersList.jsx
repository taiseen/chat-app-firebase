import UserImg from "../helper/UserImg"

const UsersList = () => {
    return (
        <div className="item flex items-center gap-5 px-4 py-3 cursor-pointer border-b border-gray-700 hover:bg-black/30 duration-300 rounded">

            <UserImg imgSrc="./avatar.png" title="User" />

            <div className="texts flex flex-col gap-1">
                <span className="font-semibold text-lg">Jon Do</span>
                <p className="text-sm">Hello</p>
            </div>
        </div>
    )
}

export default UsersList