import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import NoMatch from './Common/NoMatch';
import Home from './Home/index';
import User from './User/index';

class App extends React.Component {
    render() {
        return (
                <Router forceRefresh={false}>
                    <div>
                        <Link to="/"><h3>Github app</h3></Link>
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            <Route path="/users" component={User}></Route>
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </Router>
        )
    }
}

App.propTypes = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

