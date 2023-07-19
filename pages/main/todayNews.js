import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useState , useEffect } from "react";
import { toast } from 'react-toastify';
import Link from "next/link";
import moment from "moment/moment";
import { URL } from '../../utility/api';

function TodayNews() {
    const [data,setData] = useState([])
    const [userData, setuserData] = useState({});
    useEffect(()=>{
        setuserData(JSON.parse(window.localStorage.getItem('data')))
        newsAPI(JSON.parse(window.localStorage.getItem('data'))?.id)
    },[])
    const newsAPI = (e) => {
      
        axios.post(`${URL}todaynews`, { user_id: e })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }
  
    const favourite = (e,h,g) => {
        if (g == undefined) {
            toast.error('Login before adding product to Favourite!');
        }else{
       
            axios.post(`${URL}Favourites`, { user_id:g,
                product_id:e,
                heart_status:h,
                type:"news"})
            .then(response => {
                newsAPI(g)
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
                        <li className="breadcrumb-item active" aria-current="page">Newsletter Issues</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div className="submit-form mt40 mb40">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="top-heading pb30">
                                <h3 className="font30 clr-white medium"><span>{moment(new Date()).format('LL')}</span></h3>
                                <p>{data?.length} AI news added today.</p>
                                <div className="submit-btn">
                                    <Link href="/main/submitnews" className="theme-btn">Submit <i className="fas fa-plus"></i></Link>
                                </div>
                            </div>
                           
                           {data.map((item) =><div className="new-boxes">
                                <div className="inner-box">
                                    <h3>
                                        <a href={item.url} target="_blank">{item.title}<span>{item.url}</span></a>
                                    </h3>
                                    <div className="content">
                                        <div className="left">
                                            <div className="name">
                                                <p>submitted by Community Member</p>
                                                <p className="time">{moment(data?.created_at).fromNow()}</p>
                                            </div>
                                            <div className="upadate">
                                                <span><i className="far fa-lightbulb"></i> Interesting</span>
                                            </div>
                                        </div>
                                        <div className="right">
                                        {item.HeartStatus==0?<button onClick={()=> favourite(item.id,1,userData?.id)}>
                                              <i className="far fa-heart"></i> {item?.Favourites_count}
                                                
                                            </button>:item.HeartStatus==1?
                                            <button onClick={()=> favourite(item.id,0,userData?.id)}>
                                            <i className='fas fa-heart'></i> {item?.Favourites_count}
                                              
                                          </button>:
                                          <button onClick={()=> favourite(item.id,1,userData?.id)}>
                                          <i className="far fa-heart"></i> {item?.Favourites_count}
                                            
                                        </button>}
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
    <Footer/>
    </> );
}

export default TodayNews;