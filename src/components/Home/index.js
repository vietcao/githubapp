import React from 'react';
import { connect } from 'react-redux';

import { 
    getUsers,
    cleanUsers,
} from '../../actions/app.action';

import Loader from '../Common/Loader';
import Profile from '../Common/Profile';
import PaginationBar from './PaginationBar';
import User from '../User';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            typingStr: '',
            loading: false,
        }
    }

    componentDidMount() {
        let username = this.getParam(this.props.location.search, Home.USERNAME_QUERY, Home.USERNAME_DEFAULT);
        let page = this.getParam(this.props.location.search, Home.PAGE_QUERY, Home.PAGE_DEFAULT);
        this.doSearch(username, page);
        this.setState({
            typingStr: username
        });
    }

    componentDidUpdate(prevProps) {
        let username = this.getParam(this.props.location.search, Home.USERNAME_QUERY, Home.USERNAME_DEFAULT);
        let page = this.getParam(this.props.location.search, Home.PAGE_QUERY, Home.PAGE_DEFAULT);

        let oldUsername = this.getParam(prevProps.location.search, Home.USERNAME_QUERY, Home.USERNAME_DEFAULT);
        let oldPage = this.getParam(prevProps.location.search, Home.PAGE_QUERY, Home.PAGE_DEFAULT);

        if (username !== oldUsername || page !== oldPage) {
            this.doSearch(username, page);
            this.setState({
                typingStr: username
            })
        }
    }

    getParam = (search, name, defaultVal) => {
        let params = new URLSearchParams(search);
        let value = params.get(name);
        if (value === null) {
            return defaultVal;
        }
        return value;
    }

    redirectTo = (username, page) => {
        this.props.history.push({ pathname: '/', search: `${Home.USERNAME_QUERY}=${username}&${Home.PAGE_QUERY}=${page}` })
    }

    doSearch = (username, page) => {
        logger.debug('on doSearch');
        if (username === '') {
            this.props.onCleaningUsers();
        } else {
            this.setState({
                loading: true
            })
            this.props.onGettingUsers(username, page).then(
                data => {
                    this.setState({
                        loading: false
                    });
                }
            );
        }
    }

    handleSearchBtnClick = (e) => {
        logger.debug('search button clicked');
        if (this.state.typingStr == '') {
            this.props.onCleaningUsers();
            this.props.history.push({ pathname: '/'});
        } else {
            this.redirectTo(this.state.typingStr, Home.PAGE_DEFAULT);
        }
    }

    handleInputEnter = (e) => {
        logger.debug('on keydown');
        if (e.keyCode === 13) {
            if (this.state.typingStr == '') {
                this.props.onCleaningUsers();
                this.props.history.push({ pathname: '/'});
            } else {
                this.redirectTo(this.state.typingStr, Home.PAGE_DEFAULT);
            }
        }
    }

    handleInputChange = (e) => {
        logger.debug('input changed');
        this.setState({
            typingStr: e.target.value,
        })
    }

    handleUserClick = (e, user) => {
        logger.debug('user item clicked');
        logger.debug('user', user);
        this.props.history.push({ pathname: '/users', search: `username=${user.login}` });
    }

    handleGoToPageClick = (e, page)  => {
        logger.debug('on handleGoToPageClick');
        e.preventDefault();
        this.redirectTo(this.state.typingStr, page);
    }

    render() {
        let users = this.props.users;
        let page = this.getParam(this.props.location.search, Home.PAGE_QUERY, Home.PAGE_DEFAULT);
        let content;
        if (this.state.loading) {
            content = <Loader />
        } else {
            content = 
                <div>
                    {
                        users.map(user => {
                            return (<Profile key={user.login} user={user} onUserClick={this.handleUserClick} />)
                        })
                    }
                    <PaginationBar 
                        nextPage={this.props.nextPage}
                        prevPage={this.props.prevPage}
                        firstPage={this.props.firstPage}
                        lastPage={this.props.lastPage}
                        page={page}
                        onGoToPageClick={this.handleGoToPageClick}
                    />
                </div>
        }
        
        return (
            <div className="my-4">
                <div className="row my-2">
                    <div className="col-8">
                        <input 
                            className="form-control"
                            placeholder="username here..."
                            value={this.state.typingStr}
                            onChange={this.handleInputChange}
                            onKeyDown={this.handleInputEnter}
                        />
                    </div>
                    <div className="col-4">
                        <button className="btn btn-primary btn-block" onClick={this.handleSearchBtnClick}>Search</button>
                    </div>
                </div>
                <div>
                    {content}
                </div>
            </div>
        )
    }
}


Home.USERNAME_QUERY = 'username';
Home.PAGE_QUERY = 'page';
Home.USERNAME_DEFAULT = '';
Home.PAGE_DEFAULT = '1';

const mapStateToProps = state => ({
    users: state.app.users,
    nextPage: state.app.nextPage,
    prevPage: state.app.prevPage,
    firstPage: state.app.firstPage,
    lastPage: state.app.lastPage,
});
  
const mapPropsToDispatch = dispatch => ({
    onGettingUsers: (username, page) => dispatch(getUsers(username, page)),
    onCleaningUsers: () => dispatch(cleanUsers()),
});

  export default connect(mapStateToProps, mapPropsToDispatch)(Home);