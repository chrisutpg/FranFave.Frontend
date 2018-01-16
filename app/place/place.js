'use strict';

angular.module('myApp.place', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/singleplace', {
            templateUrl: 'place/place.html'
        });
        $routeProvider.when('/reviewprocess', {
            templateUrl: 'place/reviewprocess.html'
        });
    }])

.controller('PlaceDetails', ['Id', '$scope', function(Id, $scope){

    $scope.details = Id.getResult();
    $scope.show = 1;
    $scope.lmt = 5;

    $scope.showDiv = function(id) {

        $scope.show = id;

    }

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

.controller('ReviewForm', ['Id', '$scope', '$http', '$window', '$timeout', '$location', function(Id, $scope, $http, $window, $timeout, $location){

    $scope.error = null;
    $scope.place = Id.getResult();
    $scope.form = {

        cat1 : 0,
        cat2 : 0,
        cat3 : 0,
        cat4 : 0,
        cat5 : 0,
        comments: "",
        visited: "",
        id: null
    };

    $scope.submitForm = function() {


        $scope.form.id = $scope.place[0]['id'];

        $http({

            url: api_url + "/places/leave_review",
            headers: {'X-API-KEY': localStorage.token},
            data: JSON.stringify($scope.form),
            method: 'POST'

        }).then(function(response){

            $scope.error = false;

            $http({

                url: api_url + "/places/single_place",
                method: "POST",
                data: {'id': $scope.form.id}

            }).then(function(response) {

                $scope.place_details = response.data;
                Id.clearResult();
                Id.addResult($scope.place_details);
                $location.path('/reviewprocess');

            }).catch(function(response){

                $scope.error = 'Hmm.. We added your review but something went wrong after that.'

            })

        }).catch(function(response){

            $scope.error = response.data['Err'];

        })


    }


}])

.controller('SubMenuCtrl', function($scope, $location, $anchorScroll) {

    $scope.activeMenu = 'Overview';

    $scope.scrollTo = function (id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    }

})

.controller('ReviewProcess', function($scope, $timeout, $location){

    $timeout(function(){

        $location.path('/singleplace')

    }, 5000)

})

.controller('ReviewDetails', function($scope){


    $scope.q1 = function(rating) {

        $scope.dynamicClass = null;

        if(rating == 1){
            $scope.dynamicClass = 'much-worse';
            return 'VERY DIFFERENT'
        }

        if(rating == 2){
            $scope.dynamicClass = 'worse';
            return 'SOMEWHAT DIFFERENT'
        }

        if(rating == 3){
            $scope.dynamicClass = 'same';
            return 'ABOUT THE SAME'
        }

        if(rating == 4){
            $scope.dynamicClass = 'better';
            return 'PRETTY SIMILAR'
        }

        if(rating == 5){
            $scope.dynamicClass = 'much-better';
            return 'VERY SIMILAR'
        }

    }

    $scope.q2 = function(rating) {

        $scope.dynamicClass = null;

        if(rating == 1){
            $scope.dynamicClass = 'much-worse';
            return 'VERY UNLIKELY'
        }

        if(rating == 2){
            $scope.dynamicClass = 'worse';
            return 'SOMEWHAT UNLIKELY'
        }

        if(rating == 3){
            $scope.dynamicClass = 'same';
            return 'NOT REALLY SURE'
        }

        if(rating == 4){
            $scope.dynamicClass = 'better';
            return 'SOMEWHAT LIKELY'
        }

        if(rating == 5){
            $scope.dynamicClass = 'much-better';
            return 'VERY LIKELY'
        }

    }

    $scope.q3 = function(rating) {

        $scope.dynamicClass = null;

        if(rating == 1){
            $scope.dynamicClass = 'much-worse';
            return 'MUCH WORSE'
        }

        if(rating == 2){
            $scope.dynamicClass = 'worse';
            return 'A BIT WORSE'
        }

        if(rating == 3){
            $scope.dynamicClass = 'same';
            return 'ABOUT THE SAME'
        }

        if(rating == 4){
            $scope.dynamicClass = 'better';
            return 'PRETTY MUCH THE SAME'
        }

        if(rating == 5){
            $scope.dynamicClass = 'much-better';
            return 'EXACTLY AS IT SHOULD'
        }

    }

    $scope.q4 = function(rating) {

        $scope.dynamicClass = null;

        if(rating == 1){
            $scope.dynamicClass = 'much-worse';
            return 'NOT A LOT'
        }

        if(rating == 2){
            $scope.dynamicClass = 'worse';
            return 'A FEW THINGS'
        }

        if(rating == 3){
            $scope.dynamicClass = 'same';
            return 'DID NOT NOTICE'
        }

        if(rating == 4){
            $scope.dynamicClass = 'better';
            return 'PRETTY MUCH EVERYTHING'
        }

        if(rating == 5){
            $scope.dynamicClass = 'much-better';
            return 'EVERYTHING THEY ORDERED'
        }

    }

    $scope.q5 = function(rating) {

        $scope.dynamicClass = null;

        if(rating == 1){
            $scope.dynamicClass = 'much-worse';
            return 'MUCH HIHGER'
        }

        if(rating == 2){
            $scope.dynamicClass = 'worse';
            return 'A BIT HIGHER'
        }

        if(rating == 3){
            $scope.dynamicClass = 'same';
            return 'ABOUT THE SAME'
        }

        if(rating == 4){
            $scope.dynamicClass = 'better';
            return 'A LITTLE LOWER'
        }

        if(rating == 5){
            $scope.dynamicClass = 'much-better';
            return 'MUCH LOWER'
        }

    }

})

.controller('ReviewOverview', function($scope) {

    $scope.dynamicClass = null;

    $scope.overall = function(num) {

        if(num <= 1.5){
            $scope.dynamicClass = 'much-worse';
            return 'WILL NOT BE'
        }
        if(num <= 2.5){
            $scope.dynamicClass = 'worse';
            return 'WILL PROBABLY NOT BE'
        }
        if(num <= 3.5){
            $scope.dynamicClass = 'same';
            return 'WILL BE ABOUT'
        }
        if(num <= 4.5){
            $scope.dynamicClass = 'better';
            return 'WILL BE ABOVE'
        }
        if(num > 4.5){
            $scope.dynamicClass = 'much-better';
            return 'WILL EXCEED'
        }


    }

})