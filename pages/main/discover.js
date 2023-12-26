import Header from "../main/header";
import Footer from "../main/footer";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import moment from "moment/moment";
import { toast } from 'react-toastify';
import { URL } from '../../utility/api';
import ReactHtmlParser from 'react-html-parser';
function Discover() {

    const router = useRouter()
	const id = router.query.id
	const [data,setdata]=useState({})
	const [userData, setuserData] = useState({});
	const [share, setShare] = useState("share-btn");
	const [loading, setLoading] = useState(false);
     useEffect(()=>{getByid(JSON.parse(window.localStorage.getItem('data'))?.id)
	 setuserData(JSON.parse(window.localStorage.getItem('data')))
	},[])
	 async function getByid (e) {
		setLoading(true)
		axios.post(`${URL}discover`,{user_id:e})
		.then(response => {
			setLoading(false)
			setdata(response.data.data)
		})
		.catch(error => {
			setLoading(false)
			console.log(error);
		});
	 }

	 const favourite = (e,h,g) => {
     
       
        if (g == undefined) {
            toast.error('Login before adding product to Favourite!');
        }else{
           
            axios.post(`${URL}Favourites`, { user_id:g,
                product_id:e,
                heart_status:h,
                type:"product"})
            .then(response => {
                getByid(g)
                toast.success(response.data.message)
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
	const ShareButton=()=>{
		if(share=="share-btn"){
		 setShare("share-btn socialopen")
		}
		else{
		 setShare("share-btn")
		}
	 }
    return ( <>
   { loading?<div className="loader">
            <div className="inner"></div>
        </div>: <> <Header/>
    <div className="breadcums pt120 pb30">
		<div className="container">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link href="/">Home</Link></li>
					<li className="breadcrumb-item"><a href="#">Discover</a></li>
					<li className="breadcrumb-item active" aria-current="page">{data.title}</li>
				</ol>
			</nav>
		</div>
	</div>

	<div className="details-informations  mb40">
		<div className="container">
			<div className="row align-items-center">
				<div className="col-lg-6">
					<div className="detail-img">
						<a href="#">
							<img src={data.image} />
							{/* <div className="visit-site">
								<h5>Visit Website</h5>
							</div> */}
						</a>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="top-details">
						<div className="left">
							<h3>{data.title}</h3>
							<a href={data.url} className="theme-btn">Visit <i className="fas fa-link"></i></a>
						</div>
						<div className="right">
							{data.heart_status==1?<a href="#" onClick={() => favourite(data?.id,0,userData?.id,"product")} className="like-btn"><i className="fas fa-thumbs-up"></i>37</a>:<a href="#" onClick={() => favourite(data?.id,1,userData?.id,"product")} className="like-btn"><i className="far fa-thumbs-up"></i> 37</a>}
							<div className={share}>
                    <div className="shr-icon" onClick={() => ShareButton()}>
                      <i className="fas fa-share-alt"></i>
                    </div>
                    <div className="social">
                      <a
                        href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} target="_blank" >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href={`https://www.instagram.com/share?url=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} target="_blank" >
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} target="_blank" >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
						</div>
					</div>
					<div className="detail-content">
						<p>{data.short_discription}</p>
						<ul>
							<li>
								<i className="fas fa-check-circle"></i> This tool is verified because it is either an established company, has good social media presence or a distinctive use case
							</li>
							<li>
								<i className="fas fa-calendar"></i> Added on {moment(data.created_at).format('MMMM d, YYYY')}
							</li>
						</ul>
						<div className="paid-text">
							<div className="txt">
								<i className="fas fa-dollar-sign"></i> {data.pricing_category}
							</div>
							<p>starts from ${data.price}/mo</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div className="review-text mb40">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="dets">
						<div className="tool-name">
						{ReactHtmlParser(data?.data?.discription)}
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="related-tages">
						<h4 className="clr-white font20">Browse AI Tools Similar to AI Studios</h4>
						<ul>
							<li>
								<a href="#">Browse 47 AI video generator tools.</a>
							</li>
							<li>
								<a href="#">Browse 43 AI video editing tools.</a>
							</li>
							<li>
								<a href="#">Browse 11 AI personalized videos tools.</a>
							</li>
						</ul>
					</div>
				</div>
			</div> 
		</div>
	</div>

	<div className="activity-sec related mt50">
		<div className="container">
			<h4 className="font30 medium clr-white mb20">Alternative AI Tools for AI Studios</h4>
			<div className="row">
				<div className="col-lg-4">
					<div className="main-box">
						<div className="img">
							<a href="#">
								<img src="../img/img-1.jpg" />
							</a>
						</div>
						<div className="content">
							<div className="top-text">
								<h3><a href="#">Aidaptive <span><i className="fas fa-check-circle"></i></span></a></h3>
								<div className="likes">
									<i className="fas fa-thumbs-up"></i> 37
								</div>
							</div>
							<div className="detail">
								<p>Predictive personalization engines fore Commerce and Hospitality</p>
							</div>
							<div className="trial-btn">
								<a href="#"><i className="fas fa-lock"></i> Free Trial</a>
							</div>
							<div className="tags">
								<a href="#">#Copywriting</a>
								<a href="#">#e-commerce</a>
							</div>
							<div className="save-btns">
								<a href="#"><img src="../img/web.png" /></a>
								<a href="#"><img src="../img/heart.png" /></a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="main-box">
						<div className="img">
							<a href="#">
								<img src="../img/img-2.jpg" />
							</a>
						</div>
						<div className="content">
							<div className="top-text">
								<h3><a href="#">Cohesive <span><i className="fas fa-check-circle"></i></span></a></h3>
								<div className="likes">
									<i className="fas fa-thumbs-up"></i> 37
								</div>
							</div>
							<div className="detail">
								<p>Predictive personalization engines fore Commerce and Hospitality</p>
							</div>
							<div className="trial-btn">
								<a href="#"><i className="fas fa-lock"></i> Free Trial</a>
							</div>
							<div className="tags">
								<a href="#">#Copywriting</a>
								<a href="#">#e-commerce</a>
							</div>
							<div className="save-btns">
								<a href="#"><img src="../img/web.png" /></a>
								<a href="#"><img src="../img/heart.png" /></a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="main-box">
						<div className="img">
							<a href="#">
								<img src="../img/img-3.jpg" />
							</a>
						</div>
						<div className="content">
							<div className="top-text">
								<h3><a href="#">IngestAI <span><i className="fas fa-check-circle"></i></span></a></h3>
								<div className="likes">
									<i className="fas fa-thumbs-up"></i> 37
								</div>
							</div>
							<div className="detail">
								<p>Predictive personalization engines fore Commerce and Hospitality</p>
							</div>
							<div className="trial-btn">
								<a href="#"><i className="fas fa-lock"></i> Free Trial</a>
							</div>
							<div className="tags">
								<a href="#">#Copywriting</a>
								<a href="#">#e-commerce</a>
							</div>
							<div className="save-btns">
								<a href="#"><img src="../img/web.png" /></a>
								<a href="#"><img src="../img/heart.png" /></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <Footer/></>}
    </> );
}

export default Discover;