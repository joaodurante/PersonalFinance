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
                vm.calculateValues();
                tabs.show(vm, {tabList: true, tabCreate: true});
            })
        }

        vm.showTabUpdate = (billingCycle) => {
            vm.billingCycle = billingCycle;
            vm.calculateValues();
            tabs.show(vm, {tabUpdate: true});
        }

        vm.showTabDelete = (billingCycle) => {
            vm.billingCycle = billingCycle;
            vm.calculateValues();
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

        vm.addCredit = (index) =>{
            vm.billingCycle.credits.splice(0, 0, {});
        }

        vm.cloneCredit = (index, {name, value}) =>{
            vm.billingCycle.credits.splice(0, 0, {name, value});
            vm.calculateValues();
        }

        vm.deleteCredit = (index) => {
            if(vm.billingCycle.credits.length > 1){
                vm.billingCycle.credits.splice(index, 1);
                vm.calculateValues();
            }else{
                vm.billingCycle.credits = [{}];
                vm.calculateValues();
            }
        }

        vm.addDebt = (index) =>{
            vm.billingCycle.debts.splice(0, 0, {});
        }

        vm.cloneDebt = (index, {name, value, status}) =>{
            vm.billingCycle.debts.splice(0, 0, {name, value, status});
            vm.calculateValues();
        }

        vm.deleteDebt = (index) =>{
            if(vm.billingCycle.debts.length > 1){
                vm.billingCycle.debts.splice(index, 1);
                vm.calculateValues();
            }else{
                vm.billingCycle.debts = [{}];
                vm.calculateValues();
            }
        }

        vm.calculateValues = () =>{
            vm.credit = 0;
            vm.debt = 0;

            if(vm.billingCycle){
                // for de todos os elementos de credits, pegando apenas {value}
                vm.billingCycle.credits.forEach(({value}) =>{
                                //if (!value || value is not a number) soma 0 else parsefloat(value)
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value);
                });
                vm.billingCycle.debts.forEach(({value}) =>{
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value);
                })
            }
            vm.total = vm.credit - vm.debt;
        }

        vm.refresh();
    }
})();