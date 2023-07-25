import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";

// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import { URL } from '../../utility/api';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'


function SubmitTool() {
    const router = useRouter()
    const [value, setValue] = useState('')
   
    const [data, setData] = useState({ name: "", url: "", short_description: "", description: "", category: "", feature: "", pricing: "", price: "", association: true })
    const [image, setImage] = useState()
    const [categoryListing, setcategoryListing] = useState({})
    const [errors, setErrors] = useState({});
    var userId={}
    const QuillNoSSRWrapper = dynamic(async () => await import('react-quill'), {	
        ssr: false,
        loading: () => <p>Loading ...</p>,
        })
   
    useEffect(() => { categoryList() 
        
   userId = JSON.parse(window.localStorage.getItem("data"))
    }, [])
    function handleChange(e, fieldsValue) {
        setImage(e.target.files[0]);
    }
    const categoryList = () => {
        axios.post(`${URL}dropdown`,{type:"product"})
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
            console.error("fdgdgsdfgsd")
        // if (validateForm(data)) {
            
            const FormData = require('form-data');
            let data1 = new FormData();
            data1.append('title', data.name);
            data1.append('url', data.url);
            data1.append('category', data.category);
            data1.append('short_discription', data.short_description);
            data1.append('discription', value);
            data1.append('features', data.feature);
            data1.append('pricing_category', data.pricing);
            data1.append('price', data.price);
            data1.append('association', data.association);
            data1.append('image',image)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${URL}addproduct`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data1
            };

            axios.request(config)
                .then((response) => {
                    toast.success(response.data.message)
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
        if (fields.url == "") {
            formIsValid = false;
            errors.url = "*Please enter your url.";
        }
        if (fields.short_description == "") {
            formIsValid = false;
            errors.short_description = "*Please enter your short_description.";
        }
        if (fields.category == "") {
            formIsValid = false;
            errors.category = "*Please enter your category.";
        }
        if (fields.feature == "") {
            formIsValid = false;
            errors.feature = "*Please enter your feature.";
        }
        if (fields.pricing == "") {
            formIsValid = false;
            errors.pricing = "*Please enter your pricing.";
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
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Submit Tool</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="submit-form mt40 mb40">
            <div className="container">
                <div className="top-heading pb30">
                    <h3 className="font30 clr-white medium">Submit your tool. <span className="font16 clr-grey">It's free and takes less than a minute.</span></h3>
                    <p>We try to review all tools within 7 days and add it to the directory.</p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="inner-form">
                            {/* <form> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tool Name</label>
                                        <input type="text" placeholder="Copy AI" onChange={(e) => setData({ name: e.target.value, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                        <p>{errors.name}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Website URL</label>
                                        <input type="text" placeholder="https://copy.ai" onChange={(e) => setData({ name: data.name, url: e.target.value, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                        <p>{errors.url}</p>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Tool's short description (Optional)</label>
                                        <input type="text" placeholder="Please provide a short description" onChange={(e) => setData({ name: data.name, url: data.url, short_description: e.target.value, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                        <p>{errors.short_description}</p>
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
                                        <label>Select categories (max 3)</label>
                                        <select onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: e.target.value, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })}>
                                            {categoryListing?.Category?.map((e,index) => <option key={index} value={e.id}>{e.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Select features (optional)</label>
                                        <select onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: e.target.value, pricing: data.pricing, price: data.price, association: data.association })}>
                                            {categoryListing?.features?.map((e,index) => <option key={index} value={e.id}>{e.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Pricing - Select freemium if your tool has both paid and free versions</label>
                                        <select onChange={(e) => setData({ name: data.name, url: data.url, short_description:data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: e.target.value, price: data.price, association: data.association })}>
                                            {categoryListing?.pricings?.map((e,index) => <option key={index} value={e.id}>{e.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Starting Price (Optional)</label>
                                        <input type="text" name="" placeholder="$10/mo" onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: e.target.value, association: data.association })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>upload Image</label>
                                        <input type="file" name="" onChange={(e, fields) => {
                                            handleChange(e, fields)
                                        }} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group radio-cls">
                                        <h3>Are you associated with the product or company?</h3>
                                        <label htmlFor="first">
                                            <input type="radio" name="product_name" id="first" checked onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: true })} /> Yes
                                        </label>
                                        <label htmlFor="second">
                                            <input type="radio" name="product_name" id="second" onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: false })} /> No
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <button type="submit" className="theme-btn" onClick={(e) => submitForm()}>Submit</button>
                                    </div>
                                </div>
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default SubmitTool;