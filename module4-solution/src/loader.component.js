(function () {
    'use strict';

    angular.module('MenuApp')
        .component('loader', {
            templateUrl: 'src/templates/loader.html',
            controller: SpinnerController
        });

    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        var $ctrl = this;
        var cancellers = [];

        $ctrl.$onInit = function () {
            var cancel = $rootScope.$on('$stateChangeStart',
                function () {
                    $ctrl.showSpinner = true;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
                function () {
                    $ctrl.showSpinner = false;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
                function () {
                    $ctrl.showSpinner = false;
                });
            cancellers.push(cancel);
        };

        $ctrl.$onDestroy = function () {
            cancellers.forEach(function (item) {
                item();
            });
        };
    }

})();
