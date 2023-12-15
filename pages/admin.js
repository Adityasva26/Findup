import Header from "./main/header";
import Footer from "./main/footer";
import { useRouter } from "next/router";
import { useState ,useEffect} from "react";
import axios from "axios";

import { URL } from '../utility/api';
function AdminLogin() {
  
    const router = useRouter()
    const [loginForm, setloginForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    useEffect(()=>{},[])
    function onLogin() {

        if (validateForm(loginForm)) {
         
            axios.post(`${URL}login`, { email: loginForm.email.toLocaleLowerCase(), password: loginForm.password })
                .then(response => {
                    if(response.data.status==1){
                    console.log(response.data);
                    window.localStorage.setItem("adminData", JSON.stringify(response.data.data))
                    router.push('/admin/dashboard')}
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
  
    return (<>
        <Header />
        <div className="details-informations  mb40">
            <div className="container">
                <div className="row align-items-center">
                    <div className="login-main">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <div className="login-from">
                                        <h3>Admin Login</h3>
                                            <div className="login-from-group">
                                                <input type="text" name="" placeholder="username" onChange={(e)=>setloginForm({email:e.target.value,password:loginForm.password})}/>
                                                <p>{errors.email}</p>
                                            </div>

                                            <div className="login-from-group">
                                                <input type="password" name="" placeholder="password" onChange={(e)=>setloginForm({email:loginForm.email,password:e.target.value})}/>
                                                <p>{errors.password}</p>
                                            </div>
                                            <div className="login-bottom text-center">  
                                                <button  className="login-btn-inner theme-btn" onClick={()=>onLogin()}>Submit</button>
                                           
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