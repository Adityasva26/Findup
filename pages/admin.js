import Header from "./main/header";
import Footer from "./main/footer";
import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import axios from "axios";

import { URL } from '../../utility/api';
function AdminLogin() {
  
    const router = useRouter()
    const [loginForm, setloginForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    useEffect(()=>{onLogin()},[])
    function onLogin() {
        console.log("loginform");
        if (validateForm(loginForm)) {
            console.log("loginform12344556");
            axios.post(`${URL}login`, { email: loginForm.email, password: loginForm.password })
                .then(response => {
                    console.log(response.data);
                    window.localStorage.setItem("adminData", JSON.stringify(response.data.data))
                    router.push('/')
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    function validateForm(fieldsValue) {
        let fields = fieldsValue;
        let errors = {};
        let formIsValid = true;
        if (fields.email == "") {
            console.log("email", fields)
            formIsValid = false;
            errors["email"] = "*Please enter your name.";
        }
        if (!fields.password.match(
            /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&!]).*$/)) {
            formIsValid = false;
            errors.password = "*Please enter atleast one letter Capital , One Digit , One Symbol and  8 Characters.";
        }
        setErrors(errors);
        return formIsValid;
    }
    console.log("loginForm",loginForm)
    return (<>
        <Header />
        <div class="details-informations  mb40">
            <div class="container">
                <div class="row align-items-center">
                    <div class="login-main">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-md-4">
                                    <div class="login-from">
                                        <h3>Admin Login</h3>
                                            <div class="login-from-group">
                                                <input type="text" name="username" placeholder="username" onClick={(e)=>setloginForm({email:e.target.value,password:loginForm.password})}/>
                                                <p>{errors.email}</p>
                                            </div>

                                            <div class="login-from-group">
                                                <input type="password" name="password" placeholder="password" onClick={(e)=>setloginForm({email:loginForm.email,password:e.target.value})}/>
                                                <p>{errors.password}</p>
                                            </div>
                                            <div class="login-bottom text-center">  
                                                <button  class="login-btn theme-btn" onClick={()=>onLogin()}>Submit</button>
                                           
                                                </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default AdminLogin;