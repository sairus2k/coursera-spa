(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var tobuy = this;
        tobuy.list = ShoppingListCheckOffService.getTobuyList();
        tobuy.bought = function (index) {
            ShoppingListCheckOffService.bought(index);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var already = this;
        already.list = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var alreadyBoughtList = [];
        var tobuyList = [
            { name: 'cookies', quantity: 10 },
            { name: 'candies', quantity: 6 },
            { name: 'chocolate', quantity: 3 },
            { name: 'beer', quantity: 2 },
            { name: 'vodka', quantity: 8 }
        ];
        service.getTobuyList = function () {
            return tobuyList;
        };
        service.getBoughtList = function () {
            return alreadyBoughtList;
        };
        service.bought = function (index) {
            alreadyBoughtList.push(tobuyList.splice(index, 1)[0]);
        };
    }
})();
