(function () {
  "use strict"

  angular
    .module("elearnerApp")
    .controller("loginController", loginController);

  loginController.$inject = ["$scope", "$location", "eLearnerAppConfig", "elearnerService", "page"];

  function loginController($scope, $location, eLearnerAppConfig, elearnerService, page) {

    eLearnerAppConfig.activePage = page.login;

    $scope.register = function () {

      elearnerService.login($scope.username, $scope.password)
        .then(
          function(data) {
            if(data) {

              eLearnerAppConfig.user.loggedIn = true;
              eLearnerAppConfig.user.name = data.userId;
              eLearnerAppConfig.user.displayName = data.displayName;
              eLearnerAppConfig.user.isAdmin = data.userRole === "admin" ? true : false;

              sessionStorage.setItem("user", JSON.stringify(eLearnerAppConfig.user));
              $location.path("/courses");
            }
            else {
              window.alert("Wrong credentials");
            }
          }
        );
    };
  }
})();
