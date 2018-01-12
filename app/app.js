'use strict';

// Declare app level module which depends on views, and components
var api_url = 'http://franfave-191811.appspot.com'; // Could Change Depending On Where Its Hosted

var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.users',
  'myApp.search',
  'myApp.place',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

myApp.directive('changeClassOnScroll', function ($window) {
    return {
        restrict: 'A',
        scope: {
            offset: "@",
            scrollClass: "@"
        },
        link: function(scope, element) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= parseInt(scope.offset)) {
                    element.removeClass(scope.scrollClass);
                    console.log('Scrolled below header.');
                } else {
                    element.addClass(scope.scrollClass);
                }
            });
        }
    };
});

myApp.controller('headerHide', function($scope, $location){

    $scope.$on("$routeChangeSuccess", function () {

        $scope.location = $location.path();
        if($scope.location != '/view1'){

            $scope.hide = true;

        } else {

            $scope.hide = false;

        }
        console.log('Success')

    })

})


myApp.directive('ifLoading', function($http){

    return {
        restrict: 'A',
        link: function(scope, elem) {
            scope.isLoading = isLoading;

            scope.$watch(scope.isLoading, toggleElement);

            console.log('Loading..');

            function toggleElement(loading) {
                if (loading) {
                    elem.show();
                } else {
                    elem.hide();
                }
            }

            function isLoading() {
                return $http.pendingRequests.length > 0;
            }
        }
    };

})
