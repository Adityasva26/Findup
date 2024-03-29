import Header from "../main/header";
import Footer from "../main/footer";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { URL } from '../../utility/api';
import ReactHtmlParser from 'react-html-parser';

function BlogDetail() {   
	
	const [share, setShare] = useState("share-btn");
	
	const router = useRouter()
	const id = router.query.id
	const [data,setdata]=useState({})
     useEffect(()=>{getByid()},[id])
	 async function getByid () {
		axios.post(`${URL}BlogById`, { id: id })
		.then(response => {
			setdata(response.data)
		})
		.catch(error => {
			console.log(error);
		});
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
    <Header/>
    <div className="breadcums pt120 pb30">
		<div className="container">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><a href="#">Home</a></li>
					<li className="breadcrumb-item active" aria-current="page">Blog-details</li>
				</ol>
			</nav>
		</div>
	</div>

	<div className="activity-sec related Blog-details">
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="Blog-details-main">
						<div className="Blog-details-content">
							<p>Hey there, hope you all are having a fantastic weekend!</p>
							<p>{ReactHtmlParser(data?.data?.paragraph)}</p>	
							<p>We have added 219 new AI tools since our last issue. Here are some of the most interesting ones -</p>
						</div>

						<div className="ai-tools">
							<h3>AI Tools of the Week</h3>
							{data?.Products?.map((item,index)=><p><a key={index} href={`/detailPage/${item?._id}`}>{item.title} </a>- {item.short_discription}</p>)}
						</div>

						<div className="ai-tools">
							<h3>AI Image of the Week</h3>

							<div className="Blog-details-img">
								<img src={data?.data?.image}/>
							</div>
							<p>Mona Lisa as a modern woman</p>
								<p><a href="#">Source</a></p>
						</div>


						<div className="ai-tools news">
							<h3>AI News of the Week</h3>
							<p>Another fairly eventful week in AI. Here are the top news -</p>
							<h5 className="clr-white">1. Elon Musk announces a ChatGPT alternative, TruthGPT</h5>
							<p>Elon Musk revealed plans to develop his own chatbot called TruthGPT, which aims to be "a maximum truth-seeking AI." He intends to create an alternative to OpenAI and Google, expressing concerns over AI's potential for manipulating public opinion and causing civilizational destruction. Musk has reportedly recruited former DeepMind employee Igor Babuschkin for the project.Read Techcrunch article <span><a href="#"> Here</a></span></p>

							<h5 className="clr-white">2. AI-generated viral Drake and The Weeknd song gets taken down</h5>
							<p>An AI-generated song called "Heart on My Sleeve," which mimicked the voices of musicians Drake and The Weeknd, went viral before being taken down by Universal Music Group for copyright violations. The song had been streamed nearly 600,000 times on Spotify and received over 15 million views on TikTok before being removed from major platforms.Read more <span><a href="#"> Here</a></span></p>

							<h5 className="clr-white">3. Alphabet merges Google Brain and DeepMind into one division</h5>
							<p>Google has combined its two AI research units, Brain and DeepMind, to create Google DeepMind. The merger aims to speed up AI development and consolidate resources, with DeepMind co-founder and CEO Demis Hassabis leading the new unit. WSJ article <span><a href="#"> Here </a></span>and un-paywalled<span><a href="#"> Here</a></span></p>

							<h5 className="clr-white">4. Futurepedia Sponsorships open for May</h5>
							<p>We are already booked till Mid-May. If you'd like to sponsor us in the later half of next month, please book your slots now as they are filling up soon. You can see the details <span><a href="#"> Here</a></span> and make an enquiry by filling the form on the page.</p>

							<p>And that's a wrap for this week's newsletter!</p>
							<p>Hope you've enjoyed our roundup of the latest AI products and innovations.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    <Footer/>
    </> );
}

export default BlogDetail;