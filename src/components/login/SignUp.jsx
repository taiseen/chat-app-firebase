import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import upload from "../../lib/upload";


const SignUp = () => {

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState({ file: null, url: "" });


    const handleAvatar = (e) => {
        const file = e.target.files[0];

        if (file) {
            setAvatar({ file, url: URL.createObjectURL(file) });
        }
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.target);// represent html form data...
        const { username, email, password } = Object.fromEntries(formData); // collect by input tag - name attributes...


        // 🛑🛑🛑 Validate Inputs... 🛑🛑🛑
        if (!username || !email || !password) {
            setLoading(false);
            return toast.warn("Please enter inputs!");
        }

        // 🛑🛑🛑 Validate Inputs... 🛑🛑🛑
        if (!avatar.file) {
            setLoading(false);
            return toast.warn("Please upload an avatar!")
        }

        // 🛑🛑🛑 Validate Unique UserName... 🛑🛑🛑
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return toast.warn("Select another username");
        }


        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const userId = res.user.uid;

            // save uploaded image url...
            const imgUrl = await upload(avatar.file);

            // user information database...
            await setDoc(doc(db, "users", userId), {
                username,
                email,
                avatar: imgUrl,
                id: userId,
                blocked: [],
            });

            // user chat database...
            await setDoc(doc(db, "userChats", userId), { chats: [] });

            toast.success("Your account is created!");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="authContainer">

            <h2 className="text-xl">Register | Create an Account</h2>

            <form onSubmit={handleRegister} className="authForm">

                <label htmlFor="file"
                    className="w-full flex items-center justify-between cursor-pointer"
                >
                    <img
                        alt=""
                        className="w-[112px] h-[112px] rounded-full object-cover"
                        src={avatar.url || "./avatar.png"}
                    />

                    <p className="mr-1 underline underline-offset-8">Upload an image</p>
                </label>

                <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleAvatar}
                />

                <input className='authInput' type="text" placeholder="Username" name="username" />
                <input className='authInput' type="text" placeholder="Email" name="email" />
                <input className='authInput' type="password" placeholder="Password" name="password" />

                <button
                    disabled={loading}
                    className={`authBtn 
                        ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>

            </form>

        </div>
    )
}

export default SignUp