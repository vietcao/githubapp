import {
  USERS_GET,
  CURRENT_USER_GET,
  USER_DETAILS_GET,
  REPOS_GET,
  FOLLOWER_GET,
  FOLLOWING_GET,
  USERS_CLEAN,
} from '../constants/app.constant';

import { run } from './promise';
import { get } from '../utils/request';


export const getUsers = (username, page) => (
  run(
    USERS_GET,
    get('/search/users', {q: username, page: page})
  )
)

export const getUserDetails = (username) => (
  run(
    USER_DETAILS_GET,
    get('/users/' + username)
  )
)

export const getCurrentUser = (username) => (
  run(
    CURRENT_USER_GET,
    get('/users/' + username)
  )
)

export const getRepos = (username) => (
  run(
    REPOS_GET,
    get('/users/' + username + '/repos')
  )
)

export const getFollowers = (username) => (
  run(
    FOLLOWER_GET,
    get('/users/' + username + '/followers')
  )
)

export const getFollowings = (username) => (
  run(
    FOLLOWING_GET,
    get('/users/' + username + '/following')
  )
)

export const cleanUsers = () => ({
  type: USERS_CLEAN
});
