(function () {
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .directive('itemsLoaderIndicator', itemsLoaderIndicatorDirective);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        var menu = MenuSearchService;
        var checkLength = function () {
            narrow.error = narrow.found.length === 0;
        };
        narrow.loading = false;
        narrow.search = function () {
            narrow.found = [];
            narrow.error = false;
            if (narrow.query && narrow.query !== '') {
                narrow.loading = true;
                menu.getMatchedMenuItems(narrow.query)
                    .then(function (response) {
                        narrow.found = response;
                        checkLength();
                    })
                    .catch(function () {
                        narrow.error = true;
                    })
                    .finally(function () {
                        narrow.loading = false;
                    });
            } else {
                narrow.error = true;
            }
        };

        narrow.removeItem = function(itemIndex) {
            narrow.found.splice(itemIndex, 1);
            checkLength();
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;
        service.getMatchedMenuItems = function (searchTerm) {
            return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json')
                .then(function (response) {
                    return response.data.menu_items.filter(function (item) {
                        return item.description.indexOf(searchTerm) !== -1;
                    });
                })
                .catch(function (response) {
                    console.error(response.data);
                });
        };
    }

    function FoundItemsDirective() {
        return {
            restrict: 'E',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            templateUrl: 'found-items.html'
        }
    }

    function itemsLoaderIndicatorDirective() {
        return {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            link: itemsLoaderIndicatorLink
        }
    }

    function itemsLoaderIndicatorLink(scope, element) {
        var loader = element.find('div');
        scope.$watch('narrow.loading', function (newVal) {
            if (newVal) {
                loader.css('display', 'block');
            } else {
                loader.css('display', 'none');
            }
        })
    }
}());
