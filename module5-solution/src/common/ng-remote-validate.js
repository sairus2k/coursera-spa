(function () {
    'use strict';
    angular.module('common')
        .directive('ngRemoteValidate', ngRemoteValidate);

    ngRemoteValidate.$inject = ['$q', '$http', 'ApiPath'];
    function ngRemoteValidate($q, $http, ApiPath) {
        return {
            require: 'ng-model',
            scope: false,
            link: function (scope, element, attributes, ctrl) {
                ctrl.$validators.dish = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return /^[a-zA-Z]{1,2}[0-9]{1,2}$/.test(value);
                };
                ctrl.$asyncValidators.remoteDish = function (modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    value = value.toUpperCase();
                    var url = ApiPath + '/' + attributes.ngRemoteValidate + '/' + value + '.json';
                    return $http.get(url)
                        .then(function (response) {
                            ctrl.remoteValue = response.data;
                            return true;
                        })
                        .catch(function (error) {
                            return $q.reject(error.status);
                        });
                }

            }
        }
    }
}());
