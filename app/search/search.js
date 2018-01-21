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

.service('geoSrv', function() {

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

.service('returnGeo', function() {

    var myResult = [];

    var addResult = function (newObj) {
        myResult.push(newObj);
        console.log(myResult)
    }

    var getResult = function(){
        if(myResult.length == 0){
            var noGeo = {"longitude": null, "latitude": null};
            addResult(noGeo)
        }
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

.controller('updateGeo', ['$scope', 'geoSrv', function($scope, geoSrv) {

    $scope.update = geoSrv.getResult();

}])

.controller('geoCtrl', ['$scope', 'geoSrv', 'returnGeo', function($scope, geoSrv, returnGeo){

    $scope.getGeo = function() {

        $scope.success = null;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    $scope.position = position;
                    $scope.success = true;
                    geoSrv.addResult($scope.success);
                    returnGeo.addResult($scope.position.coords)
                });
            }, function (error) {
                $scope.$apply(function () {
                    $scope.success = 0;
                    geoSrv.addResult($scope.success);
                });
            });

        }

    }
}])



.controller('GetQuery', ['Results', '$scope', '$http', '$location', '$route', '$templateCache', '$timeout', 'returnGeo', 'geoSrv',
    function (Results, $scope, $http, $location, $route, $templateCache, $timeout, returnGeo, geoSrv){

    $scope.form = {
        keyword: "",
        location: "",
        long: "",
        lat: ""
    };
    $scope.submitForm = function () {

        $scope.form.long = returnGeo.getResult()[0]['longitude'];
        $scope.form.lat = returnGeo.getResult()[0]['latitude'];
        returnGeo.clearResult();
        geoSrv.clearResult();

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
            if($scope.clear.length > 0){
                $templateCache.remove('/search');
                Results.clearResult();

            }

            $scope.results = response.data.search_return;
            Results.addResult($scope.results);
            $location.path('/search');




        }).catch(function(response){

            console.log($scope.form)

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
