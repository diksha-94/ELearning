(function () {
  angular.module("elearnerApp")
    .controller("baseController", baseController);

  baseController.$inject = ["$scope", "$window", "$location", "eLearnerAppConfig", "page"];

  function baseController($scope, $window, $location, eLearnerAppConfig, page) {
    var basevm = this;

    basevm.app = eLearnerAppConfig;
    basevm.showHeaderNavigation = showHeaderNavigation;
    basevm.closeCourse = closeCourse;
    basevm.isLoginPage = isLoginPage;
    basevm.isCoursesPage = isCoursesPage;
    basevm.navigateToCertificatePage = navigateToCertificatePage;
    basevm.isCertificatePage = isCertificatePage;
    basevm.closeCertificate = closeCertificate;
    basevm.logOut = logOut;
    basevm.navigateToResults = navigateToResults;
    basevm.navigateToHome = navigateToHome;

    $scope.badge = {
      status: null
    }

    function navigateToHome() {
      $location.path('/courses');
    }

    function navigateToResults() {
      $location.path('/admin/results');
    }

    function navigateToCertificatePage() {
      $location.path('/certificate');
    }

    function showHeaderNavigation() {
      return basevm.app.activePage !== page.login;
    }

    function closeCourse() {
      $scope.$broadcast("onCourseClose", {});
    }

    function closeCertificate() {
      $location.path('/courses');
    }

    function isCertificatePage() {
      return basevm.app.activePage === page.certificate;
    }

    function isLoginPage() {
      return basevm.app.activePage === page.login;
    }

    function isCoursesPage() {
      return basevm.app.activePage === page.courses;
    }

    $scope.active = {
      course: null
    }

    $scope.scrollToTop = function () {
      $window.scrollTo(0, 0);
    }

    $scope.validateUser = function () {
      if (eLearnerAppConfig.user.loggedIn === false) {
        if(sessionStorage.user) {
          var user = JSON.parse(sessionStorage.getItem("user"));

          eLearnerAppConfig.user.loggedIn = true;
          eLearnerAppConfig.user.name = user.name;
          eLearnerAppConfig.user.displayName = user.displayName;
          eLearnerAppConfig.user.isAdmin = user.isAdmin;
        }
        else {
          $location.path("/");
        }
      }
    }

    function logOut() {
      sessionStorage.removeItem("user");

      basevm.app.user.loggedIn = false;
      basevm.app.user.name = null;
      basevm.app.user.displayName = null;
      basevm.app.user.isAdmin = false;

      $location.path("/");
    }
  }
})();
