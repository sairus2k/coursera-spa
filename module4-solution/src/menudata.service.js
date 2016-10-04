(function () {
    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;
        var baseUrl = 'https://davids-restaurant.herokuapp.com/';
        service.getAllCategories = function () {
            return $http.get(baseUrl + 'categories.json')
                .then(function (result) {
                    return result.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        service.getItemsForCategory = function (categoryShortName) {
            var params = {
                category: categoryShortName
            };
            return $http.get(baseUrl + 'menu_items.json', { params: params })
                .then(function (result) {
                    return result.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}());
