#!/usr/bin/env node
/**
 * Created by WindomZ on 2017/8/1.
 */
'use strict';

const User = require('../lib/github/user');

let user = new User();
user
  .repositories()
  .then(r => {
    console.log('totalCount: %f', r.totalCount);
    console.log('totalDiskUsage: %f', r.totalDiskUsage);
    console.log('nodes.length: %f', r.nodes.length);
    console.log('nodes[0]: %j', r.nodes[0]);
  })
  .catch(e => console.error(e));
