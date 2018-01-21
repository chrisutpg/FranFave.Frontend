'use strict';

angular.module('myApp.profile', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/publicprofile', {
        templateUrl: 'profile/publicprofile.html'
    });
    $routeProvider.when('/privateprofile', {
        templateUrl: 'profile/privateprofile.html'
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

.controller('privateProfile', ['$scope', '$http', '$location', function($scope, $http, $location){

    $scope.get_profile = function() {

        $http({

            url: api_url + "/profiles/private_profile",
            headers: {'X-API-KEY': localStorage.token},
            method: 'GET'

        }).then(function(response){

            $scope.profile = response.data

        }).catch(function(response){

            $location.path('/view1')

        })

    }

}])

.controller('privateProfileMenu', function($scope, $location, $anchorScroll) {

    $scope.activeMenu = 'Overview';
    $scope.show = 1;

    $scope.scrollTo = function (id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    };

    $scope.showDiv = function(id) {

        $scope.show = id;

    }

})