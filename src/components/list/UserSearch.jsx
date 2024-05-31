import { useState } from "react";
import Icon from "../helper/Icon";
import AddUser from "../addUser";


const UserSearch = ({ input, setInput }) => {

    const [isUserAddModalOpen, setIsUserAddModalOpen] = useState(false);

    return (
        <div className="flex items-center gap-5 px-4 pb-4 border-b border-gray-700">

            <div className="flex items-center gap-2 rounded-md flex-1 px-3 py-1 bg-gray-700/50">

                <Icon imgSrc={"./search.png"} title='Search' />

                <input
                    type="text"
                    value={input}
                    placeholder="Search"
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full rounded p-1 outline-none bg-transparent"
                />
            </div>

            <img
                alt="logo"
                onClick={() => setIsUserAddModalOpen(pre => !pre)}
                src={isUserAddModalOpen ? './minus.png' : './plus.png'}
                className="w-9 h-9 cursor-pointer p-2 rounded bg-gray-700/50"
            />

            {
                isUserAddModalOpen && <AddUser setIsUserAddModalOpen={setIsUserAddModalOpen} />
            }

        </div>
    )
}

export default UserSearch