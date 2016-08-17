import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class LandingPage extends Component {

	componentWillMount() {
		// if the user is authenticated (has JWT in localStorage)
		// then push to '/userProfile' route.
		if (this.props.authenticated) {
			browserHistory.push(`/userProfile`);
		}
	}

	render() {
		return (
			<div id="landingPage">







				<div className="header">
					<div className="container">
						<div className="row">

							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 wow fadeInLeft">

								<h1>Point of Sale</h1>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut dolor vel sapien feugiat lacinia. In et felis turpis. Sed ac erat ut libero volutpat condimentum. Pellentesque ut dolor vel sapien feugiat lacinia. In et felis turpis. Sed ac erat ut libero volutpat condimentum.</p>
								<p>Pellentesque ut dolor vel sapien feugiat lacinia. In et felis turpis. Sed ac erat ut libero volutpat condimentum.</p>

							</div>

							<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 wow fadeInRight" align="center">

								<img className="img-responsive" src="../../images/spilled_bottle.png"/>

							</div>

						</div>
					</div>
				</div>











				<div className="about" id="about">
					<div className="container">

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<h1 className="wow fadeIn" data-wow-delay="0.4s">'THIS APP WILL HELP YOU CONNECT WITH PEOPLE AND SHARE EXPERIENCES LIKE NO OTHER'</h1>
								<p className="wow fadeIn" data-wow-delay="0.8s"><em>Mauris tempor vulputate dolor,
									nec convallis turpis luctus quis. Morbi id justo vel diam dignissim commodo.
									Aenean id luctus libero, vel gravida magna. Vestibulum ac purus lobortis,
									varius tellus non, rhoncus sapien. Mauris elementum, nisl sed interdum venenatis,
									metus enim pellentesque massa, eget laoreet eros ex vitae felis.
									Curabitur vitae rhoncus odio, sit amet porta tortor. Duis in mollis odio.</em></p>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<h1>WHO WE ARE...</h1>
								<p>A brief introduction:</p>
							</div>
						</div>

						<div className="row">

							<div className="col-lg-4 col-md-4 wow fadeIn" data-wow-delay="0.3s">
								<img src="../../images/face1.jpg" className="img-circle" />
								<blockquote><p><em>"Ei saperet facilis fuisset mea. Malis evertitur sea in, eu mea tota nusquam."<footer>J.Doe - Founder.</footer></em></p></blockquote>
							</div>

							<div className="col-lg-4 col-md-4 wow fadeIn" data-wow-delay="0.5s">
								<img src="../../images/face2.jpg" className="img-circle" />
								<blockquote><p><em>"Ei saperet facilis fuisset mea. Malis evertitur sea in, eu mea tota nusquam."<footer>J.Doe - Designer.</footer></em></p></blockquote>
							</div>

							<div className="col-lg-4 col-md-4 wow fadeIn" data-wow-delay="0.7s">
								<img src="../../images/face3.jpg" className="img-circle" />
								<blockquote><p><em>"Ei saperet facilis fuisset mea. Malis evertitur sea in, eu mea tota nusquam."<footer>J.Doe - Marketing.</footer></em></p></blockquote>
							</div>

						</div>

					</div>
				</div>

















				<div className="features" id="features">
					<div className="container">

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<h1>FEATURES</h1>
								<p>See how awesome our app is, with a list of its finest features....</p>
							</div>
						</div>

						<div className="row">

							<div className="col-lg-4 col-md-4 wow bounceInLeft">
								<i className="fa fa-cloud-upload fa-3x"></i>
								<h4>Sync All Devices</h4>
								<p>This app will sync all of your information across all your devices with just one single login.</p>

								<i className="fa fa-map-pin fa-3x"></i>
								<h4>Location Services</h4>
								<p>Share your location with your friends so you can keep in touch, no matter where you are.</p>

								<i className="fa fa-battery-full fa-3x"></i>
								<h4>Conserve Battery Life</h4>
								<p>Low level battery usage will ensure that the app will not run down your battery, even when the app is running in the background.</p>
							</div>

							<div className="col-lg-4 col-md-4 wow fadeIn" data-wow-delay="0.2s" align="center">
								<img className="img-responsive" src="../../images/iphonescreen.png"/>
							</div>

							<div className="col-lg-4 col-md-4 wow bounceInRight">
								<i className="fa fa-share-square-o fa-3x"></i>
								<h4>Share with Friends</h4>
								<p>Send your best posts or latest gossip to friends with the quick share button.</p>

								<i className="fa fa-film fa-3x"></i>
								<h4>Stream on the go</h4>
								<p>Download your videos to your device or stream video with superfast 4g data.</p>

								<i className="fa fa-safari fa-3x"></i>
								<h4>Cross Browser</h4>
								<p>Log into your desktop site and view your feed and videos on any browser at any time, even share links direct from your profile on the web.</p>
							</div>

						</div>

					</div>
				</div>







				<div className="press" id="press">
					<div className="container">

						<div className="row">
							<div className="col-lg-12 col-md-12">

								<h1>PRESS COVERAGE</h1>
								<p>We have been lucky to be featured in the following:</p>

							</div>
						</div>

						<div className="row">
							<div className="col-lg-12 col-md-12">

								<ul className="press-logo list-inline">

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/cnn.png"/></a></li>

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/wired.png"/></a></li>

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/kickstarter.png"/></a></li>

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/bbc.png"/></a></li>

								</ul>

								<ul className="press-logo list-inline">

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/verge.png"/></a></li>

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/guardian.png"/></a></li>

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/techradar.png"/></a></li>

									<li className="col-lg-3 col-md-3 col-sm-3 col-xs-6"><a href="#">
									<img className="img-responsive" src="../../images/logos/telegraph.png"/></a></li>

								</ul>


							</div>
						</div>

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<p>If you would like to contact our press team, then please do so on <a href="mailto:marcushurney@gmail.com"></a></p>
							</div>
						</div>

					</div>
				</div>









				<div className="screenshots" id="screenshots">
					<div className="container">

						<div className="row">
							<div className="col-lg-12 col-md-12">

								<h1>TAKE A LOOK</h1>
								<p>View some of the screenshots from our recent update, now available to download....</p>

							</div>
						</div>

						<div className="row">
							<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 wow flipInY" data-wow-delay="0.2s">
								<img className="img-responsive" src="../../images/screenshots/profile-home.jpg"/>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 wow flipInY" data-wow-delay="0.3s">
								<img className="img-responsive" src="../../images/screenshots/Photostream.jpg"/>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 wow flipInY" data-wow-delay="0.4s">
								<img className="img-responsive" src="../../images/screenshots/messenger-overview.jpg"/>
							</div>
							<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 wow flipInY" data-wow-delay="0.5s">
								<img className="img-responsive" src="../../images/screenshots/weather.jpg"/>
							</div>
						</div>

					</div>
				</div>










				<div className="reviews" id="reviews">
		      <div className="container">

		        <div className="row">
		          <div className="col-lg-12 col-md-12">
		            <h1>REVIEWS</h1>
		            <p>Read what our loyal customers have to say about us...</p>
		          </div>
		        </div>

		        <div className="row">

		          <div className="col-lg-4 col-md-4">
		            <blockquote>
		              <p>This is easily the greatest app I've ever used!<footer>A.N Other <cite>London, UK</cite></footer></p>
		            </blockquote>
		          </div>

		          <div className="col-lg-4 col-md-4">
		            <blockquote>
		              <p>This is a must buy for an optimized work flow.<footer>A.N Other <cite>NY, USA</cite></footer></p>
		            </blockquote>
		          </div>

		          <div className="col-lg-4 col-md-4">
		            <blockquote>
		              <p>I haven't stopped using this app since I bought it!<footer>A.N Other <cite>Sydney, AUS</cite></footer></p>
		            </blockquote>
		          </div>

		        </div>

		        <div className="row">
		          <div className="bigQuote col-lg-12 col-md-12">
		            <blockquote>
		              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <footer>A.N Other <cite>Paris, FR</cite></footer></p>
		            </blockquote>
		          </div>
		        </div>

		      </div>
		    </div>







				<div className="contact" id="contact">
					<div className="container">

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<h1>CONTACT US:</h1>
								<p>Connect with us via</p>
								<ul className="list-inline">
									<li className="wow fadeIn" data-wow-delay="0.2s"><a href="http://www.flickr.com" target="blank"><i className="fa fa-flickr fa-4x"></i></a></li>
									<li className="wow fadeIn" data-wow-delay="0.3s"><a href="http://www.facebook.com" target="blank"><i className="fa fa-facebook-official fa-4x"></i></a></li>
									<li className="wow fadeIn" data-wow-delay="0.4s"><a href="http://www.twitter.com" target="blank"><i className="fa fa-twitter-square fa-4x"></i></a></li>
									<li className="wow fadeIn" data-wow-delay="0.4s"><a href="http://www.instagram.com" target="blank"><i className="fa fa-instagram fa-4x"></i></a></li>
									<li className="wow fadeIn" data-wow-delay="0.3s"><a href="http://www.linkedin.com" target="blank"><i className="fa fa-linkedin-square fa-4x"></i></a></li>
									<li className="wow fadeIn" data-wow-delay="0.2s"><a href="http://www.pinterest.com" target="blank"><i className="fa fa-pinterest-square fa-4x"></i></a></li>
								</ul>
							</div>
						</div>

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<p>Or contact us on the following:</p>
								<ul className="list-inline">
									<li><i className="fa fa-map-marker"></i>Address line 1, Address line 2, Country, Postcode, Country</li>
									<li><i className="fa fa-phone"></i>1-800-888-0000</li>
									<li><i className="fa fa-envelope"></i><a href="mailto:info@appname.com">info@appname.com</a></li>
								</ul>
							</div>
						</div>

					</div>

				</div>










				<div className="footer">

		      <div className="container">

		        <div className="row">

		          <div className="col-lg-4 col-md-4">
		            <h1>LOGO</h1>
		            <p>Since 2015</p>
		            <p><em>'Delivering apps for low cost and maximum fun'</em></p>
		          </div>

		          <div className="col-lg-4 col-md-4">
		            <h1>GET IN TOUCH</h1>
		            <p><i className="fa fa-phone"></i>1-800-888-0000</p>
		            <p><i className="fa fa-envelope"></i><a href="mailto:info@appname.com">info@appname.com</a></p>
		          </div>

		          <div className="col-lg-4 col-md-4">
		            <h1>ABOUT US:</h1>
		            <p>'Delivering apps for low cost and maximum fun'</p>
		            <p>Company name &copy; 2015</p>
		          </div>

		        </div>

		      </div>

		    </div>




			</div>


		);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.user.authenticated };
}

export default connect(mapStateToProps, null)(LandingPage);
