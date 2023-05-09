import Header from "./header";
import Footer from "./footer";
import { useEffect ,useState } from "react";
import axios from "axios";
import { URL } from '../../utility/api';
function AiToolProject() {
    const [data,setData]=useState([])
    useEffect(()=>{homeApi()},[])
    const homeApi = (e) => {  
        axios.get(`${URL}categoryList`)
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
                        <li class="breadcrumb-item active" aria-current="page">Categories</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="submit-form category-page mt40 mb40">
            <div class="container">

                <div class="row">
                    <div class="col-md-12">
                        <div class="top-heading pb30">
                            <h3 class="font30 clr-white medium">Category Listing<span></span></h3>
                            <p>Browse all categories at one glance.</p>
                           

                           <ul className="cat-list-cls">
                            {data?.map((item)=><li>{item.title}<span>1</span></li>)}
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>);
}

export default AiToolProject;