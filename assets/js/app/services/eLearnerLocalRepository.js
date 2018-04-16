(function(){
    angular
        .module("elearnerApp")
        .factory("elearnerLocalRepository", elearnerLocalRepo);

    elearnerLocalRepo.$inject = ["$q"];

    function elearnerLocalRepo($q){
        var repo = [];
        
        var repository = {
            addData: addData,
            getData: getData
        }
        
        function addData(key, value){
            var deferred = $q.defer();
            var targetData = null;
            
            for(var i=0;i<repo.length;i++){
                if(repo[i].key ===  key){
                    targetData = repo[i];
                }
            }
            
            if(targetData) {
                targetData.value = value;
            }
            else{
                repo.push({key:key, value: value});
            }

            deferred.resolve({});
            return deferred.promise;
        }
        
        function getData(key) {
            var deferred = $q.defer();
            var targetData = null;

            for(var i=0;i<repo.length;i++){
                if(repo[i].key ===  key){
                    targetData = repo[i].value;
                }
            }
            
            deferred.resolve(targetData);
            return deferred.promise;
        }
        
        return repository;
    }
})();