import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { fetchUser } from 'Actions';
import { connect } from 'react-redux';
import LoadingSpinner from 'LoadingSpinner';
import StoreSettingsContainer from 'StoreSettingsContainer';

class UserDashboardContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userLoaded: false
		};
	}

	componentWillMount() {
		if (!this.props.activeUser) {

			this.props.fetchUser(this.props.params.userId).then(() => {
				this.setState({
					userLoaded: true
				});
			});

		} else {

			this.setState({
				userLoaded: true
			});

		}
	}


	render() {

		const { activeUser } = this.props;

		if (!this.state.userLoaded) {
			return <LoadingSpinner />;
		} else {

			return (
				<div id="userProfile">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-12">
								<div className="panel panel-default">
									<div className="panel-heading"><h3 className="text-center">Admin Profile</h3></div>

										<div className="table-responsive">
											<table className="table">
												<tbody>
													<tr>
														<th>Full Name</th>
														<th>Company</th>
														<th>Email</th>
														<th>User ID</th>
														<th>Address</th>
														<th>Admin Status</th>
													</tr>
													<tr>
														<td>{activeUser.profile.name}</td>
														<td>{activeUser.company}</td>
														<td>{activeUser.email}</td>
														<td>{activeUser._id}</td>
														<td>{activeUser.address}</td>
														<td>{activeUser.admin ? 'Administrator' : 'Clerical'}</td>
													</tr>
												</tbody>
											</table>
										</div>

									</div>
								</div>
							</div>

							<StoreSettingsContainer/>

						</div>
					</div>
			);
		}


	}

}



function mapStateToProps(state) {
	return { activeUser: state.user.activeUser,
					 tax: state.cart.tax
				 };
}


export default connect(mapStateToProps, { fetchUser })(UserDashboardContainer);
