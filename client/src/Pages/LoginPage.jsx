import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "email") setEmailError("");
        if (e.target.name === "password") setPasswordError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");;

        try {
            const res = await axios.post("https://s62-claudiajerome-capstone-trackitback.onrender.com/user/signin", formData, {
                
            });
            console.log(res,'successfull')
            localStorage.setItem('token',res.data.token)

            navigate("/homepage");
        } catch (err) {
            console.log(err)
            // setError(err.response?.data?.message || "Login failed");
            const message = err.response?.data?.message || "Login failed";

            if (message.toLowerCase().includes("password")) {
                setPasswordError(message);
            } else {
                setEmailError(message);
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#EDE8F5]">
            <div className="bg-[#ADBBDA] p-8 shadow-lg rounded-lg w-96 border border-[#8697C4]">
                <h2 className="text-2xl font-bold text-center text-[#3D52A0]">Login</h2>
                {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-2">
                        
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2 border-[#8697C4]"
                        required
                    />
                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                    </div>
                    <div className="mb-2">

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2 border-[#8697C4]"
                        required
                    />
                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>
                    <button type="submit" className="w-full bg-[#3D52A0] text-white p-2 rounded hover:bg-[#7091E6]">
                        Login
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Did not have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-[#3D52A0] cursor-pointer hover:underline"
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage