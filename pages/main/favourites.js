import Header from "./header";
import Footer from "./footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import Link from "next/link";
import { URL } from '../../utility/api';
function Favourites() {
    const [toggle, settoggle] = useState("product")
    const [data, setData] = useState([])
    const [userData, setuserData] = useState({});
    const [toggleclass, setToggleclass] = useState({a:"active",b:""});

    useEffect(()=>{favouritesdata(JSON.parse(window.localStorage.getItem('data'))?.id)
    setuserData(JSON.parse(window.localStorage.getItem('data')))
},[])
    const favouritesdata = (e) => {
        axios.post(`${URL}favouritesList`, { id: e })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const favourite = (e,h,g,d) => {
        if (g == undefined) {
            toast.error('Login before adding product to Favourite!');
        }else{
            axios.post(`${URL}Favourites`, { user_id:g,
                product_id:e,
                heart_status:h,
                type:d})
            .then(response => {
                favouritesdata(g)
                toast.success(response.data.message)
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    const handleToggle = (e,g,h) => {
        settoggle(e)
        setToggleclass({a:g,b:h})  
    }

    return (<>
        <Header />
        <div className="breadcums pt120 pb30">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Favourites</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="favourites mt40 mb40">
            <div className="container">
                <div className="top-heading pb30">
                    <h3 className="font30 clr-white medium">Your Favorites.</h3>
                    <p>These are the tools and posts you have favourited. You can remove them from your favourites by clicking the bookmark icon.</p>
                </div>

               { userData!=null?<div className="row">
                    <div className="col-md-12">
                        <div className="favourites-inner">
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${toggleclass?.a}`} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"  onClick={() => handleToggle("product","active","")}>TOOLS</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${toggleclass?.b}`} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => handleToggle("news","","active")}>NEWS</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                               { toggle=="product"?
                               <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div className="activity-sec related mt50">
                                        <p>8 tools favourited</p>
                                        <div className="row">
                                            {data?.map((item)=><>{item.type=="product"&&<div className="col-lg-4">
                                                <div className="main-box">
                                                    <div className="img">
                                                        <a href="#">
                                                            <img src={item?.image} />
                                                        </a>
                                                    </div>
                                                    <div className="content">
                                                        <div className="top-text">
                                                            <h3><a href="#">{item?.title} <span><i className="fas fa-check-circle"></i></span></a></h3>
                                                            <div className="likes">
                                                                <i className="fas fa-thumbs-up"></i> {item?.Favourites_count}
                                                            </div>
                                                        </div>
                                                        <div className="detail">
                                                            <p>{item?.short_discription}</p>
                                                        </div>
                                                        <div className="trial-btn">
                                                            <a href="#"><i className="fas fa-lock"></i> Free Trial</a>
                                                        </div>
                                                        <div className="tags">
                                                            <a href="#">#Copywriting</a>
                                                            <a href="#">#e-commerce</a>
                                                        </div>
                                                        <div className="save-btns">
                                                            <a href={item?.url} target="_blank"><img src="../img/web.png" /></a>
                                                            <a onClick={() => favourite(item?.id,0,userData?.id,"product")}><img src="../img/heart-fill.png" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}</>)}
                                         
                                        </div>
                                    </div>

                                </div>:
                                <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div className="submit-form mt20 mb20">
                                        <p>5 news favourited</p>
                                        <div className="row">
                                        {data?.map((item)=><>{item.type=="news"&&<div className="col-md-12">
                                                <div className="new-boxes">
                                                    <div className="inner-box">
                                                        <h3>
                                                            <a href="#">{item.title} <span>{item.url}</span><i className="fas fa-external-link-alt"></i></a>
                                                        </h3>
                                                        <div className="content">
                                                            <div className="left">
                                                                <div className="name">
                                                                    <p>submitted by Community Member</p>
                                                                    <p className="time">12 hours ago</p>
                                                                </div>
                                                                <div className="upadate">
                                                                    <span><i className="far fa-lightbulb"></i> Interesting</span>
                                                                </div>
                                                            </div>
                                                            <div className="right">
                                                                <button>
                                                                <a onClick={() => favourite(item?.id,0,userData?.id,"news")}><i className="fas fa-heart"></i></a> 0
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}</>)}
                                        </div>
                                    </div>


                                </div>}
                            </div>
                        </div>
                    </div>
                </div>:<h3 className="font20 clr-white text-center">Please sign up or login to view your favourited AI tools and posts.</h3>}
            </div>
        </div>
        <Footer />
    </>);
}

export default Favourites;