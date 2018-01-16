'use strict';

angular.module('myApp.profile', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/publicprofile', {
        templateUrl: 'profile/publicprofile.html'
    });
}])

.service('PubInfo', function(){

    var myResult = [];

    var addResult = function (newObj) {
        myResult.push(newObj);
        console.log(myResult);
    }

    var getResult = function(){
        return myResult;
    }
    var clearResult = function(){
        myResult.length = 0;
        console.log(myResult)
    }
    return{
        addResult: addResult,
        getResult: getResult,
        clearResult: clearResult

    }

})

.controller('PubInfoDisplay', ['$scope', 'PubInfo', function($scope, PubInfo) {

    $scope.info = PubInfo.getResult()

}])

.controller('PubProfile', ['$scope', '$http', 'PubInfo', '$location', function($scope, $http, PubInfo, $location) {

    $scope.ProfileFromReview = function(id) {

        $http({

            url: api_url + '/profiles/pub_profile',
            data: {'id' : id},
            method: 'POST'

        }).then(function(response) {

            $scope.pubInfo = response.data;
            PubInfo.addResult($scope.pubInfo);
            $location.path('/publicprofile')

        })

    }

}])