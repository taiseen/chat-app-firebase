import Icon from "../helper/Icon";
import { useState } from "react";

const UserSearch = () => {
    const [addMore, setAddMore] = useState(false);

    return (
        <div className="flex items-center gap-5 px-4 pb-4 border-b border-gray-700">

            <div className="flex items-center gap-2 rounded-md flex-1 px-3 py-1 bg-gray-700/50">

                <Icon imgSrc={"./search.png"} title='Search' />

                <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded p-1 outline-none bg-transparent"
                />
            </div>

            <img
                alt="logo"
                onClick={() => setAddMore(pre => !pre)}
                src={addMore ? './minus.png' : './plus.png'}
                className="w-9 h-9 cursor-pointer p-2 rounded bg-gray-700/50"
            />

        </div>
    )
}

export default UserSearch