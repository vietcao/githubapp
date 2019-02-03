import React from 'react';
import { connect } from 'react-redux';

import {
    getUserDetails
} from '../../actions/app.action';

class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            details: {},
        }
    }

    componentDidMount() {
        let user = this.props.user;
        this.props.onGettingUserDetails(user.login).then(
            data => {
                const result = data.payload.result;
                if (result) {
                    data = result.data;
                    this.setState({
                        details: data,
                    })
                }
            }
        );
    }

    render() {
        let user = this.props.user;
        let details = this.state.details;

        return(
            <div className="row my-2 py-1 border-top border-bottom border-info" key={user.id}>
                <div className="col-4 col-sm-3 col-md-2">
                    <img className="img-fluid" src={user.avatar_url}/>
                </div>
                <div className="col-8 col-sm-6 col-md-8">
                    <p >{user.login}  <span className="font-weight-bold">{details.name}</span></p>
                    <p className="font-weight-light">Followers: {details.followers}</p>
                    <p className="font-weight-light">Following: {details.following}</p>
                </div>
                <div className="col-4 offset-4 col-sm-3 col-md-2 offset-sm-0 align-self-center">
                    <button className="btn btn-primary" onClick={e => this.props.onUserClick(e, user)}>Profile</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
});
  
const mapPropsToDispatch = dispatch => ({
    onGettingUserDetails: (username) => dispatch(getUserDetails(username)),
});


export default connect(mapStateToProps, mapPropsToDispatch)(Profile);

