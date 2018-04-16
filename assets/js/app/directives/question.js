(function(){
    "use strict"

    angular
        .module("elearnerApp")
        .directive("questionInstance", questionFn);

    function questionFn() {
        var questionDdo = {
            restrict: "E",
            scope: {
                instance: "="
            },
            templateUrl: "js/app/directives/question.html",
            controller: questionControllerFn,
            controllerAs: "qvm",
            bindToController: true
        }

        function questionControllerFn(){
            var qvm = this;
        }

        return questionDdo;
    }
})();
