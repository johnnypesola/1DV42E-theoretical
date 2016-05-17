'use strict';

/* Services */

var services = angular.module('AngularVSReactServices', ['ngResource']);

services.factory('BlogPost', ['$resource',
  function($resource){
    return $resource('app/data/:count-blog-posts.json', {}, {
      query: {method:'GET', params:{count:'1000'}, isArray:true},
      get: {method:'GET', params:{count:'1'}, isArray:false}
    });
  }]);
