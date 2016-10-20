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

				<div className="features" id="features">
					<div className="container">

						<div className="row">
							<div className="col-lg-12 col-md-12">
								<h1>Point of Sale System</h1>
								<p>This app was built for pharmacies in Vietnam and Indonesia.
								   Its purpose is to help pharmacies manage their inventories and sales
									 digitally instead of through the current pen and paper.
								</p>
							</div>
						</div>

						<div className="row">

							<div className="col-lg-4 col-md-4 wow bounceInLeft">
								<i className="fa fa-user-md fa-3x"></i>
								<h4 className="lightOrange">Add Employees</h4>
								<p>This app will sync all of your information across all your devices with just one single login.</p>

								<i className="fa fa-tags fa-3x"></i>
								<h4 className="lightOrange">Add Products</h4>
								<p>Share your location with your friends so you can keep in touch, no matter where you are.</p>

								<i className="fa fa-battery-full fa-3x"></i>
								<h4 className="lightOrange">Make Sales</h4>
								<p>Low level battery usage will ensure that the app will not run down your battery, even when the app is running in the background.</p>
							</div>

							<div className="col-lg-4 col-md-4 wow fadeIn" data-wow-delay="0.2s" align="center">
								<img className="img-responsive" src="../../images/spilled_bottle.png"/>
							</div>

							<div className="col-lg-4 col-md-4 wow bounceInRight">
								<i className="fa fa-share-square-o fa-3x"></i>
								<h4 className="lightOrange">Manage Inventory</h4>
								<p>Send your best posts or latest gossip to friends with the quick share button.</p>

								<i className="fa fa-film fa-3x"></i>
								<h4 className="lightOrange">Track Sales</h4>
								<p>Download your videos to your device or stream video with superfast 4g data.</p>

								<i className="fa fa-money fa-3x"></i>
								<h4 className="lightOrange">Maximize Profits</h4>
								<p>Log into your desktop site and view your feed and videos on any browser at any time, even share links direct from your profile on the web.</p>
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
