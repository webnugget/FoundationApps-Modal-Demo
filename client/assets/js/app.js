(function() {
    'use strict';

    angular.module('application', [
        'ui.router',
        'ngAnimate',

        'angular-storage',
        'angularModalService',

        //foundation
        'foundation',
        'foundation.dynamicRouting',
        'foundation.dynamicRouting.animations'
    ])
        .config(config)
        .run(run)
        .controller('StartController', StartController)
        .controller('ModalController', function($scope, close) {

            $scope.close = function(result) {
                close(result);
            };

        });

    config.$inject = ['$urlRouterProvider', '$locationProvider'];


    function config($urlProvider, $locationProvider) {
        $urlProvider.otherwise('/');

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $locationProvider.hashPrefix('!');
    }

    function run() {
        FastClick.attach(document.body);
    }



    StartController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'FoundationApi', 'store', 'ModalService'];

    function StartController($scope, $stateParams, $state, $controller, fa, store, ModalService) {
        angular.extend(this, $controller('DefaultController', {
            $scope: $scope,
            $stateParams: $stateParams,
            $state: $state
        }));

        if (!store.get('termsaccepted')) {
            var modalOptions = {
                templateUrl: 'templates/modal.html',
                controller: 'ModalController'
            };

            ModalService.showModal(modalOptions).then(function(modal) {

                modal.close.then(function(result) {

                    if (result) {
                        store.set('termsaccepted', true);
                    }
                });
            });

        }
    }

})();