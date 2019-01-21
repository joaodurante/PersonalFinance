(()=>{
    angular.module('personalFinance').component('field', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=', //binding de duas direçoes entre component e controller (billingCycleController)
            readonly: '<'
        },
        controller: [
            'gridSystem',
            function(gridSystem){
                this.$onChanges = () => {
                    this.gridClasses = gridSystem.toCssClasses(this.grid);
                }
            }
        ],
        template: `
            <div class="{{ $ctrl.gridClasses }}">
                <div class="form-group">
                    <label for="{{ $ctrl.id }}"> {{ $ctrl.label }} </label>
                    <input id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}"
                           type="{{ $ctrl.type }}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly">
                </div>
            </div>
        `
    })
})();