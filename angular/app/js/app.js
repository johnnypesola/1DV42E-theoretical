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

    $scope.addBlogPost = function( newPost ){

      newPost.email = 'sandrarodriquez@pasturia.com';
      newPost.picture = '5.jpg';
      newPost.name = 'Sandra Rodriquez';
      newPost.timestamp = Date.now();
      newPost.tags = [
        'new'
      ];

      console.log( $scope.timestamp );

      $scope.posts.unshift( angular.copy( newPost ) );
    }
}]);

AngularVSReact.controller('BlogPostCtrl', ['$scope', 'BlogPost', function($scope, BlogPost) {
      $scope.post = BlogPost.get();
}]);
