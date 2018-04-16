(function () {
  angular.module("elearnerApp")
    .factory("adminService", adminService);

  adminService.$inject = ["$http", "elearnerService"];

  function adminService($http, elearnerService) {
    var api = {
      courses: [],
      results: null,
      getCourses: getCourses,
      getResult: getResult,
      exportResults: exportResults
    }

    return api;

    function getCourses() {
      var request = {
        method: "GET",
        url: "courses/all"
      }

      $http(request)
        .then(
          function (response) {
            api.courses = response.data;
          }
        )
        .catch(
          function () {
            api.courses = null;
          }
        );
    }

    function exportResults() {
      if(api.results) {
        var content = "data:text/csv;charset=utf-8,SL.No, ID, Quiz Attempts, Quiz Passed, Marks";
        var slno = 0;

        angular.forEach(api.results.list, function(item){
          content = content + "\n";
          slno++;

          var record = slno + "," + item.userId + "," + item.quizAttempts + "," + item.quizPassed + "," + item.quizPercentage;
          content = content + record;
        });

        var encodedUri = encodeURI(content);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", api.results.name + ".csv");

        link.click();
      }
    }

    function getResult(course) {
      var request = {
        method: "GET",
        url: "admin/course/results",
        params: {courseId: course.id}
      }

      $http(request)
        .then(
          function(res) {
            api.results = {
              id: course.id,
              name: course.name,
              list: res.data
            }
          }
        )
        .catch(
          function(err) {
            api.results = null;
          }
        )
    }
  }
})();
