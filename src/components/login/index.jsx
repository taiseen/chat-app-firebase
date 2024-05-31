import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Login = () => {
    return (
        <div className="w-full h-full flex items-center gap-20">

            <SignIn />

            <div className="h-[80%] w-[2px] bg-gray-600 rounded-full"></div>

            <SignUp />

        </div>
    )
}

export default Login