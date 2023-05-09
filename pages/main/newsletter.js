import Header from "./header";
import Footer from "./footer";
import { useEffect ,useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { URL } from '../../utility/api';

function NewsLetter() {
    const [data,setData]=useState([])
    useEffect(()=>{homeApi()},[])
    const homeApi = (e) => {  
        axios.get(`${URL}BlogList`)
            .then((response) => {
                console.log(response.data)
                setData(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    return (<>
        <Header />
        <div class="breadcums pt120 pb30">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Newsletter Issues</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div class="activity-sec related Community">
            <div class="container">
                <div class="top-heading pb30">
                    <h3 class="font30 clr-white medium">Newsletter Archive.</h3>
                    <p>Read all the past newsletters I have sent here.</p>
                </div>
                <div class="row">
                    {data?.map((item)=><div class="col-lg-4">
                        <div class="main-box">
                            <div class="img">
                                <a href={`/blogDetail/${item?.id}`} target="_blank">
                                    <img src={item?.image} />
                                </a>
                            </div>
                            <div class="content">
                                <div class="top-text">
                                    <h3><a href="#">{item?.title}</a></h3>
                                </div>
                                <div class="save-btns">
                                    <a href="#"><img src="../img/web.png" /></a>
                                    <a href="#"><p>{moment(item?.created_at).format('LL')}</p></a>
                                </div>
                            </div>
                        </div>
                    </div>)}

                   
                </div>
            </div>
        </div>
        <Footer />

    </>);
}

export default NewsLetter;