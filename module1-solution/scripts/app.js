(function () {
    'use strict';

    var LunchCheckFunction = function($scope) {
        LunchCheckFunction.$injector = ['$scope'];

        $scope.lunchMenu = '';

        $scope.check = function() {
            var list = $scope.lunchMenu.trim();
            if (list === '') {
                $scope.message = 'Empty';
            } else {
                if (list.split(',').length <= 3) {
                    $scope.message = 'Enjoy!';
                } else {
                    $scope.message = 'Too much!';
                }
            }
        }
    };

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckFunction);
})();
