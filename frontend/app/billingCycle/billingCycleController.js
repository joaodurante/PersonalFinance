(function(){
    angular.module('personalFinance').controller('billingController', [
        '$http',
        'msgs',
        BillingCycleController
    ]);

    function BillingCycleController($http, msgs){
        const vm = this;
        vm.create = function() {
            const url = 'http://localhost:3000/api/billingCycles';
            $http.post(url, vm.billingCycle).then(function(res){
                vm.billingCycle = {};
                msgs.addSuccess('Successful operation!');
            }).catch(function(res){
                msgs.addError(res.data.errors);
            })
        }
    }
})();