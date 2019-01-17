(function(){
    angular.module('personalFinance').factory('msgs', [
        'toastr',
        msgsFactory
    ]);

    function msgsFactory(toastr){
        function addMsgs(msgs, title, method){
            if(msgs instanceof Array){
                //toastr.method(msg, title) sendo method passado por parametro
                msgs.forEach(msg => toastr[method](msg, title));
            }else{
                toastr[method](msgs, title);
            }
        }

        function addSuccess(msgs){
            addMsgs(msgs, 'Success', 'success');
        }

        function addError(msgs){
            addMsgs(msgs, 'Error', 'error');
        }
        return { addSuccess, addError };
    }

})();