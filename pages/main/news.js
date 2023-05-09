import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { useState , useEffect } from "react";
import moment from "moment/moment";
import { toast } from 'react-toastify';
import Link from "next/link";
import { URL } from '../../utility/api';

function News() {
    const [data,setData] = useState([])
    const [userData, setuserData] = useState({});
    useEffect(()=>{
        setuserData(JSON.parse(window.localStorage.getItem('data')))
        newsAPI(JSON.parse(window.localStorage.getItem('data'))?.id)
    },[])
    const newsAPI = (e) => {
        console.log("e",e)
        axios.post(`${URL}newssdata`, { user_id: e })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    console.log("date",moment().startOf('day').fromNow())
    const favourite = (e,h,g) => {
        if (g == undefined) {
            toast.error('Login before adding product to Favourite!');
        }else{
            console.log("product_id",e)
            console.log("heart Status",h)
            console.log("userId",g)
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
    return (
        <>
            <Header />
            <div class="breadcums pt120 pb30">
                <div class="container">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">News</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div class="submit-form mt40 mb40">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="top-heading pb30">
                                <h3 class="font30 clr-white medium">Latest AI News | <span>All Time</span></h3>
                                <p>{data?.length} News.</p>
                                <div class="submit-btn">
                                    <Link href="/main/submitnews" class="theme-btn">Submit <i class="fas fa-plus"></i></Link>
                                </div>
                            </div>
                            <div class="filter-boxes">
                                <div class="filter-first">
                                    <div class="filter">
                                        <label>Filter By Time</label>
                                        <select>
                                            <option>Today</option>
                                            <option>This Week</option>
                                            <option>This Month</option>
                                            <option>All Time</option>
                                        </select>
                                    </div>
                                    <div class="filter second">
                                        <label>Filter By Category</label>
                                        <select>
                                            <option><i class="far fa-clipboard"></i> All</option>
                                            <option><i class="far fa-newspaper"></i> Updates</option>
                                            <option><i class="far fa-lightbulb"></i> Interesting</option>
                                            <option><i class="far fa-file-video"></i> Video</option>
                                            <option><i class="fas fa-podcast"></i> Podcast</option>
                                            <option><i class="fas fa-graduation-cap"></i> Learn</option>
                                            <option><i class="fas fa-microscope"></i> Research</option>
                                            <option><i class="fas fa-question-circle"></i> Opinion</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="filter-second">
                                    <div class="filter">
                                        <label>Sort By</label>
                                        <select>
                                            <option><i class="fas fa-star"></i> Featured</option>
                                            <option><i class="fas fa-clock"></i> New</option>
                                            <option><i class="fas fa-bookmark"></i> Popular</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                           {data.map((item) =><div class="new-boxes">
                                <div class="inner-box">
                                    <h3>
                                        <a href={item.url} target="_blank">{item.title}<span>{item.url}</span></a>
                                    </h3>
                                    <div class="content">
                                        <div class="left">
                                            <div class="name">
                                                <p>submitted by Community Member</p>
                                                <p class="time">{moment(data?.created_at).fromNow()}</p>
                                            </div>
                                            <div class="upadate">
                                                <span><i class="far fa-lightbulb"></i> Interesting</span>
                                            </div>
                                        </div>
                                        <div class="right">
                                        {item.HeartStatus==0?<button onClick={()=> favourite(item.id,1,userData?.id)}>
                                              <i class="far fa-heart"></i> {item?.Favourites_count}
                                                
                                            </button>:item.HeartStatus==1?
                                            <button onClick={()=> favourite(item.id,0,userData?.id)}>
                                            <i class='fas fa-heart'></i> {item?.Favourites_count}
                                              
                                          </button>:
                                          <button onClick={()=> favourite(item.id,1,userData?.id)}>
                                          <i class="far fa-heart"></i> {item?.Favourites_count}
                                            
                                        </button>}
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default News;