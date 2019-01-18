(() =>{
    angular.module('personalFinance').controller('billingController', [
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ]);

    function BillingCycleController($http, msgs, tabs){
        const vm = this;
        const url = 'http://localhost:3000/api/billingCycles';

        vm.refresh = () =>{
            $http.get(url).then((res) => {
                vm.billingCycle = {credits: [{}], debts: [{}]};
                vm.billingCycles = res.data;
                tabs.show(vm, {tabList: true, tabCreate: true});
            })
        }

        vm.showTabUpdate = (billingCycle) => {
            vm.billingCycle = billingCycle;
            tabs.show(vm, {tabUpdate: true});
        }

        vm.showTabDelete = (billingCycle) => {
            vm.billingCycle = billingCycle;
            tabs.show(vm, {tabDelete: true});
        }

        vm.create = () => {
            $http.post(url, vm.billingCycle).then((res) => {
                vm.refresh();
                msgs.addSuccess('The record was created!');
            }).catch((res) => {
                msgs.addError(res.data.errors);
            })
        }

        vm.update = () =>{
            const urlUpdate = `${url}/${vm.billingCycle._id}`;
            $http.put(urlUpdate, vm.billingCycle).then((res) => {
                vm.refresh();
                msgs.addSuccess('The record was updated');
            }).catch((res) => {
                msgs.addError(res.data.errors);
            })
        }

        vm.delete = () =>{
            const urlDelete = `${url}/${vm.billingCycle._id}`;
            $http.delete(urlDelete, vm.billingCycle).then((res) => {
                vm.refresh();
                msgs.addSuccess('The record was deleted!');
            }).catch((res) => {
                msgs.addError(res.data.errors);
            })
        }

        vm.refresh();
    }
})();