import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase";

const resetStatus = { currentUser: null, isLoading: false };

export const useUserStore = create((set) => ({
    currentUser: null,

    isLoading: true,

    fetchUserInfo: async (uid) => {

        if (!uid) return set({ ...resetStatus });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            docSnap.exists()
                ? set({ currentUser: docSnap.data(), isLoading: false })
                : set({ ...resetStatus });

        } catch (err) {
            console.log(err);
            return set({ ...resetStatus });
        }
    },
}));