(function () {
    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.html'
            })
            .state('categories', {
                url: '/categories',
                template: '<categories data="$ctrl.categories"></categories>',
                controller: 'CategoriesController as $ctrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/item/{category}',
                template: '<items data="$ctrl.items"></items>',
                controller: 'ItemsController as $ctrl',
                resolve: {
                    items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.category);
                    }]
                }
            });
    }
}());
