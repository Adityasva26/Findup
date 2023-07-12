import Sidebar from "../adminSidebar";
import AdminNavBar from "../adminnavbar";
import axios from "axios";
import { useRouter } from 'next/router'
import { toast } from "react-toastify";
import { URL } from '@/utility/api';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react";


function updateProduct() {
    const router = useRouter()
    const id = router.query.id
    const [value, setValue] = useState('')

    const [data, setData] = useState({ name: "", url: "", short_description: "", description: "", category: "", feature: "", pricing: "", price: "", association: true })
    const [image, setImage] = useState()
    const [categoryListing, setcategoryListing] = useState({})
    const [errors, setErrors] = useState({});
    const [oldprofilephoto, setoldprofilephoto] = useState({});
    var userId={}
    const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
        ssr: false,
        loading: () => <p>Loading ...</p>,
        })
   
    useEffect(() => { categoryList() 
        
   userId = JSON.parse(window.localStorage.getItem("data"))
    }, [])
    useEffect(()=>{getByid()},[id])
    async function getByid () {
		axios.post(`${URL}productById`, { id: id,user_id:"" })
		.then(response => {
            setData({name:response.data.data.title,url:response.data.data.url,short_description:response.data.data.short_discription,description:response.data.data.discription,category:response.data.data.category,pricing:response.data.data.pricing_category,price:response.data.data.price,feature:response.data.data.features})
		    setValue(response.data.data.discription)
            setoldprofilephoto(response.data.data.image)
        })
		.catch(error => {
			console.log(error);
		});
	 }
    function handleChange(e, fieldsValue) {
        setImage(e.target.files[0]);
        // setoldprofilephoto(URL.createObjectURL(e.target.files[0]));
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
                url: `${URL}productUpdate`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: data1
            };

            axios.request(config)
                .then((response) => {
                    toast.success(response.data.message)
                    router.push('/admin/product')
                })
                .catch((error) => {
                    console.log(error);
                });
        }}
    // }
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


        <head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /></head>
        <div className="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper" class="bg-white" style={{ background: "#fff" }}>
                <AdminNavBar />
                <div class="user">
                    <h4> Update Product</h4>
                </div>
                <div className="container-fluid">
                    <div class="submit-form admn-form-cls mt40 mb40">
                        <div class="container">
                        <div class="row">
                    <div class="col-md-12">
                        <div class="inner-form">
                            {/* <form> */}
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Tool Name</label>
                                        <input type="text" placeholder="Copy AI" value={data.name} onChange={(e) => setData({ name: e.target.value, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                        <p>{errors.name}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Website URL</label>
                                        <input type="text" placeholder="https://copy.ai"  value={data.url} onChange={(e) => setData({ name: data.name, url: e.target.value, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                        <p>{errors.url}</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Tool's short description (Optional)</label>
                                        <input type="text" placeholder="Please provide a short description" value={data.short_description} onChange={(e) => setData({ name: data.name, url: data.url, short_description: e.target.value, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                        <p>{errors.short_description}</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Tool Description (Optional)</label>
                                        {/* <CKEditor
                                            editor={ClassicEditor}
                                            name="description"
                                        /> */}
                                        <QuillNoSSRWrapper  theme="snow" value={value} onChange={setValue}/>
                                        {/* <textarea onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: e.target.value, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })}></textarea> */}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Select categories (max 3)</label>
                                        <select value={data.category} onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: e.target.value, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })}>
                                            {categoryListing?.Category?.map((e) => <option value={e.id}>{e.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Select features (optional)</label>
                                        <select value={data.feature} onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: e.target.value, pricing: data.pricing, price: data.price, association: data.association })}>
                                            {categoryListing?.features?.map((e) => <option value={e.id}>{e.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Pricing - Select freemium if your tool has both paid and free versions</label>
                                        <select value={data.pricing} onChange={(e) => setData({ name: data.name, url: data.url, short_description:data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: e.target.value, price: data.price, association: data.association })}>
                                            {categoryListing?.pricings?.map((e) => <option value={e.id}>{e.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Starting Price (Optional)</label>
                                        <input type="text" value={data.price} name="" placeholder="$10/mo" onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: e.target.value, association: data.association })} />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>upload Image</label>
                                        <input type="file"  onChange={(e, fields) => {
                                            handleChange(e, fields)
                                        }} />
                                        {/* <img src={oldprofilephoto}/> */}
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group radio-cls">
                                        <h3>Are you associated with the product or company?</h3>
                                        <label for="first">
                                            <input type="radio" name="product_name" id="first" checked onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: true })} /> Yes
                                        </label>
                                        <label for="second">
                                            <input type="radio" name="product_name" id="second" onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: false })} /> No
                                        </label>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <button type="submit" class="theme-btn" onClick={(e) => submitForm()}>Submit</button>
                                    </div>
                                </div>
                            </div>
                            {/* </form> */}
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

export default updateProduct;