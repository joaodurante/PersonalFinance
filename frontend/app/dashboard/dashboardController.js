angular.module('personalFinance').controller('dashController', [
    '$http',
    'consts',
    DashController
]);

function DashController($http, consts){
    const vm = this;
    vm.getSummary = function(){
        const url = consts.billingSummaryUrl;
        $http.get(url).then((res) => {
            const {credit = 0, debt = 0} = res.data;
            vm.credit = credit;
            vm.debt = debt;
            vm.total = credit - debt;
        });
    }
    vm.getSummary();
}