import Header from "../main/header";
import Footer from "../main/footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { URL } from "../../utility/api";
import ReactHtmlParser from "react-html-parser";
import Modal from "react-bootstrap/Modal";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
function DetailPage() {
  const router = useRouter();
  const id = router.query.id;
  const [data, setdata] = useState({});
  const [userData, setuserData] = useState({});
  const [modle, setModle] = useState(0);
  const [share, setShare] = useState("share-btn");
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });
  useEffect(() => {
    setuserData(JSON.parse(window.localStorage.getItem("data")));
    getByid(id, JSON.parse(window.localStorage.getItem("data"))?.id);
  }, [id]);
  async function getByid(e, g) {
    axios
      .post(`${URL}productById`, { id: id, user_id: e })
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const favourite = (e, h, g) => {
    console.log("userData", userData);
    console.log("userId", g);
    if (g == undefined) {
      toast.error("Login before adding product to Favourite!");
    } else {
      axios
        .post(`${URL}Favourites`, {
          user_id: g,
          product_id: e,
          heart_status: h,
          type: "product",
        })
        .then((response) => {
          getByid(g);
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //  const simmilarfavourite = (e, h, g) => {
  //     console.log("userData", userData)
  //     console.log("userId", g)
  //     if (g == undefined) {
  //         toast.error('Login before adding product to Favourite!');
  //     } else {
  //         axios.post(`${process.env.URL}Favourites`, {
  //             user_id: g,
  //             product_id: e,
  //             heart_status: h,
  //             type: "product"
  //         })
  //             .then(response => {
  //                 getByid(g)
  //                 toast.success(response.data.message)
  //             })
  //             .catch(error => {
  //                 console.log(error);
  //             });
  //     }
  // }
  const ShareButton = () => {
    if (share == "share-btn") {
      setShare("share-btn socialopen");
    } else {
      setShare("share-btn");
    }
  };
  const handleModle = (e) => {
    if (userData == null) {
      toast.error("Login before ratting product!");
    } else {
    setModle(e);
    handleShow();
    }
  };
  console.log("userData",userData)
  const handleComment = () => {

    axios
      .post(`${URL}addComment`, {
        ratting: modle,
        comment: value,
        userId: userData.id,
        productId: data?.data?.id,
      })
      .then((response) => {
        toast.success(response.data.message);
        handleClose();
		setModle(0)
		getByid(userData.id)
      })
      .catch((error) => {
        console.error(error);
      });
    
  };
  return (
    <>
      <Header />
      <div class="breadcums pt120 pb30">
        <div class="container">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a href="#">{data?.data?.category}</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {data?.data?.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="details-informations  mb40">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="detail-img">
                <a href="#">
                  <img src={data?.data?.image} />
                  {/* <div class="visit-site">
								<h5>Visit Website</h5>
							</div> */}
                </a>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="top-details">
                <div class="left">
                  <h3>{data?.data?.title}</h3>
                  <a href={data?.data?.url} class="theme-btn">
                    Visit <i class="fas fa-link"></i>
                  </a>
                </div>
                <div class="right">
                  {data?.data?.heartStatus == 0 ? (
                    <a
                      href="#"
                      onClick={() => favourite(data?.data?.id, 1, userData?.id)}
                      class="like-btn"
                    >
                      <i class="far fa-thumbs-up"></i> 37
                    </a>
                  ) : data?.data?.heartStatus == 1 ? (
                    <a
                      href="#"
                      onClick={() => favourite(data?.data?.id, 0, userData?.id)}
                      class="like-btn"
                    >
                      <i class="fas fa-thumbs-up"></i> 37
                    </a>
                  ) : (
                    <a
                      href="#"
                      onClick={() => favourite(data?.data?.id, 1, userData?.id)}
                      class="like-btn"
                    >
                      <i class="far fa-thumbs-up"></i> 37
                    </a>
                  )}
                  <div class={share}>
                    <div class="shr-icon" onClick={() => ShareButton()}>
                      <i class="fas fa-share-alt"></i>
                    </div>
                    <div class="social">
                      <a
                        href={`https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`}
                        target="_blank"
                      >
                        <i class="fab fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="detail-content">
                <p>{data?.data?.short_discription}</p>
                <ul>
                 {data?.verified=="verifieds"? <li>
                    <i class="fas fa-check-circle"></i> This tool is verified
                    because it is either an established company, has good social
                    media presence or a distinctive use case
                  </li>:""}
                  <li>
                    <i class="fas fa-calendar"></i> Added on{" "}
                    {moment(data?.data?.created_at).format("MMMM d, YYYY")}
                  </li>
                </ul>
                <div class="paid-text">
                  <div class="txt">
                    <i class="fas fa-dollar-sign"></i>{" "}
                    {data?.data?.pricing_category}
                  </div>
                  <p>starts from ${data?.data?.price}/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="review-text mb40">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="dets">
                <div class="tool-name">
                  {ReactHtmlParser(data?.data?.discription)}
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="related-tages">
                <h4 class="clr-white font20">
                  Browse AI Tools Similar to AI Studios
                </h4>
                <ul>
                  <li>
                    <a href="/main/ai_Tool_Category">
                      Browse 47 AI video generator tools.
                    </a>
                  </li>
                  <li>
                    <a href="/main/ai_Tool_Category">
                      Browse 43 AI video editing tools.
                    </a>
                  </li>
                  <li>
                    <a href="/main/ai_Tool_Category">
                      Browse 11 AI personalized videos tools.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-text submit-form">
        <div class="container">
          <div class="row">
            <div class="new-boxes">
              <div class="inner-box rating">
                <div class="content">
                  <div class="left">
                    <h3 class="font18 clr-white d-block" style={{width:"100%", marginBottom:"10px"}}>What do you think about AI Roguelite ?</h3>
                    <p>Leave a review for the community</p>
                  </div>
                  <Stack spacing={1}>
              <Rating
                name="size-small"
                defaultValue={modle}
                size="small"
                onChange={(e) => handleModle(e.target.value)}
              />
            </Stack>
            
                </div>
           
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review-text average-rating">
        <div class="container">
          <div class="row">
            <h3 class="font18 clr-white mb20">Average Rating</h3>
            <Stack spacing={1}>
              <Rating
                name="size-small"
                defaultValue={modle}
                size="small"
                onChange={(e) => handleModle(e.target.value)}
              />
            </Stack>
            <span class="nub">3 Star</span>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="login_frm-cls rating">
        <Modal.Header closeButton>
          <Modal.Title>What do you think about {data?.data?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="row">
            <div class="col-md-12">
              <div class="inner-form">
                {/* <form> */}
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>What is your rating?</label>
                      <Stack spacing={1}>
                        <Rating
                          name="size-small"
                          defaultValue={modle}
                          size="small"
                          onChange={(e) => handleModle(e.target.value)}
                        />
                      </Stack>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>What is your review of the tool?</label>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={value}
                        onChange={setValue}
                      />
                      <p>
                        Your review will be submitted for approval and will be
                        visible to other users after it is approved. We do not
                        allow any profanity, promo links or impersonation. It
                        can take one to three business days for your review to
                        be approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="theme-btn first"
            data-bs-dismiss="modal"
            onClick={() => handleClear()}
          >
            Cancle
          </button>
          <button
            type="button"
            class="theme-btn"
            onClick={() => handleComment()}
          >
            Post Review {"->"}
          </button>
        </Modal.Footer>
      </Modal>
      <div class="submit-form mt40 mb40">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              {data?.commentList?.map((item) => (
                <div class="new-boxes">
                  <div class="inner-box rating">
                    <h3>
                      <p target="_blank">{ReactHtmlParser(item.comment)}</p>
                    </h3>
                    <div class="content">
                      <div class="left">
                        <div class="name">
                          <p>commented By -: {item.userName}</p>
                          <p class="time">
                            {moment(data?.created_at).fromNow()}
                          </p>
                        </div>
                      </div>
                      {/* <div class="right"> */}
					  <Stack spacing={1}>
                        <Rating
                          name="size-large"
                          defaultValue={Number(item.ratting)}
                          size="large"
						  readOnly 
                        />
                      </Stack>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div class="activity-sec related mt50">
        <div class="container">
          <h4 class="font30 medium clr-white mb20">
            Alternative AI Tools for AI Studios
          </h4>
          <div class="row">
            {data?.simmilarproduct?.map((item) => (
              <div class="col-lg-4">
                <div class="main-box">
                  <div class="img">
                    <a href="#">
                      <img src={item.image} />
                    </a>
                  </div>
                  <div class="content">
                    <div class="top-text">
                      <h3>
                        <a href="#">
                          {item.title}{" "}
                          {item?.verified=="verifieds"?<span><i class="fas fa-check-circle"></i></span>:""}
                        </a>
                      </h3>
                      <div class="likes">
                        <i class="fas fa-thumbs-up"></i> 37
                      </div>
                    </div>
                    <div class="detail">
                      <p>{item.description}</p>
                    </div>
                    <div class="trial-btn">
                      <a href="#">
                        <i class="fas fa-lock"></i> Free Trial
                      </a>
                    </div>
                    <div class="tags">
                      <a href="#">#Copywriting</a>
                      <a href="#">#e-commerce</a>
                    </div>
                    <div class="save-btns">
                      <a href="#">
                        <img src="../img/web.png" />
                      </a>
                      {item?.HeartStatus == 0 ? (
                        <a onClick={() => favourite(item?.id, 1, userData?.id)}>
                          <img src="../img/heart.png" />
                        </a>
                      ) : item?.heartStatus == 1 ? (
                        <a onClick={() => favourite(item?.id, 0, userData?.id)}>
                          <img src="../img/heart-fill.png" />
                        </a>
                      ) : (
                        <a onClick={() => favourite(item?.id, 1, userData?.id)}>
                          <img src="../img/heart.png" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailPage;
