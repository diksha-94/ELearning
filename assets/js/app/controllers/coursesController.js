(function(){
  "use strict"

  angular
    .module("elearnerApp")
    .controller("coursesController", coursesController);

  coursesController.$inject = ["$scope", "$location", "elearnerService", "eLearnerAppConfig", "page"];

  function coursesController($scope, $location, elearnerService, eLearnerAppConfig, page) {

    var csvm = this;

    $scope.validateUser();

    csvm.dashboard = {
      recent: [],
      courses: [],
      reading: []
    };

    csvm.launchCourse = launchCourse;
    csvm.getCourseStatusIcon = getCourseStatusIcon;
    csvm.getTestStatusIcon = getTestStatusIcon;

    eLearnerAppConfig.activePage = page.courses;

    init();

    function launchCourse (course) {
      eLearnerAppConfig.activeCourse = course;
      $location.path("/course");
    }

    function getCourseStatusIcon (courseStatus) {
      var url = "images/";

      if(courseStatus === 0) {
        return url + "empty.png";
      }
      else if(courseStatus === 1) {
        return url + "quarter.png";
      }
      else if(courseStatus === 2) {
        return url + "half.png";
      }
      else if(courseStatus === 3) {
        return url + "quarter_01.png";
      }
      else if(courseStatus === 4) {
        return url + "full.png";
      }
    }

    function getTestStatusIcon (testStatus) {
      var url = "images/";

      if(testStatus === 0) {
        return url + "empty.png";
      }
      else if(testStatus === 1) {
        return url + "half.png";
      }
      else if(testStatus === 2) {
        return url + "full.png";
      }
    }

    function init() {
      loadDashboard();
      loadFurtherReading();
    }

    function loadDashboard() {
      elearnerService.getDashboardDetails(eLearnerAppConfig.user.name)
        .then(
          function (data) {
            if(data) {
              $scope.badge.status = data.medal;
              csvm.dashboard.recent = data.recent;
              csvm.dashboard.courses = data.courses;
            }
          }
        );
    }

    function loadFurtherReading() {
      elearnerService.getFurtherReading()
        .then(
          function (data) {
            csvm.dashboard.reading = data;
          }
        )
    }
  }
})();
