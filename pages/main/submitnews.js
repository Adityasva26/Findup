import Header from "./header";
import Footer from "./footer";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import { useEffect } from "react";
import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import { URL } from '../../utility/api';

function SubmitNews() {
    const router = useRouter()
    const [data,setData]=useState({name:"",url:"",category:""})
    const [image, setImage] = useState()
    const [categoryListing, setcategoryListing] = useState({})
    const [errors, setErrors] = useState({});
    const [userId, setuserId] = useState({});
    function handleChange(e, fieldsValue) {
        setImage(e.target.files[0]);
    }
   
    useEffect(()=>{ categoryList()
        setuserId( JSON.parse(window.localStorage.getItem("data")))
    },[])
  
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
            console.error("wewwwwwwwwwwwww")
            const FormData = require('form-data');
            let data1 = new FormData();
            data1.append('title', data.name);
            data1.append('url', data.url);
            data1.append('category', data.category);
            data1.append('image',image)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${URL}addnews`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data1
            };
            console.error("data",data)
            axios.request(config)
                .then((response) => {
                    toast.success(response.data.message)
                    router.push('/main/news')
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
        if (fields.url == "") {
            console.error("url")
            formIsValid = false;
            errors.url = "*Please enter your url.";
        }
        if (fields.category == "") {
            console.error("category")
            formIsValid = false;
            errors.category = "*Please enter your category.";
        }
        setErrors(errors);
        return formIsValid;
    }
    return (<>
        <Header />
        <div className="breadcums pt120 pb30">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Submit News</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="submit-form mt40 mb40">
            <div className="container">
                <div className="top-heading pb30">
                    <h3 className="font30 clr-white medium">Submit News. </h3>
                    <p>Once approved, your submission will be added to the feed.</p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-form">
                          
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>News Title</label>
                                            <input type="text" placeholder="Copy AI" onChange={(e)=>setData({name:e.target.value,url:data.url,category:data.category})} />
                                            <p>{errors.name}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>News URL</label>
                                            <input type="text" placeholder="https://copy.ai" onChange={(e)=>setData({name:data.name,url:e.target.value,category:data.category})} />
                                            <p>{errors.url}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Select categories (max 3)</label>
                                            <select onChange={(e)=>setData({name:data.name,url:data.url,category:e.target.value})}>
                                                {categoryListing?.Category?.map((item,index)=><option key={index} value={item.id}>{item.title}</option>)}
                                                <p>{errors.category}</p>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>upload Image</label>
                                            <input type="file" name="" onChange={(e, fields) => {
                                            handleChange(e, fields)
                                        }}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <button type="submit" className="theme-btn" onClick={(e) => submitForm()}>Submit</button>
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

export default SubmitNews;