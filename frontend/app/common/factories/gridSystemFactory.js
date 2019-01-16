/**
 * Factory para "padronizar" tamanhos do bootstrap e dispensar a escrita total de col-md-xx col-lg-xx
 * Padrão: 'xx xx xx xx' -> 'col-xs-xx col-sm-xx col-md-xx col-lg-xx'
 */

 angular.module('personalFinance').factory('gridSystem', function(){
     function toCssClasses(numbers){
        // if(numbers) faz o split e joga no array else array vazio
        const cols = numbers ? numbers.split(' ') : [];
        let classes = '';

        if(cols[0]) classes += `col-xs-${cols[0]}`;
        if(cols[1]) classes += ` col-sm-${cols[1]}`;
        if(cols[2]) classes += ` col-md-${cols[2]}`;
        if(cols[3]) classes += ` col-lg-${cols[3]}`;

        return classes;
     }
     return { toCssClasses };
 })