import {
    USERS_GET,
    CURRENT_USER_GET,
    REPOS_GET,
    FOLLOWER_GET,
    FOLLOWING_GET,
    USERS_CLEAN,
} from '../constants/app.constant';

import parser from 'parse-link-header';

import { PROMISE_RUN } from '../constants/promise.constant';

import defaultState from '../store/defaultState';


export default (state = defaultState.app, action) => {
    if (action.type == PROMISE_RUN) {
        if (action.key === USERS_GET) {
        const result = action.payload.result;
        if (result) {
            // Parse link header data.
            const linkHeader = result.linkHeader;
            let nextPage = null;
            let prevPage = null;
            let firstPage = null;
            let lastPage = null;
            if (linkHeader !== null) {
                let parsedObj = parser(linkHeader);
                if (parsedObj.hasOwnProperty('next')) {
                    nextPage = parsedObj.next.page;
                }
                if (parsedObj.hasOwnProperty('prev')) {
                    prevPage = parsedObj.prev.page;
                }
                if (parsedObj.hasOwnProperty('last')) {
                    lastPage = parsedObj.last.page;
                }
                if (parsedObj.hasOwnProperty('first')) {
                    firstPage = parsedObj.first.page;
                }
            }
            // 
            const data = result.data;
            return {...state, 
                users: data.items,
                nextPage: nextPage,
                prevPage: prevPage,
                firstPage: firstPage,
                lastPage: lastPage,
            }
        }
        }

        if (action.key == CURRENT_USER_GET) {
        const result = action.payload.result;
        if (result) {
            const data = result.data;
            return {...state, currentUser: data}
        }
        }

        if (action.key == REPOS_GET) {
        const result = action.payload.result;
        if (result) {
            const data = result.data;
            return {...state, currentUserRepos: data}
        }
        }
        
        if (action.key == FOLLOWER_GET) {
        const result = action.payload.result;
        if (result) {
            const data = result.data;
            return {...state, currentUserFollowers: data}
        }
        }

        if (action.key == FOLLOWING_GET) {
        const result = action.payload.result;
        if (result) {
            const data = result.data;
            return {...state, currentUserFollowings: data}
        }
        }

    }

    if (action.type == USERS_CLEAN) {
        return {...state,
        users: [],
        nextPage: null,
        prevPage: null,
        firstPage: null,
        lastPage: null,
        }
    }


    return state;
};
