(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://serene-headland-44833.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
