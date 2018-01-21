'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: '',
    service: ''
  });
}])

.controller('recentReviews', function($scope, $http) {

    $scope.recent = function(how_many) {

        $http({

            url: api_url + '/places/recent_reviews',
            data: {'how_many' : how_many},
            method: 'POST'

        }).then(function(response) {

            $scope.reviews = response.data.reviews

        })

    }

})