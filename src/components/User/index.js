import React from 'react';
import { connect } from 'react-redux';

import {
    getCurrentUser,
    getRepos,
    getFollowers,
    getFollowings,
    cleanUsers,
 } from '../../actions/app.action';

 import Profile from '../Common/Profile';
 import DetailsBox from './DetailsBox';
 import ReposItem from './ReposItem';


class User extends React.Component {

    constructor() {
        super();
        this.state =  {
            groupView: User.groupView.REPOS
        };
    }

    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);
        let username = this.getParam(this.props.location.search, User.USERNAME_QUERY, User.USERNAME_DEFAULT);
        if (username === User.USERNAME_DEFAULT) {
            this.props.onCleaningUsers();
            this.props.history.push({ pathname : '/'});
            return;
        }
        logger.debug('username', username);
        this.loadUserDetails(username);
    }

    componentDidUpdate(prevProps) {
        let username = this.getParam(this.props.location.search, User.USERNAME_QUERY);
        let oldUsername = this.getParam(prevProps.location.search, User.USERNAME_QUERY);
        if (oldUsername !== username) {
            this.loadUserDetails(username);
        }
    }

    getParam = (search, name, defaultVal = null) => {
        let params = new URLSearchParams(search);
        let value = params.get(name);
        if (value === null) {
            return defaultVal;
        }
        return value;
    }

    loadUserDetails = (username) => {
        logger.debug('on loadUserDetails');
        this.props.onGettingCurrentUser(username);
        this.props.onGettingUserRepos(username);
        this.props.onGettingUserFollowers(username);
        this.props.onGettingUserFollowings(username);
        window.scrollTo(0, 0);
        this.setState({
            groupView: User.groupView.REPOS
        });
    }

    handleUserClick = (e, user) => {
        logger.debug('on handleUserClick');
        this.props.history.push({ pathname: '/users', search: `username=${user.login}` });
    }

    handleChangeGroupView = (e, view) => {
        logger.debug('on handleChangeGroupView', view);
        e.preventDefault();
        this.setState({
            groupView: view
        });
    }

    renderJsonParsed = (currentUser) => {
        let entries = Object.entries(currentUser).map(
            ([key, value]) => {
                return (
                    <p className="text-truncate">
                        {key} : {value}
                    </p>
                )
            }
        )
        return entries;
    }

    render() {
        let currentUser = this.props.currentUser;
        let currentUserRepos = this.props.currentUserRepos;
        let currentUserFollowers = this.props.currentUserFollowers;
        let currentUserFollowings = this.props.currentUserFollowings;

        let repoEls = currentUserRepos.map(repo => {
            return <ReposItem key={repo.id} repo={repo}/>
        });

        let followerEls = currentUserFollowers.map(follower => {
            return <Profile key={follower.login} user={follower} onUserClick={this.handleUserClick}/>
        })

        let followingEls = currentUserFollowings.map(following => {
            return <Profile key={following.login} user={following} onUserClick={this.handleUserClick}/>
        });

        return (
            <div>
                <div className="border border-secondary my-3 p-3">
                    <div className="row">
                        <div className="col-sm-4 col-md-3">
                            <img className="img-fluid" src={currentUser.avatar_url} />
                            <div className="text-center text-primary mt-2">
                                <h3>{currentUser.login}</h3>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-9">
                            <DetailsBox user={currentUser}/>
                        </div>
                    </div>
                </div>
                
                <div>            
                    <div className="btn-group" role="group">
                        <button 
                            className={this.state.groupView == User.groupView.REPOS ? 'btn btn-secondary' : 'btn btn-secondary active'}
                            onClick={e => this.handleChangeGroupView(e, User.groupView.REPOS)}>
                                Repositories
                        </button>
                        <button
                            className={this.state.groupView == User.groupView.FOLLOWER ? 'btn btn-secondary' : 'btn btn-secondary active'}
                            onClick={e => this.handleChangeGroupView(e, User.groupView.FOLLOWER)}>
                                Followers
                        </button>
                        <button
                            className={this.state.groupView == User.groupView.FOLLOWING ? 'btn btn-secondary' : 'btn btn-secondary active'}
                            onClick={e => this.handleChangeGroupView(e, User.groupView.FOLLOWING)}>
                                Following
                        </button>
                    </div>

                    <div className={this.state.groupView == User.groupView.REPOS ? '' : 'd-none'}>
                        {repoEls}
                    </div>
                    <div className={this.state.groupView == User.groupView.FOLLOWER ? '' : 'd-none'}>
                        {followerEls}
                    </div>
                    <div className={this.state.groupView == User.groupView.FOLLOWING ? '' : 'd-none'}> 
                        {followingEls}
                    </div>
                </div>
            </div>
        )
    }
}


User.groupView = {
    REPOS: 'repos',
    FOLLOWER: 'follower',
    FOLLOWING: 'fllowing',
}

User.USERNAME_QUERY = 'username';

User.USERNAME_DEFAULT = '';

const mapStateToProps = state => ({
    currentUser: state.app.currentUser,
    currentUserRepos: state.app.currentUserRepos,
    currentUserFollowers: state.app.currentUserFollowers,
    currentUserFollowings: state.app.currentUserFollowings
});
  
const mapPropsToDispatch = dispatch => ({
    onGettingCurrentUser: (username) => dispatch(getCurrentUser(username)),
    onGettingUserRepos: (username) => dispatch(getRepos(username)),
    onGettingUserFollowers: (username) => dispatch(getFollowers(username)),
    onGettingUserFollowings: (username) => dispatch(getFollowings(username)),
    onCleaningUsers: () => dispatch(cleanUsers()),
});
  
  export default connect(mapStateToProps, mapPropsToDispatch)(User);