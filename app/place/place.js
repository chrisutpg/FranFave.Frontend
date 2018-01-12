'use strict';

angular.module('myApp.place', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/singleplace', {
            templateUrl: 'place/place.html'
        });
    }])

.controller('ShowGid', ['Id', '$scope', function(Id, $scope){

    $scope.gid = Id.getResult()

}])

.controller('ReviewForm', ['Id', '$scope', '$http', function(Id, $scope, $http){

    $scope.place = Id.getResult();
    $scope.form = {

        cat1 : "",
        cat2 : "",
        cat3 : "",
        cat4 : "",
        cat5 : "",
        id: null
    };

    $scope.submitForm = function() {

        $scope.form.id = $scope.place[0]['id'];
        console.log($scope.form)
        /*
        $http({

            url: "http://127.0.0.1:5000/auth/login_user",
            data: JSON.stringify($scope.form),
            method: 'POST'

        }).then(function(response){


        }).catch(function(response){

            console.log(response.data)

        })
        */

    }


}])