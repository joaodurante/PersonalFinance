(function(){
    angular.module('personalFinance').component('valueBox', {
        bindings:{
            grid: '@',
            color: '@',
            value: '@',
            title: '@',
            icon: '@',
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
                <div class="small-box {{ $ctrl.color }}">
                    <div class="inner">
                        <h3>{{ $ctrl.value }}</h3>
                        <p>{{ $ctrl.title }}</p>
                    </div>
                    <div class="icon">
                        <i class="fa {{ $ctrl.icon }}"></i>
                    </div>
                </div>
            </div>
        `
    })
})();