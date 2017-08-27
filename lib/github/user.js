/**
 * Created by WindomZ on 2017/8/1.
 */
'use strict';

const graphql = require('../graphql');

// @see https://developer.github.com/v4/reference/object/user/
class User {
  async repositories(
    repositories = {
      totalCount: 0,
      totalDiskUsage: 0,
      nodes: [],
    },
    endCursor
  ) {
    endCursor = endCursor ? 'after:"' + endCursor + '"' : '';
    const response = await graphql(`
        query {
          viewer {
            repositories(privacy:PUBLIC first:100 ${endCursor}){
              totalCount totalDiskUsage
              nodes{
                name url description isFork diskUsage createdAt updatedAt
                owner{
                  login
                }
                watchers(first:0){
                  totalCount
                }
                forks(first:0){
                  totalCount
                }
                stargazers(first:0){
                  totalCount
                }
                primaryLanguage{
                  color name
                }
                languages(first:20){
                  totalCount
                  nodes{
                    color name
                  }
                }
              }
              pageInfo{
                startCursor
                endCursor
                hasNextPage
              }
            }
          }
        }
      `)();

    const {
      pageInfo,
      totalCount,
      totalDiskUsage,
    } = response.data.data.viewer.repositories;
    repositories.totalCount = totalCount;
    repositories.totalDiskUsage = totalDiskUsage;
    repositories.nodes = repositories.nodes.concat(
      response.data.data.viewer.repositories.nodes
    );

    console.log('pageInfo:%j', pageInfo);
    // 继续获取下一页
    if (pageInfo.hasNextPage === true) {
      // return await this.repositories(repositories, pageInfo.endCursor);
    }
    return repositories;
  }
}

module.exports = User;
