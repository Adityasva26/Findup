import Link from "next/link";

function Footer() {
    return ( 
        <footer>
		<div className="top-footer">
			<div className="container">
				<div className="row">
					<div className="col-md-5">
						<div className="footer-logo">
							<Link href="/">
								<img src="../img/Logo.png"/>
							</Link>
						</div>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
						<div className="social-icon">
							<a href="https://www.facebook.com/findupai">
								<i className="fab fa-facebook-f"></i>
							</a>
							<a href="https://twitter.com/Findupai">
								<i className="fab fa-twitter"></i>
							</a>
							<a href="https://www.instagram.com/findupai/">
								<i className="fab fa-instagram"></i>
							</a>
							<a href="https://www.linkedin.com/company/findup-ai/">
								<i className="fab fa-linkedin-in"></i>
							</a>
						</div>
					</div>
					<div className="col-md-3">
						<div className="links">
							<h3>Quick Links</h3>
							<ul>
								<li>
									<a href="/main/sponsor" >Sponsor Us</a>
								</li>
								<li>
									<a href="/main/privacyPolicy" >Privacy Policy</a>
								</li>
								<li>
									<a href="/main/termandservice" >Terms of Services</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-4">
						<div className="information">
							<h3>Contact Us</h3>
							<div className="address">
								2/63 Dixon St, Haymarket NSW 2000 Australia
							</div>
							<ul>
								<li>
									<a href="#"><i className="far fa-envelope"></i> info@demo.com</a>
								</li>
								<li>
									<a href="#"><i className="fas fa-phone-alt"></i> +91 92129 92129</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="copywrite text-center pt20 pb20">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h3 className="font17 clr-white">Copyright © 2023 - Demo</h3>
					</div>
				</div>
			</div>
		</div>
	</footer>
     );
}

export default Footer;