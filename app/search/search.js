'use strict';

angular.module('myApp.search', ['ngRoute'])

.service('Results', function() {

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

.controller('GetQuery', ['Results', '$scope', '$http', '$location', '$route', '$templateCache', function (Results, $scope, $http, $location, $route, $templateCache){

    $scope.search_results = 'Test';
    $scope.form = {
        keyword: "",
        location: ""
    };
    $scope.submitForm = function () {

        console.log('Test');

        $http({

            url: "http://127.0.0.1:5000/places/search_places",
            method: "POST",
            data: JSON.stringify($scope.form)

        }).then(function(response) {

            $scope.clear = Results.getResult();
            console.log($scope.clear);
            if($scope.clear.length > 0){
                $templateCache.remove('/search');
                Results.clearResult();
                console.log('True')

            }

            $scope.search_results = response.data.query;
            Results.addResult($scope.search_results);
            $location.path('/search');




        }).catch(function(response){

            //

        })

    }

}])

.controller('DisplayQuery', ['Results', '$scope', function (Results, $scope) {

    $scope.search = Results.getResult();

}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {
        templateUrl: 'search/search.html',
        
    });
}])

.service('Id', function(){

    var myResult = [];

    var addResult = function (newObj) {
        myResult.push(newObj);
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

.controller('Gid', ['Id', '$scope', '$http', '$location', function(Id, $scope, $http, $location){

    $scope.getGid = function(id){

        $http({

            url: "http://127.0.0.1:5000/places/single_place",
            method: "POST",
            data: {'id': id}

        }).then(function(response){

            $scope.gid = response.data;
            Id.clearResult();
            console.log($scope.gid);
            console.log($scope.id);
            Id.addResult($scope.gid);
            $location.path('/singleplace')

        }).catch(function(response){

            // Do something

        })

    }

}])
