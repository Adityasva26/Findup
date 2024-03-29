import Header from "./header";
import Footer from "./footer";
// import { Carousel } from '@trendyol-js/react-carousel';
import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import { toast } from 'react-toastify';
import Carousel from "react-elastic-carousel";
import { URL } from '../../utility/api';
const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 991, itemsToShow: 6 },
    { width: 1200, itemsToShow: 6 },
];

// test
function HomePage() {
    const [data, setData] = useState({})
    const [show, setShow] = useState(false);
    const [regexList, setregexList] = useState([]);
    const [userData, setuserData] = useState({});
    const [categoryId, setcategoryId] = useState(null);
    var [pricing, setPricing] = useState([]);
    var checkbox = []
    var [feature, setFeatutre] = useState([]);
    const [loading, setLoading] = useState(false);
    // if (typeof window !== 'undefined') {
    //     var userdata = 
    // }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        setuserData(JSON?.parse(window.localStorage.getItem('data')))

        homeApi(JSON?.parse(window.localStorage.getItem('data'))?.id)
    }, [])

    const homeApi = (e) => {
        setLoading(true)
        axios.post(`${URL}home`, { user_id: e })
            .then((response) => {
                setLoading(false)
                setData(response.data)
            })
            .catch((error) => {
                setLoading(false)
                console.error(error);
            })
    }
    const sorting = (e) => {
        setLoading(true)
        axios.post(`${URL}sorting`, { sort: e })
            .then((response) => {
                setLoading(false)
                setData(response.data)
            })
            .catch((error) => {
                setLoading(false)
                console.error(error);
            })
    }
    const handleChange = (e) => {
        if (e != "") {
            regexAPi(e)
        }
        else {
            setregexList()
        }
    }
    const regexAPi = (e) => {
 
        axios.post(`${URL}RegexApi`, { title: e })
            .then(response => {

                setregexList(response.data.data)
            })
            .catch(error => {

                console.log(error);
            });
    }
    const favourite = (e, h, g) => {
        setLoading(true)

        if (g == undefined) {
            setLoading(false)
            toast.error('Login before adding product to Favourite!');
        } else {
            axios.post(`${URL}Favourites`, {
                user_id: g,
                product_id: e,
                heart_status: h,
                type: "product"
            })
                .then(response => {
                    setLoading(false)
                    homeApi(g)
                    toast.success(response.data.message)
                })
                .catch(error => {
                    setLoading(false)
                    console.log(error);
                });
        }
    }

    const filter = (e, g, h) => {
        setLoading(true)
        setcategoryId(e)
        axios.post(`${URL}filter`, {
            category: e,
            pricing: pricing.length == 0 ? null : pricing,
            feature: feature.length == 0 ? null : feature,
        })
            .then(response => {
                setregexList([])
                setLoading(false)
                setData(response.data)
                handleClose()
                toast.success(response.data.message)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
            });
    }
    const handleClear = () => {
        handleClose()
        setPricing([])
    }
    const handleChecked = (isChecked, category, id) => {
        console.log('Checkbox clicked:', isChecked, category, id);
    
        if (category === 'Pricing') {
          setPricing((prevPricing) =>
            isChecked ? [...prevPricing, id] : prevPricing.filter((item) => item !== id)
          );
        } else if (category === 'Features') {
            setFeatutre((prevFeature) =>
            isChecked ? [...prevFeature, id] : prevFeature.filter((item) => item !== id)
          );
        }
      };
  console.log(checkbox)
    return (<>
   { loading?<div className="loader">
            <div className="inner"></div>
        </div>: <>
        <Header />
        
        <div className="top-section pt120 pb80">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="details text-center">
                            {/* <h3 className="font60 clr-white">FINDUP.AI</h3> */}
                            <div className="inner-img">
                                <img src="../img/Logo-inner.png" />
                            </div>
                            <p className="clr-white font20">THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY</p>

                            <div className="tools-btn">
                                <a href="/main/todayTool" target="_blank" className="theme-btn">
                                    Tools Added Today <span className="numbers">{data?.todatproductcount}</span>
                                </a>
                                <a href="/main/todayNews" target="_blank" className="theme-btn second">
                                    News Added Today <span className="numbers">{data?.todaynewscount}</span>
                                </a>
                            </div>
                            <div className="search-form-box">
                                <div className="inner-form">
                                    <div className="search-box">
                                        <input type="text" id="search" placeholder="Search..." onChange={(e) => handleChange(e.target.value)} />
                                        <button type="submit"><i className="fas fa-search"></i></button>
                                        <div className="list-items">{regexList?.map((item, index) => <ul kry={index}>
                                            <h6>{item?.heading}</h6>
                                            {item?.data?.map((value, ineerindex) =>
                                                < >{item.heading == "Tools" ? <li key={ineerindex}><a href={`/detailPage/${value?.id}`} target="_blank">{value?.title}</a></li> : <li><a onClick={(e) => filter(value.id)}>{value?.title}</a></li>}</>)}
                                        </ul>)}</div>

                                    </div>
                                    <div className="shot-by">
                                        <select onChange={(e) => sorting(e.target.value)}>
                                            <option hidden>Sort By</option>
                                            <option value="Verified">Verified</option>
                                            <option value="New">New</option>
                                            <option value="Popular">Popular</option>
                                        </select>
                                    </div>
                                    <div className="fiter-box">
                                        <a onClick={handleShow} data-bs-toggle="modal" data-bs-target="#filtermodal"><i className="fas fa-filter"></i></a><span className="count">{pricing.length + feature.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="activity-sec mt50">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading text-center">
                            <h3 className="font35 clr-white">What Kind of Activity <span className="clr-red">do you Want to try?</span></h3>
                            <p>Discover best things to do restaurants, shopping, hotels, cafes and places aroundthe world by categories.</p>
                        </div>
                        <div className="categories-box">
                            <div className="owl-carousel owl-theme">
                                {data?.category && data.category.length > 0 && (
                                    <Carousel breakPoints={breakPoints}>
                                        {data.category.map((item, index) => (
                                            <div className="item" key={index}>
                                                <div className="cat-name">
                                                    <a href="#" onClick={(e) => filter(item.id)}>
                                                        {item.title}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                )}
                            </div>
                        </div>
                        <div className="heading2 text-center">
                            <p className="font20 clr-lightgray medium"><a href="/main/ai_Tool_Category">All Category...</a></p>
                        </div>
                    </div>
                </div>
                <div className="row pt30">
                    {data?.data?.map((item, index) => <div className="col-lg-6" key={index}>
                        <div className="main-box">
                            <div className="img">
                                <a href={`/detailPage/${item?.id}`} target="_blank" >
                                    <img src={item?.image} />
                                </a>
                            </div>
                            <div className="content">
                                <div className="top-text">
                                    <h3>  <a href={`/detailPage/${item?.id}`} target="_blank" >{item?.title} {item?.verified == "verifieds" ? <span><i className="fas fa-check-circle"></i></span> : ""}</a></h3>
                                    <div className="likes">
                                        <i className="fas fa-thumbs-up"></i> {item?.Favourites_count}
                                    </div>
                                </div>
                                <div className="detail">
                                    <p>{item?.short_discription}</p>
                                </div>
                                <div className="trial-btn">
                                    <a href="#"><i className="fas fa-lock"></i> {item?.pricing_category}</a>
                                </div>
                                <div className="tags">
                                    <a href="#">#Copywriting</a>
                                    <a href="#">#e-commerce</a>
                                </div>
                                <div className="save-btns">
                                    <a href={item?.url} target="_blank"><img src="img/web.png" /></a>
                                    {item?.HeartStatus == 0 ? <a onClick={() => favourite(item?.id, 1, userData?.id)}><img src="img/heart.png" /></a> : item?.heartStatus == 1 ? <a onClick={() => favourite(item?.id, 0, userData?.id)}><img src="img/heart-fill.png" /></a> : <a onClick={() => favourite(item?.id, 1, userData?.id)}><img src="img/heart.png" /></a>}
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose} className="login_frm-cls">
            <Modal.Header closeButton>
                <Modal.Title>Select Filters to Apply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data?.Filter?.map((item, index) => <div className="popup-filter" key={index}>
                    <h3>{item.Header}</h3>
                    <div className="price-box">
                        {item.data.map((value, index) => <div className="inner" key={index}>
                            <label htmlFor={value.id}>
                                <input type="checkbox" name="free" id={value.id} checked={
                      item.Header === 'Pricing'
                        ? pricing.includes(value.id)
                        : item.Header === 'Features'
                        ? feature.includes(value.id)
                        : false
                    } onChange={(e) => handleChecked(e.target.checked, item.Header, value.id)} /><i className="far fa-check-circle"></i> {value.title}
                            </label>
                        </div>)}
                    </div>
                </div>)}
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="theme-btn first" data-bs-dismiss="modal" onClick={() => handleClear()}>clear</button>
                <button type="button" className="theme-btn" onClick={() => filter(categoryId)}>Apply Filters</button>

            </Modal.Footer>
        </Modal>
        <Footer />
    </>}
    </>
    );
}

export default HomePage;
