'use strict';

angular.module('myApp.search', ['ngRoute'])

.service('Results', function() {

    var myResult = [];

    var addResult = function (newObj) {
        myResult.push(newObj);
    }

    var getResult = function(){
        return myResult;
    }
    var clearResult = function(){
        myResult.length = 0;
    }
    return{
        addResult: addResult,
        getResult: getResult,
        clearResult: clearResult

    }
})    

.controller('GetQuery', ['Results', '$scope', '$http', '$location', '$route', '$templateCache', '$timeout', function (Results, $scope, $http, $location, $route, $templateCache, $timeout){

    $scope.search_results = 'Test';
    $scope.form = {
        keyword: "",
        location: ""
    };
    $scope.submitForm = function () {

        $timeout(function(){
            var el = document.getElementById('closeSearch');
            angular.element(el).trigger('click');
        });

        $http({

            url: api_url + "/places/search_places",
            method: "POST",
            data: JSON.stringify($scope.form)

        }).then(function(response) {

            $scope.clear = Results.getResult();
            console.log($scope.clear);
            if($scope.clear.length > 0){
                $templateCache.remove('/search');
                Results.clearResult();

            }

            $scope.results = response.data.search_return;
            Results.addResult($scope.results);
            $location.path('/search');




        }).catch(function(response){

            //

        })

    }


}])

.controller('DisplayQuery', ['Results', '$scope', function (Results, $scope) {

    $scope.search = Results.getResult();

    $scope.starCtrl = function(num) {

        if(num == 1 || num == 1.5){
            return [1]
        }
        if(num == 2 || num == 2.5){
            return [1, 2]
        }
        if(num == 3 || num == 3.5){
            return [1, 2, 3]
        }
        if(num == 4 || num == 4.5){
            return [1, 2, 3, 4]
        }
        if(num == 5){
            return [1, 2, 3, 4, 5]
        }

    }

    $scope.halfStar = function(num) {
        if(Number.isInteger(Number(num))){
            return true
        }else{
            return false
        }

    }

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

            url: api_url + "/places/single_place",
            method: "POST",
            data: {'id': id}

        }).then(function(response){

            $scope.gid = response.data;
            Id.clearResult();
            Id.addResult($scope.gid);
            $location.path('/singleplace')

        }).catch(function(response){

            // Do something

        })

    }

}])
