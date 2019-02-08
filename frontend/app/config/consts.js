(() => {
    angular.module('personalFinance')
    .constant('consts', {
        appName: 'Personal Finance',
        version: '1.0',
        year: '2019',
        github: 'http://github.com/joaodurante',
        billingCyclesUrl: 'http://localhost:4003/api/billingCycles',
        billingSummaryUrl: 'http://localhost:4003/api/billingSummary',
        apiUrl: 'http://localhost:4003/api',
        oapiUrl: 'http://localhost:4003/oapi',
        userKey: '_personal_finance_user',
    })
    .run(['$rootScope', 'consts', function ($rootScope, consts) {
        $rootScope.const = consts;
    }]);
})();