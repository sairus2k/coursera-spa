(function () {
    'use strict';
    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['User'];
    function SignupController(User) {
        var $ctrl = this;
        $ctrl.success = false;
        $ctrl.submit = function (form) {
            if (form.$valid) {
                var user = {
                    firstName: form.firstName.$viewValue,
                    lastName: form.lastName.$viewValue,
                    email: form.email.$viewValue,
                    phone: form.phone.$viewValue,
                    dish: form.dish.remoteValue
                };
                User.set(user);
                $ctrl.success = true;
            }
        }
    }
}());
