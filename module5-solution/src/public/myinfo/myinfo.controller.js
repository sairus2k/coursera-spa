(function () {
    'use strict';
    angular.module('public')
        .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['User', 'ApiPath'];
    function MyinfoController(User, ApiPath) {
        var $ctrl = this;
        $ctrl.user = User.get();
        $ctrl.isNoUser = angular.equals($ctrl.user, {});
        $ctrl.isUser = !$ctrl.isNoUser;
        $ctrl.basePath = ApiPath;
    }
}());
