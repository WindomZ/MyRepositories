/**
 * Created by WindomZ on 2017/8/1.
 */
'use strict';

const axios = require('axios');
const atob = require('atob');

const config = require('../config');

module.exports = (query = '') => {
  return () => {
    return axios.post(
      `https://api.github.com/graphql`,
      { query },
      {
        withCredentials: false,
        responseType: 'json',
        headers: {
          Accept: 'application/json;charset=utf-8',
          Authorization: `bearer ${atob(config.github_token)}`,
        },
      }
    );
  };
};
