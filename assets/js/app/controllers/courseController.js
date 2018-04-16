(function () {
  "use strict"

  angular
    .module("elearnerApp")
    .controller("courseController", courseController);

  courseController.$inject = ["$scope", "$location", "elearnerRuntimeService", "elearnerService", "eLearnerAppConfig"];

  function courseController($scope, $location, elearnerRuntimeService, elearnerService, eLearnerAppConfig) {

    var cvm = this;

    $scope.validateUser();

    cvm.showTestDetails = false;
    cvm.application = eLearnerAppConfig;
    cvm.toggleSideBar = toggleSideBar;
    cvm.onNextClick = onNextClick;
    cvm.onPreviousClick = onPreviousClick;
    cvm.isFirstPage = isFirstPage;
    cvm.isLastPage = isLastPage;
    cvm.getCourseAudio = getCourseAudio;
    cvm.showCourseChapters = showCourseChapters;
    cvm.showCourseQuiz = showCourseQuiz;
    cvm.showCourseQuizResult = showCourseQuizResult;
    cvm.loadQuiz = loadQuiz;
    cvm.reviewCourse = reviewCourse;
    cvm.reviewTest = reviewTest;
    cvm.unloadCourse = unloadCourse;
    cvm.showDetailedTestResults = showDetailedTestResults;

    function showDetailedTestResults() {
      cvm.showTestDetails = true;
    }

    function reviewCourse() {
      $scope.course.reviewCourse();
    }

    function reviewTest() {
      $scope.course.reviewTest();
    }

    function loadQuiz() {
      cvm.showTestDetails = false;
      $scope.course.loadQuiz()
        .then(
          function(quizLoaded) {
            if(quizLoaded) {
              cvm.application.showSideBar = false;
              cvm.application.showNavBar = false;
              cvm.application.showSideBarToggle = false;
            }
          }
        )
    }

    function showCourseChapters() {
      if($scope.course) {
        return (($scope.course.activePage.type === 'page' || $scope.course.activePage.type === 'intro-page')
        && $scope.course.activeQuiz === null)
      }
    }

    function showCourseQuiz() {
      if($scope.course) {
        return $scope.course.activeQuiz !== null && $scope.course.activeQuiz.passed === undefined;
      }
    }

    function showCourseQuizResult() {
      if($scope.course) {
        return $scope.course.activeQuiz !== null && $scope.course.activeQuiz.passed !== undefined;
      }
    }

    function getCourseAudio() {
      if($scope.course && $scope.course.activePage.audio) {
        return $scope.course.assets[$scope.course.activePage.audio.key];
      }
      
      return "";
    }

    function toggleSideBar() {
      cvm.application.showSideBar = !cvm.application.showSideBar;
    }

    $scope.course = null;
    $scope.scrollToTop();
    elearnerRuntimeService.getQuizDetails = getQuizDetails;
    loadCourse();

    function loadCourse() {
      if (cvm.application.activeCourse !== null) {
        elearnerService.getCourse(cvm.application.activeCourse, cvm.application.user.name)
          .then(
            function (data) {
              if (data) {
                elearnerRuntimeService.loadCourse(data.course);
                elearnerRuntimeService.loadCourseProgress(data.progress);

                $scope.course = elearnerRuntimeService;
                cvm.application.showSideBar = $scope.course.started;
                cvm.application.showNavBar = $scope.course.started;
                cvm.application.showSideBarToggle = $scope.course.started;
              }
            }
          )
          .catch(
            function (error) {
            }
          )
          .finally(
            function () {
            }
          )
      }
      else {
        $location.path("/home");
      }
    }

    $scope.startCourse = function() {
      $scope.course.started = true;
      cvm.application.showSideBar = true;
      cvm.application.showNavBar = true;
      cvm.application.showSideBarToggle = true;
      onNextClick();
    }

    function unloadCourse() {
      var progress = elearnerRuntimeService.getCourseProgress();
      elearnerService.setCourseProgress(elearnerRuntimeService.manifest.id, cvm.application.user.name, progress)
        .then(
          function(saved) {
            if(saved) {
              cvm.application.activeCourse = null;
              $scope.course.autoPlay = false;
              $scope.course = null;
              elearnerRuntimeService.unloadCourse();

              cvm.application.course.showSideBar = false;
              cvm.application.course.showSideBarToggle = false;
              cvm.application.course.showNavBar = false;
              cvm.application.course.started = false;

              $location.path("/courses");
            }
          }
        );
    }

    $scope.onChapterSelected = function (chapter) {
      $scope.course.navigateTo(chapter);
    }

    function onPreviousClick() {
      if(!isFirstPage()) {
        if ($scope.course.autoPlay) {
          $scope.course.autoPlay = false;
        }

        $scope.course.navigateToPrevious();
      }
    }

    function onNextClick() {
      if(!isLastPage()) {
        if ($scope.course.autoPlay) {
          $scope.course.autoPlay = false;
        }

        $scope.course.navigateToNext();
      }
    }

    function isFirstPage() {
      if($scope.course){
        return $scope.course.activePage.isFirstPage && $scope.course.activePage.isFirstPage === true;
      }
    }

    function isLastPage () {
      if($scope.course) {
        return $scope.course.activePage.isLastPage && $scope.course.activePage.isLastPage === true;
      }
    }

    $scope.$on("onCourseClose", unloadCourse);

    $scope.$watch("course.autoPlay", function () {
      if ($scope.course) {
        if ($scope.course.autoPlay === true) {
          $scope.course.startAutoPlay();
        }
        else {
          $scope.course.stopAutoPlay();
        }
      }
    });

    $scope.quizCompleted = function() {
      $scope.course.updateQuizDetails();
    }

    function getQuizDetails(url) {
      return elearnerService.getQuiz(url);
    }
  }
})();
