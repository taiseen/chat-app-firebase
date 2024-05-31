import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useUserStore } from "../../zustand/userStore";
import { db } from "../../firebase";
import { useState } from "react";
import { toast } from "react-toastify";


const AddUser = ({ setIsUserAddModalOpen }) => {

    const { currentUser } = useUserStore();

    const [user, setUser] = useState(null);


    const handleSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");

            const q = query(userRef, where("username", "==", username));

            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            } else {
                toast.info('No user found by this name...')
            }

        } catch (err) {
            console.log(err);
        }
    }


    const handleAddUser = async () => {
        const chatRef = collection(db, "chats");

        const userChatsRef = collection(db, "userChats");

        try {
            const newChatRef = doc(chatRef);


            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });


            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });


            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });

            setIsUserAddModalOpen(false); // close modal...
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div
            className="w-[460px] max-h-max p-5 bg-green-900/80 rounded absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col gap-4"
        >

            <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 w-full"
            >
                <input
                    type="text"
                    name="username"
                    placeholder="Add by user name"
                    className="px-3 py-2 rounded outline-none border-none w-full"
                />

                <button
                    className="px-2 py-1 border-none outline-none bg-green-700/70 rounded duration-300 hover:bg-green-700"
                >
                    Search
                </button>
            </form>

            {
                user && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-500">

                        <div className="flex items-center gap-5">
                            <img
                                alt=""
                                src={user.avatar || "./avatar.png"}
                                className="w-12 h-12 object-cover rounded-full"
                            />

                            <span>{user.username}</span>
                        </div>

                        <button
                            onClick={handleAddUser}
                            className="px-2 py-1 border-none outline-none bg-green-700/70 rounded duration-300 hover:bg-green-700"
                        >
                            Add User
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default AddUser