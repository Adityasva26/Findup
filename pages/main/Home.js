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
    var [feature, setFeatutre] = useState([]);
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
        axios.post(`${URL}home`, { user_id: e })
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
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
                console.log(response.data);
                setregexList(response.data.data)
            })
            .catch(error => {
                console.log(error);
            });
    }
    const favourite = (e, h, g) => {
        console.log("userData", userData)
        console.log("userId", g)
        if (g == undefined) {
            toast.error('Login before adding product to Favourite!');
        } else {
            axios.post(`${URL}Favourites`, {
                user_id: g,
                product_id: e,
                heart_status: h,
                type: "product"
            })
                .then(response => {
                    homeApi(g)
                    toast.success(response.data.message)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const filter = (e, g, h) => {
        setcategoryId(e)
        axios.post(`${URL}filter`, {
            category: e,
            pricing: pricing.length == 0 ? null : pricing,
            feature: feature.length == 0 ? null : feature,
        })
            .then(response => {
                setData(response.data)
                toast.success(response.data.message)
            })
            .catch(error => {
                console.log(error);
            });
    }
    const handleChecked = (e, g, h) => {
        console.log("e", e)
        console.log("g", g)
        console.log("h", h)

        if (g == "Pricing") {
            if (e == true) {
                pricing.push(h)
            }
            else {
                pricing = pricing.filter(item => item !== h);
            }
        }
        else if (g == "Features") {
            if (e == true) {
                feature.push(h)
            }
            else {
                feature = feature.filter(item => item !== h);
            }
        }
        console.log("pricing", pricing)
        console.log("feature", feature)
    }
    console.log(pricing.length + feature.length)
    return (<>
        <Header />

        <div class="top-section pt120 pb80">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="details text-center">
                            <h3 class="font60 clr-white">FUTUREPEDIA</h3>
                            <p class="clr-white font20">THE LARGEST AI TOOLS DIRECTORY, UPDATED DAILY</p>

                            <div class="tools-btn">
                                <a href="/main/todayTool" target="_blank" class="theme-btn">
                                    Tools Added Today <span class="numbers">{data?.todatproductcount}</span>
                                </a>
                                <a href="/main/todayNews" target="_blank" class="theme-btn second">
                                    News Added Today <span class="numbers">{data?.todaynewscount}</span>
                                </a>
                            </div>
                            <div class="search-form-box">
                                <div class="inner-form">
                                    <div class="search-box">
                                        <input type="text" id="search" placeholder="Search..." onChange={(e) => handleChange(e.target.value)} />
                                        <button type="submit"><i class="fas fa-search"></i></button>
                                        <div class="list-items">{regexList?.map((item) => <ul>
                                            <h6>{item?.heading}</h6>
                                            {item?.data?.map((value) =>
                                                <>{item.heading == "Tools" ? <li><a href={`/detailPage/${value?.id}`} target="_blank">{value?.title}</a></li> : <li><a onClick={(e) => filter(value.id)}>{value?.title}</a></li>}</>)}
                                        </ul>)}</div>

                                    </div>
                                    <div class="shot-by">
                                        <select>
                                            <option>Sort By</option>
                                            <option>Verified</option>
                                            <option>New</option>
                                            <option>Popular</option>
                                        </select>
                                    </div>
                                    <div class="fiter-box">
                                        <a onClick={handleShow} data-bs-toggle="modal" data-bs-target="#filtermodal"><i class="fas fa-filter"></i></a><span class="count">{pricing.length + feature.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="activity-sec mt50">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="heading text-center">
                            <h3 class="font35 clr-white">What Kind of Activity <span class="clr-red">do you Want to try?</span></h3>
                            <p>Discover best things to do restaurants, shopping, hotels, cafes and places aroundthe world by categories.</p>
                        </div>
                        <div class="categories-box">
                            <div class="owl-carousel owl-theme">
                                <Carousel breakPoints={breakPoints}>
                                    {data?.category?.map((item) => <div class="item">
                                        <div class="cat-name">
                                            <a href="#" onClick={(e) => filter(item.id)}>{item.title}</a>
                                        </div>
                                    </div>)}
                                </Carousel>
                            </div>
                        </div>
                        <div class="heading2 text-center">
                            <p class="font20 clr-lightgray medium"><a href="/main/ai_Tool_Category">All Category...</a></p>
                        </div>
                    </div>
                </div>
                <div class="row pt30">
                    {data?.data?.map((item) => <div class="col-lg-6">
                        <div class="main-box">
                            <div class="img">
                                <a href={`/detailPage/${item?.id}`} target="_blank" >
                                    <img src={item?.image} />
                                </a>
                            </div>
                            <div class="content">
                                <div class="top-text">
                                    <h3><a href="#">{item?.title} <span><i class="fas fa-check-circle"></i></span></a></h3>
                                    <div class="likes">
                                        <i class="fas fa-thumbs-up"></i> {item?.Favourites_count}
                                    </div>
                                </div>
                                <div class="detail">
                                    <p>{item?.short_discription}</p>
                                </div>
                                <div class="trial-btn">
                                    <a href="#"><i class="fas fa-lock"></i> {item?.pricing_category}</a>
                                </div>
                                <div class="tags">
                                    <a href="#">#Copywriting</a>
                                    <a href="#">#e-commerce</a>
                                </div>
                                <div class="save-btns">
                                    <a href={item?.url} target="_blank"><img src="img/web.png" /></a>
                                    {item?.HeartStatus == 0 ? <a onClick={() => favourite(item?.id, 1, userData?.id)}><img src="img/heart.png" /></a> : item?.heartStatus == 1 ? <a onClick={() => favourite(item?.id, 0, userData?.id)}><img src="img/heart-fill.png" /></a> : <a onClick={() => favourite(item?.id, 1, userData?.id)}><img src="img/heart.png" /></a>}
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Filters to Apply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data?.Filter?.map((item) => <div class="popup-filter">
                    <h3>{item.Header}</h3>
                    <div class="price-box">
                        {item.data.map((value) => <div class="inner">
                            <label for="free">
                                <input type="checkbox" name="free" id="free" onChange={(e) => handleChecked(e.target.checked, item.Header, value.id)} /><i class="far fa-check-circle"></i> {value.title}
                            </label>
                        </div>)}
                    </div>
                </div>)}
            </Modal.Body>
            <Modal.Footer>
                <button type="button" class="theme-btn first" data-bs-dismiss="modal">clear</button>
                <button type="button" class="theme-btn" onClick={() => filter(categoryId)}>Apply Filters</button>

            </Modal.Footer>
        </Modal>
        <Footer />
    </>);
}

export default HomePage;
