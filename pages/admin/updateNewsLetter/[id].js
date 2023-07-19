import Sidebar from "../adminSidebar";
import AdminNavBar from "../adminnavbar";
import 'react-quill/dist/quill.snow.css'
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import { useEffect } from "react";
import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import { URL } from '@/utility/api';

function UpdateNewsletter() {
    
    const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
        ssr: false,
        loading: () => <p>Loading ...</p>,
        })
        const router = useRouter()
        const id = router.query.id
        const [value, setValue] = useState('')
        const [data,setData]=useState({name:""})
        const [image, setImage] = useState()
        const [dataid, setdataid] = useState()
        const [categoryListing, setcategoryListing] = useState({})
        const [errors, setErrors] = useState({});
        const [userId, setuserId] = useState({});
        function handleChange(e, fieldsValue) {
            setImage(e.target.files[0]);
        }
       
        useEffect(()=>{ categoryList()
            setuserId( JSON.parse(window.localStorage.getItem("data")))
            getByid()
        },[])

        async function getByid () {
            axios.post(`${URL}BlogById`, { id: id,user_id:"" })
            .then(response => {
                setdataid(response.data.data.id)
                setData({name:response.data.data.title})
                setValue(response.data.data.paragraph)
                setImage(response.data.data.image)
            })
            .catch(error => {
                console.log(error);
            });
         }
      
        const categoryList = () => {
            axios.post(`${URL}dropdown`,{type:"news"})
                .then((response) => {
                    setcategoryListing(response.data.data)
                })
                .catch((error) => {
                    console.error(error);
                })
        }
        const submitForm = () => {
         
            if (!!userId==false){
               
            toast.error("login before submiting form")
            }
            else{
            if (validateForm(data)) {
                console.log("wewwwwwwwwwwwww")
                const FormData = require('form-data');
                let data1 = new FormData();
                data1.append('id', dataid);
                data1.append('title', data.name);
                data1.append('paragraph', value);
                data1.append('image',image)
    
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${URL}BlogUpdate`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data1
                };
                console.error("data",data)
                axios.request(config)
                    .then((response) => {
                        toast.success(response.data.message)
                        router.push('/admin/newsletter')
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }}
        }
        function validateForm(fieldsValue) {
            let fields = fieldsValue;
            let errors = {};
            let formIsValid = true;
            if (fields.name == "") {
                console.error("fields.name")
                formIsValid = false;
                errors.name = "*Please enter your name.";
            }
            // if (fields.url == "") {
            //     console.error("url")
            //     formIsValid = false;
            //     errors.url = "*Please enter your url.";
            // }
            // if (fields.category == "") {
            //     console.error("category")
            //     formIsValid = false;
            //     errors.category = "*Please enter your category.";
            // }
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
                    <h4> Update Newsletter</h4>
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
                                                    <label>News Title</label>
                                                    <input type="text" placeholder="Copy AI" value={data.name}
                                                    onChange={(e)=>setData({name:e.target.value,url:data.url,category:data.category})} 
                                                    />
                                                    <p>{errors.name}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Tool Description (Optional)</label>
                                        {/* <CKEditor
                                            editor={ClassicEditor}
                                            name="description"
                                        /> */}
                                        <QuillNoSSRWrapper  theme="snow" value={value} onChange={setValue}/>
                                        {/* <textarea onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: e.target.value, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })}></textarea> */}
                                    </div>
                                </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>upload Image</label>
                                                    <input type="file" name=""
                                                         onChange={(e, fields) => {
                                                        handleChange(e, fields)
                                                    }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button type="submit" className="theme-btn"
                                                     onClick={(e) => submitForm()}
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

export default UpdateNewsletter;