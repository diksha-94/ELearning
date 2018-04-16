(function () {
  angular.module("elearnerApp")
    .controller("adminController", adminController);

  adminController.$inject = ["$scope", "adminService"];

  function adminController($scope, adminService) {
    var adminvm = this;

    $scope.validateUser();

    adminvm.context = adminService;
    adminvm.context.getCourses();
  }
})();
