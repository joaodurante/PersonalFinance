(function(){
    angular.module('personalFinance').config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider){
            //cria estados (muda url para /*** e carrega o template no ui-view (definido em index.html))
            //transita de um estado para outro
            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'dashboard/dashboard.html'
                })
                .state('billingCycle', {
                    url: '/billingCycle?page',
                    templateUrl: 'billingCycle/tabs.html'
                });
            //caso a transicao de estado seja invalida, é carregado o estado do dashboard
            $urlRouterProvider.otherwise('/dashboard');
            $locationProvider.hashPrefix('');
        }
    ])
})();