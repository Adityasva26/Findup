import Header from "./header";
import Footer from "./footer";
import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment/moment";
import { URL } from '../../utility/api';
import { toast } from 'react-toastify';

function TodayTool() {
    const [userData, setuserData] = useState({});
    const [data, setData] = useState({})
    useEffect(() => {
        setuserData(JSON.parse(window.localStorage.getItem('data')))
        todaytoolFunction(JSON.parse(window.localStorage.getItem('data'))?.id)
    }, [])
    const todaytoolFunction = (e) => {
        axios.post(`${URL}todayTools`, { user_id: e })
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const favourite = (e, h, g) => {
     
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
                    todaytoolFunction(g)
                    toast.success(response.data.message)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    return ( <>
    <Header/>
    <div className="breadcums pt120 pb30">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Todays Product</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="activity-sec ">
            <div className="container">
            <div className="top-heading pb30">
            <div className="submit-btn">
                                    <Link href="/main/submitnews" className="theme-btn">Submit <i className="fas fa-plus"></i></Link>
                                </div>
                                <h3 className="font30 clr-white medium"> <span>{moment(new Date()).format('LL')}</span></h3>
                                <p>{data?.data?.length} AI tools added today.</p>
                                
                            </div>
            <div className="row pt30">
                    {data?.data?.map((item) => <div className="col-lg-6">
                        <div className="main-box">
                            <div className="img">
                                <a href={`/detailPage/${item?.id}`} target="_blank" >
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
                                    <a href="#"><i className="fas fa-lock"></i> {item?.pricing_category}</a>
                                </div>
                                <div className="tags">
                                    <a href="#">#Copywriting</a>
                                    <a href="#">#e-commerce</a>
                                </div>
                                <div className="save-btns">
                                    <a href={item?.url} target="_blank"><img src="../img/web.png" /></a>
                                    {item?.HeartStatus == 0 ? <a onClick={() => favourite(item?.id, 1, userData?.id)}><img src="../img/heart.png" /></a> : item?.heartStatus == 1 ? <a onClick={() => favourite(item?.id, 0, userData?.id)}><img src="../img/heart-fill.png" /></a> : <a onClick={() => favourite(item?.id, 1, userData?.id)}><img src="../img/heart.png" /></a>}
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    <Footer/>
    </> );
}

export default TodayTool;