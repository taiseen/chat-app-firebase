
import { useUserStore } from "./userStore";
import { create } from "zustand";


export const useChatStore = create((set) => ({

    user: null,
    chatId: null,
    isReceiverBlocked: false,
    isCurrentUserBlocked: false,

    changeChat: (chatId, user) => {

        const currentUser = useUserStore.getState().currentUser;

        // CHECK IF CURRENT USER IS BLOCKED
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // CHECK IF RECEIVER IS BLOCKED
        else if (currentUser.blocked.includes(user.id)) {
            return set({
                user: user,
                chatId,
                isReceiverBlocked: true,
                isCurrentUserBlocked: false,
            });
        }

        else {
            return set({
                user,
                chatId,
                isReceiverBlocked: false,
                isCurrentUserBlocked: false,
            });
        }
    },


    changeBlock: () => {
        set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
    },


    resetChat: () => {
        set({
            user: null,
            chatId: null,
            isReceiverBlocked: false,
            isCurrentUserBlocked: false,
        });
    },
}));