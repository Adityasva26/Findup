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
    const [category,setcategory] = useState([])
    const [userData, setuserData] = useState({});
    useEffect(()=>{
        setuserData(JSON.parse(window.localStorage.getItem('data')))
        newsAPI(JSON.parse(window.localStorage.getItem('data'))?.id)
    },[])
    const newsAPI = (e) => {
      
        axios.post(`${URL}newssdata`, { user_id: e })
            .then((response) => {
                setData(response.data.data)
                setcategory(response.data.CategoryList)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const newsbytime = (e,g) => {
      
        axios.post(`${URL}byTime`, { user_id: e ,sort:g})
            .then((response) => {
                setData(response.data.data)
                setcategory(response.data.CategoryList)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const newsbyCategory = (e,g) => {
       
        axios.post(`${URL}byCategory`, { user_id: e ,category:g})
            .then((response) => {
                setData(response.data.data)
                setcategory(response.data.CategoryList)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    const sorting = (e,g) => {
        axios.post(`${URL}newsSorting`, { user_id: e ,sort: e })
            .then((response) => {
                setData(response.data.data)
                setcategory(response.data.CategoryList)
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
    return (
        <>
            <Header />
            <div className="breadcums pt120 pb30">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">News</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="submit-form mt40 mb40">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="top-heading pb30">
                                <h3 className="font30 clr-white medium">Latest AI News | <span>All Time</span></h3>
                                <p>{data?.length} News.</p>
                                <div className="submit-btn">
                                    <Link href="/main/submitnews" className="theme-btn">Submit <i className="fas fa-plus"></i></Link>
                                </div>
                            </div>
                            <div className="filter-boxes">
                                <div className="filter-first">
                                    <div className="filter">
                                        <label>Filter By Time</label>
                                        <select onChange={(e)=>newsbytime(userData?.id,e.target.value)}>
                                            <option hidden>Filter By Time</option>
                                            <option value="Today">Today</option>
                                            <option value="Week">This Week</option>
                                            <option value="Month">This Month</option>
                                            <option value="All">All Time</option>
                                        </select>
                                    </div>
                                    <div className="filter second">
                                        <label>Filter By Category</label>
                                        <select onChange={(e)=>newsbyCategory(userData.id,e.target.value)}>
                                        <option hidden>Category</option>
                                            {category.map((value,index)=><option key={index} value={value.id}>{value.title}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="filter-second">
                                    <div className="filter">
                                        <label>Sort By</label>
                                        <select onChange={(e)=>sorting(e.target.value)}>
                                            <option hidden>Sort By</option>
                                            <option value="Verified">Verified</option>
                                            <option value="New">New</option>
                                            <option value="Popular">Popular</option>
                                        </select>
                                    </div>
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
            <Footer />
        </>
    );
}

export default News;