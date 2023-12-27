import Sidebar from "../adminSidebar";
import AdminNavBar from "../adminnavbar";
import axios from "axios";
import { useRouter } from 'next/router'

import { URL } from '@/utility/api';
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import 'react-quill/dist/quill.snow.css';

// Import Quill dynamically to avoid SSR
const ReactQuill = dynamic(
    () =>
      new Promise((resolve) => {
        require.ensure([], (require) => {
          resolve(require('react-quill'));
        }, 'react-quill');
      }),
    { ssr: false }
  );
  

function TextEditor({ value, onChange }) {
    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ image: 'system' }],
        ],
    };

    const formats = [
        'header',
        'font',
        'list',
        'bold',
        'italic',
        'underline',
        'link',
        'image',
    ];

    return (
        <ReactQuill value={value} modules={modules} formats={formats} onChange={onChange} />
    );
}

function updateProduct() {
    const router = useRouter()
    const id = router.query.id
    const [value, setValue] = useState('')

    const [data, setData] = useState({ name: "", url: "", short_description: "", description: "", category: "", feature: "", pricing: "", price: "", association: true })
    const [image, setImage] = useState()
    const [categoryListing, setcategoryListing] = useState({})
    const [errors, setErrors] = useState({});
    const [productid, setproductId] = useState();
    const [oldprofilephoto, setoldprofilephoto] = useState({});
    var userId = {}
    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
    })

    useEffect(() => {
        categoryList()

        userId = JSON.parse(window.localStorage.getItem("adminData"))
    }, [])
    useEffect(() => { getByid() }, [id])
    async function getByid() {
        axios.post(`${URL}productforid`, { id: id, user_id: "" })
            .then(response => {
                setData({ name: response.data.data.title, url: response.data.data.url, short_description: response.data.data.short_discription, description: response.data.data.discription, category: response.data.data.category, pricing: response.data.data.pricing_category, price: response.data.data.price, feature: response.data.data.features , association:response.data.data.association})
                setproductId(response.data.data.id)
                setValue(response.data.data.discription)
                setImage(response.data.data.images)
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
        axios.post(`${URL}dropdown`, { type: "product" })
            .then((response) => {
                setcategoryListing(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const submitForm = () => {
        if (!!userId == false) {
            toast.error("login before submiting form")
        }
        else {


            if (validateForm(data)) {

            const FormData = require('form-data');
            let data1 = new FormData();
            data1.append('title', data.name);
            data1.append('id', productid);
            data1.append('url', data.url);
            data1.append('category', data.category);
            data1.append('short_discription', data.short_description);
            data1.append('discription', value);
            data1.append('features', data.feature);
            data1.append('pricing_category', data.pricing);
            data1.append('price', data.price);
            data1.append('association', data.association);
            data1.append('image', image)

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
                    toast.error(error)
                    console.log(error);
                });
        }
    }
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
        if (fields.short_description == "") {
            formIsValid = false;
            errors.short_description = "*Please enter your short_description.";
        }
        if (fields.category == "") {
            formIsValid = false;
            errors.category = "*Please enter your category.";
        }
        // if (fields.feature == "") {
        //     formIsValid = false;
        //     errors.feature = "*Please enter your feature.";
        // }
        // if (fields.pricing == "") {
        //     formIsValid = false;
        //     errors.pricing = "*Please enter your pricing.";
        // }
        // if (image == undefined) {
        //     formIsValid = false;
        //     errors.image = "*Please sellect your Image.";
        // }
        if (value == "") {
            formIsValid = false;
            errors.discription = "*Please enter your discription.";
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
                    <h4> Update Product</h4>
                </div>
                <div className="container-fluid">
                    <div className="submit-form admn-form-cls mt40 mb40">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="inner-form">
                                        {/* <form> */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Tool Name</label>
                                                    <input type="text" placeholder="Copy AI" onChange={(e) => setData({ name: e.target.value, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                                    <span style={{color:"red"}}>{errors.name}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Website URL</label>
                                                    <input type="text" placeholder="https://copy.ai" onChange={(e) => setData({ name: data.name, url: e.target.value, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                                    <span style={{color:"red"}}>{errors.url}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Tool's short description (Optional)</label>
                                                    <input type="text" placeholder="Please provide a short description" onChange={(e) => setData({ name: data.name, url: data.url, short_description: e.target.value, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })} />
                                                    <span style={{color:"red"}}>{errors.short_description}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Tool Description (Optional)</label>
                                                    {/* <CKEditor
                                            editor={ClassicEditor}
                                            name="description"
                                        /> */}
                                                    <TextEditor
                                                    theme="snow"
                                                        value={value}
                                                        onChange={setValue}
                                                    />
                                                      <span style={{color:"red"}}>{errors.discription}</span>
                                                    {/* <textarea onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: e.target.value, category: data.category, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })}></textarea> */}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select categories (max 3)</label>
                                                    <select onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: e.target.value, feature: data.feature, pricing: data.pricing, price: data.price, association: data.association })}>
                                                        {categoryListing?.Category?.map((e, index) => <option key={index} value={e.id}>{e.title}</option>)}
                                                    </select>
                
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Select features (optional)</label>
                                                    <select onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: e.target.value, pricing: data.pricing, price: data.price, association: data.association })}>
                                                        {categoryListing?.features?.map((e, index) => <option key={index} value={e.id}>{e.title}</option>)}
                                                    </select>
                           
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Pricing - Select freemium if your tool has both paid and free versions</label>
                                                    <select onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: e.target.value, price: data.price, association: data.association })}>
                                                        {categoryListing?.pricings?.map((e, index) => <option key={index} value={e.id}>{e.title}</option>)}
                                                    </select>
                                         
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Starting Price (Optional)</label>
                                                    <input type="text" name="" placeholder="$10/mo" onChange={(e) => setData({ name: data.name, url: data.url, short_description: data.short_description, description: data.description, category: data.category, feature: data.feature, pricing: data.pricing, price: e.target.value, association: data.association })} />
                                                </div>
                                                <span style={{color:"red"}}>{errors.url}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>upload Image</label>
                                                    <input type="file" name="" onChange={(e, fields) => {
                                                        handleChange(e, fields)
                                                    }} />
                                                      <span style={{color:"red"}}>{errors.image}</span>
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
                </div>
            </div>
        </div>
    </>);
}

export default updateProduct;