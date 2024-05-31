import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useState } from "react";

const SignIn = () => {

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="authContainer">

            <h2 className="text-xl">Login | Welcome back...</h2>

            <form onSubmit={handleLogin} className="authForm">
                <input className='authInput' type="text" placeholder="Email" name="email" />

                <input className='authInput' type="password" placeholder="Password" name="password" />

                <button
                    disabled={loading}
                    className={`authBtn 
                    ${loading ? "cursor-not-allowed" : "cursor-pointer"}
                `}
                >
                    {loading ? "Loading..." : "Sign In"}
                </button>

            </form>

        </div>
    )
}

export default SignIn