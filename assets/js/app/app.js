(function () {

  angular
    .module("elearnerApp", ["ngRoute", "ngMaterial"])
    .config(
      function ($locationProvider, $routeProvider) {

        $routeProvider
          .when("/", {
            templateUrl: "pages/login.html",
            controller: "loginController"
          })
          .when("/courses", {
            templateUrl: "pages/courses.html",
            controller: "coursesController",
            controllerAs: "csvm"
          })
          .when("/course", {
            templateUrl: "pages/course.html",
            controller: "courseController",
            controllerAs: "cvm"
          })
          .when("/certificate", {
            templateUrl: "pages/certificate.html",
            controller: "certificateController",
            controllerAs: "certvm"
          })
          .when("/admin/results", {
            templateUrl: "pages/admin/results.html",
            controller: "adminController",
            controllerAs: "adminvm"
          })
          .otherwise({
            redirectTo: "/"
          })
      }
    );

  angular
    .module("elearnerApp")
    .constant("page", {
      login: 0,
      courses: 1,
      course: 2,
      certificate: 3
    });
})();
