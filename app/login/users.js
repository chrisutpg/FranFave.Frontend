'use strict';

angular.module('myApp.users', [])

.service('Users', function() {

    var myResult = [];

    var addResult = function (newObj) {
        myResult.push(newObj);
    }

    var getResult = function(){
        return myResult;
    }

    return{
        addResult: addResult,
        getResult: getResult

    }
})

.controller('UserUpdate', ['Users', '$scope', function(Users, $scope){

    $scope.token = Users.getResult();

}])

.controller('FormLoginCtrl', ['Users', '$scope', '$http', function (Users, $scope, $http, $window, $rootScope) {

    $scope.success = null;
    $scope.error = null;
    $scope.form = {
        email: "",
        password: ""
    };
    $scope.submitForm = function() {

        $http({

            url: "http://127.0.0.1:5000/auth/login_user",
            data: JSON.stringify($scope.form),
            method: 'POST'

        }).then(function(response){

            localStorage.token = response.data.token;
            sessionStorage.token = response.data.token;
            $scope.success = 'You are logged in!';

            $http({

                url: "http://127.0.0.1:5000/auth/is_user",
                method: 'POST',
                headers: {'X-API-KEY': localStorage.token}

            }).then(function(response) {

                $scope.user_info = response.data;
                Users.addResult($scope.user_info)

            }).catch(function() {

                $scope.user_info = null;

            })

        }).catch(function(response) {

            if(response.data === null){

                $scope.error = 'Something went wrong on our end.. Try again in a bit!';

            } else {

                $scope.error = response.data['Err'];
            }
        })
    };

}])

.controller("IsAuth", function($scope, $http) {

    if(localStorage.token == null){

        $scope.user_info = null;

    } else {

        $http({

            url: "http://127.0.0.1:5000/auth/is_user",
            method: 'POST',
            headers: {'X-API-KEY': localStorage.token}

        }).then(function(response) {

            $scope.user_info = response.data;

        }).catch(function() {

            $scope.user_info = null;

        })

    }

})

.controller('FormRegisterCtrl', ['Users', '$scope', '$http', function (Users, $scope, $http, $window) {

    $scope.form = {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    };
    $scope.submitForm = function() {

        $http({

            url: "http://127.0.0.1:5000/auth/create_user",
            method: "POST",
            data: JSON.stringify($scope.form)

        }).then(function(response){

            $http({

                url: "http://127.0.0.1:5000/auth/login_user",
                method: "POST",
                data: {"email" : $scope.form.email,
                    "password" : $scope.form.password}

            }).then(function(response) {

                localStorage.token = response.data.token;
                sessionStorage.token = response.data.token;

                $http({

                    url: "http://127.0.0.1:5000/auth/is_user",
                    method: 'POST',
                    headers: {'X-API-KEY': localStorage.token}

                }).then(function(response) {

                    $scope.user_info = response.data;
                    Users.addResult($scope.user_info)

                }).catch(function() {

                    $scope.user_info = null;

                }).then(function() {

                    // Do something else

                })

            }).catch(function(response) {

                // Do something else

            })

        }).catch(function(response) {

            $scope.error = response.data['Err'];

        })

    };
}]);