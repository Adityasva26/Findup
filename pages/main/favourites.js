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
    console.log("userData",userData)
    return (<>
        <Header />
        <div class="breadcums pt120 pb30">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Favourites</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="favourites mt40 mb40">
            <div class="container">
                <div class="top-heading pb30">
                    <h3 class="font30 clr-white medium">Your Favorites.</h3>
                    <p>These are the tools and posts you have favourited. You can remove them from your favourites by clicking the bookmark icon.</p>
                </div>

               { userData!=null?<div class="row">
                    <div class="col-md-12">
                        <div class="favourites-inner">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class={`nav-link ${toggleclass?.a}`} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"  onClick={() => handleToggle("product","active","")}>TOOLS</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class={`nav-link ${toggleclass?.b}`} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => handleToggle("news","","active")}>NEWS</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                               { toggle=="product"?
                               <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <div class="activity-sec related mt50">
                                        <p>8 tools favourited</p>
                                        <div class="row">
                                            {data?.map((item)=><>{item.type=="product"&&<div class="col-lg-4">
                                                <div class="main-box">
                                                    <div class="img">
                                                        <a href="#">
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
                                                            <a href="#"><i class="fas fa-lock"></i> Free Trial</a>
                                                        </div>
                                                        <div class="tags">
                                                            <a href="#">#Copywriting</a>
                                                            <a href="#">#e-commerce</a>
                                                        </div>
                                                        <div class="save-btns">
                                                            <a href={item?.url} target="_blank"><img src="../img/web.png" /></a>
                                                            <a onClick={() => favourite(item?.id,0,userData?.id,"product")}><img src="../img/heart-fill.png" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}</>)}
                                         
                                        </div>
                                    </div>

                                </div>:
                                <div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <div class="submit-form mt20 mb20">
                                        <p>5 news favourited</p>
                                        <div class="row">
                                        {data?.map((item)=><>{item.type=="news"&&<div class="col-md-12">
                                                <div class="new-boxes">
                                                    <div class="inner-box">
                                                        <h3>
                                                            <a href="#">{item.title} <span>{item.url}</span><i class="fas fa-external-link-alt"></i></a>
                                                        </h3>
                                                        <div class="content">
                                                            <div class="left">
                                                                <div class="name">
                                                                    <p>submitted by Community Member</p>
                                                                    <p class="time">12 hours ago</p>
                                                                </div>
                                                                <div class="upadate">
                                                                    <span><i class="far fa-lightbulb"></i> Interesting</span>
                                                                </div>
                                                            </div>
                                                            <div class="right">
                                                                <button>
                                                                <a onClick={() => favourite(item?.id,0,userData?.id,"news")}><i class="fas fa-heart"></i></a> 0
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