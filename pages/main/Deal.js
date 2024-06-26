import Header from "./header";
import Footer from "./footer";
import { useEffect ,useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import ReactHtmlParser from "react-html-parser";
import { URL } from '../../utility/api';
import Modal from 'react-bootstrap/Modal';

function Deal() {
    const [data,setData]=useState([])
    const [show, setShow] = useState(false);
    const [code, discountedCode] = useState('');
    const handleClose = () => setShow(false);
    useEffect(()=>{homeApi()},[])
    const homeApi = (e) => {  
        axios.get(`${URL}DealList`)
            .then((response) => {
              
                setData(response.data.data)
            })
            .catch((error) => {
                console.error(error);
            })
    }
    return (<>
        <Header />
        <div className="breadcums pt120 pb30">
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Deals</li>
                    </ol>
                </nav>
            </div>
        </div>

        <div className="activity-sec related Community">
            <div className="container">
                <div className="top-heading pb30">
                    <h3 className="font30 clr-white medium">Deals Archive.</h3>
                    <p>Check all the past Deals I have posted here.</p>
                </div>
                <div className="row">
                    {data?.map((item,index)=><div key={index} className="col-lg-4">
                        <div className="main-box">
                            <div className="img">
                                <a href={item.link} target="_blank">
                                    <img src={item?.image} />
                                </a>
                            </div>
                            <div className="content">
                                <div className="top-text">
                                    <h3><a href="#">{item?.title}</a></h3>
                                  
                                </div>
                                <div className="top-text">
                                <h5>{ReactHtmlParser(item?.paragraph)}</h5>
                                  
                                </div>
                                <div className="save-btns">
                                    <a href="#" onClick={()=>{setShow(true); discountedCode(item.discountCode)}}>{item?.price}</a>
                                    <a href="#">{item?.discountedPrice}</a>
                                    <a href="#"><p>{moment(item?.created_at).format('LL')}</p></a>
                                </div>
                            </div>
                        </div>
                    </div>)}

                   
                </div>
            </div>
        </div>
        <Footer />
        <Modal show={show} onHide={handleClose} className="login_frm-cls">
                <Modal.Header closeButton>
                    <Modal.Title> DiscountCode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
<h1>{code}</h1>
                </Modal.Body>
                </Modal>

    </>);
}

export default Deal;