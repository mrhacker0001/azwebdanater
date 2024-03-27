import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function event(e) {
        if (username.length === 0 || email.length === 0 || password.length === 0) {
            alert("To'liq yozing");
            return; // Prevent further execution if fields are empty
        }

        e.preventDefault();
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        navigate("/Home");
    }

   

   

    return (
        <div className="Signup">
            <div className="form">
                <input type="email" name="email" placeholder="Emailingizni kiriting" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Foydalanuvchi nomingizni kiriting" onChange={(e) => setUsername(e.target.value)} />
              <div className="password">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Parolingizni kiriting" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <b onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "Yashir" : "Ko'rsat"}
                    </b>
                    </div>
                <button onClick={() => navigate("/Signin")}>Hisob bormi?</button>
                <button onClick={event}>Ro'yhatdan o'tish</button>
            </div>
            
        </div>
    );
}
