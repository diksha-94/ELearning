(function(){
  "use strict"

  angular
    .module("elearnerApp")
    .filter("arrayDividerFilter", arrayDividerFilter);

  function arrayDividerFilter() {
    return function(input, divideCount) {
      var result = [];

      if(input) {
        var chunk = [];
        var itemCount = 0;
        angular.forEach(input, function(item){
          chunk.push(item);
          itemCount++;

          if(itemCount === divideCount) {
            result.push(chunk);
            itemCount = 0;
            chunk = [];
          }
        });

        if(chunk.length !== 0){
          result.push(chunk);
        }
      }

      return result;
    }
  }
})();
