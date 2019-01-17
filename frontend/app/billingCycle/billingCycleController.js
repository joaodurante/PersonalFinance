(function(){
    angular.module('personalFinance').controller('billingController', [
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ]);

    function BillingCycleController($http, msgs, tabs){
        const vm = this;
        const url = 'http://localhost:3000/api/billingCycles';

        vm.refresh = function() {
            $http.get(url).then((res) => {
                vm.billingCycle = {};
                vm.billingCycles = res.data;
                tabs.show(vm, {tabList: true, tabCreate: true});
            })
        }

        vm.create = function() {
            $http.post(url, vm.billingCycle).then((res) => {
                vm.refresh();
                msgs.addSuccess('Successful operation!');
            }).catch(function(res){
                msgs.addError(res.data.errors);
            })
        }

        vm.showTabUpdate = function(billingCycle){
            vm.billingCycle = billingCycle;
            tabs.show(vm, {tabUpdate: true});
        }

        vm.showTabDelete = function(billingCycle){
            vm.billingCycle = billingCycle;
            tabs.show(vm, {tabDelete: true});
        }

        vm.refresh();
    }
})();