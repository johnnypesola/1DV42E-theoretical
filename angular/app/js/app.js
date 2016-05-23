var AngularVSReact = angular.module('AngularVSReact', [
  'ngRoute',
  'AngularVSReactServices'
]);

AngularVSReact.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/templates/blog.html',
        controller: 'BlogCtrl'
      }).
      when('/post/:postId', {
        templateUrl: 'app/templates/blog-post.html',
        controller: 'BlogPostCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

AngularVSReact.controller('BlogCtrl', ['$scope', 'BlogPost', function($scope, BlogPost) {
    $scope.posts = BlogPost.query();

    // Public functions
    $scope.removeBlogPost = function( index ){

      $scope.posts.splice( index, 1 );
    };
}]);

AngularVSReact.controller('BlogPostCtrl', ['$scope', 'BlogPost', function($scope, BlogPost) {
      $scope.post = BlogPost.get();
}]);
