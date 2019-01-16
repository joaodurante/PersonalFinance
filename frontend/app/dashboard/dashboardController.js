angular.module('personalFinance').controller('dashController', [
    '$http',
    DashController
]);

function DashController($http){
    const vm = this;
    vm.getSummary = function(){
        const url = 'http://localhost:3000/api/billingSummary';
        $http.get(url).then((res) => {
            const {credit = 0, debt = 0} = res.data;
            vm.credit = credit;
            vm.debt = debt;
            vm.total = credit - debt;
        });
    }
    vm.getSummary();
}