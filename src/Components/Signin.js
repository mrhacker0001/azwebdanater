import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// toast.success("Ma'lumotlar muvaffaqiyatli yuborildi!");
// } catch (error) {
//   console.error("xatolik yuz berdi:", error);
//   toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi");
// }
export function Signin(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const getusername = localStorage.getItem("username")
    const getpassword = localStorage.getItem("password")

    const navigate = useNavigate()
    const compare=()=>{
        if ( username.length === 0 || password.length === 0) {
             toast.error("To'liq yozing");
            return; // Prevent further execution if fields are empty
        }
        if(getusername===username && getpassword===password){
            navigate("/Home")
toast.success("Muvaffaqiyatli o'tdingiz!");

        }else{
           toast.error("parol yoki nomingiz xato");

        }
    };
    return(<>
    <ToastContainer/>
        <div className="Signin">
            <div className="form" >
        <input type="text" placeholder="Foydalanuvchi nomingizni kiriting" onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" placeholder="Parolingizni kiriting" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={compare}>kirish</button>
        </div>
        </div>
        </>
    )
}