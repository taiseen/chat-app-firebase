import Notification from "./components/helper/Notification";
import Details from "./components/details";
import Login from "./components/login";
import List from "./components/list";
import Chat from "./components/chat";

import { useUserStore } from "./zustand/userStore";
import { useChatStore } from "./zustand/chatStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";


const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();


  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => fetchUserInfo(user?.uid));

    return () => unSub();

  }, [fetchUserInfo]);


  if (isLoading) return <div className="px-20 py-16 text-5xl rounded-md font-bold bg-green-700/50">
    Loading...
  </div>;


  return (
    <div className="w-[90vw] h-[90vh] mainContainer flex rounded overflow-hidden text-gray-200">

      {
        currentUser
          ? (
            <>
              <List />
              {chatId && <Chat />}
              {chatId && <Details />}
            </>
          )
          : (
            <Login />
          )
      }

      <Notification />
    </div>
  )
}

export default App