import Sidebar from "../adminSidebar";
import AdminNavBar from "../adminnavbar";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { URL } from "@/utility/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateUser() {
    const router = useRouter()
    const id = router.query.id
    const [registerForm, setregisterForm] = useState({ name: "", email: "", });
    const [errors, setErrors] = useState({});
    useEffect(()=>{getByid()},[id])
    async function getByid () {
		axios.post(`${URL}userById`, { id: id })
		.then(response => {
            setregisterForm({name:response.data.data.full_name,email:response.data.data.email})
		})
		.catch(error => {
			console.log(error);
		});
	 }
    function onRegister() {  
        // if (validateForm(registerForm)) {  
            axios.post(`${URL}userUpdate`, { email: registerForm.email,full_name: registerForm.name})
                .then(response => { 
                    setregisterForm(response.data.data) 
                    toast(response.data.message)
                    router.push('/admin/user')
                    
                })
                .catch(error => {
                    console.log(error);
                }); 
        // }
    }
    function validateForm(fieldsValue) {
        
        let fields = fieldsValue;
        let errors = {};
        let formIsValid = true;
        if (fields.name == "") {
            formIsValid = false;
            errors.name = "*Please enter your name.";
        }
        if (fields.name == "") {

            formIsValid = false;
            errors.name = "*Please enter your name.";
        }
        if (fields.email == "") {
            formIsValid = false;
            errors.email = "*Please enter email.";
        }
       
        
        setErrors(errors); 
        return formIsValid;
    }
    return (<>


        <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
        <div className="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper" className="bg-white" style={{ background: "#fff" }}>
                <AdminNavBar />
                <div className="user">
                    <h4> Update User</h4>
                </div>
               
                <div className="container-fluid">
                    <div className="submit-form admn-form-cls mt40 mb40">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-form">

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>User Name</label>
                                                    <input type="text" value={registerForm?.name} onChange={(e) => setregisterForm({ name: e.target.value, email: registerForm.email, password: registerForm.password })} />
                                                    <p>{errors.name}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>email</label>
                                                    <input type="email" value={registerForm?.email}
                                                    onChange={(e) => setregisterForm({ name: registerForm.name, email: e.target.value, password: registerForm.password })}
                                                     />
                                                    <p>{errors.url}</p>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <input type="Password"
                                                    onChange={(e) => setregisterForm({ name: registerForm.name, email: registerForm.email, password: e.target.value })}
                                                     />
                                                    <p>{errors.url}</p>
                                                </div>
                                            </div>    */}
                                         
                                            
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button type="submit" className="theme-btn"
                                                     onClick={(e) => onRegister()}
                                                    >Submit</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default UpdateUser;