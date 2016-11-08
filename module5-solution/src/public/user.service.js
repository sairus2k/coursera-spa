(function () {
    'use strict';
    angular.module('public')
        .service('User', User);

    function User() {
        var user = {};
        return {
            get: function () {
                return user;
            },
            set: function (data) {
                angular.extend(user, data);
            }
        }
    }
}());
