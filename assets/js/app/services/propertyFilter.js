(function(){
  "use strict"

  angular
    .module("elearnerApp")
    .filter("propertyFilter", propertyFilter);

  function propertyFilter() {
    return function(input, propertyName) {
      var result = [];

      if(input) {
        angular.forEach(input, function(item){
          if(item[propertyName]) {
            result.push(item);
          }
        });
      }

      return result;
    }
  }
})();
