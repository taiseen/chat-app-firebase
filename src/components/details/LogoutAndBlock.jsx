import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../zustand/chatStore";
import { useUserStore } from "../../zustand/userStore";
import { auth, db } from "../../firebase";

const LogoutAndBlock = () => {

    const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore();
    const { currentUser } = useUserStore();


    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", currentUser.id);

        try {
            await updateDoc(
                userDocRef,
                { blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id) }
            );

            changeBlock();

        } catch (err) {
            console.log(err);
        }
    };


    const handleLogout = () => {
        auth.signOut();
        resetChat()
    };


    return (

        <div className="flexCol gap-3 p-3">
            <button className="blockUser" onClick={handleBlock} >
                {
                    isCurrentUserBlocked
                        ? "You are Blocked!"
                        : isReceiverBlocked
                            ? "User blocked"
                            : "Block User"
                }
            </button>

            <button className="logout" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default LogoutAndBlock