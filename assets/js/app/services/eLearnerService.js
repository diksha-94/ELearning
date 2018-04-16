(function () {
  angular.module("elearnerApp")
    .factory("elearnerService", learnerService);

  learnerService.$inject = ["$http", "$q", "$filter"];

  function learnerService($http, $q, $filter) {
    var api = {
      getDashboardDetails: getDashboardDetails,
      getFurtherReading: getFurtherReading,
      getCourses: getCourses,
      getCourse: getCourse,
      setCourseProgress: setCourseProgress,
      getCourseProgress: getCourseProgress,
      getQuiz: getQuiz,
      login: login
    }

    function login(userId, password) {
      var request = {
        method: "POST",
        url: "/login",
        data: {userId:userId, password:password}
      }

      return $http(request)
        .then(
          function(res) {
            if(res.data) {
              return res.data;
            }

            return null;
          }
        )
        .catch(
          function() {
            return null;
          }
        )
    }

    function getDashboardDetails(userId) {
      var request = {
        method: "GET",
        url: "/dashboard/courses",
        params: {user: userId}
      }

      return $http(request)
        .then(
          function (response) {
            var result = null;

            if(response.data) {
              result = {};
              result.medal = response.data.medal;
              result.courses = response.data.courses;
              result.recent = $filter("propertyFilter")(result.courses, "recent");
            }

            return result;
          }
        )
        .catch(
          function() {
            return null;
          }
        );
    }

    function getFurtherReading() {
      var request = {
        method: "GET",
        url: "/dashboard/reading"
      }

      return $http(request)
        .then(
          function(response) {
            return $filter("arrayDividerFilter")(response.data, 4);
          }
        )
        .catch(
          function() {
            return null;
          }
        );
    }

    function getCourses(userId) {
      var request = {
        method: "GET",
        url: "courses/find",
        params: {user: userId}
      }

      return $http(request)
        .then(
          function (response) {
            return response.data;
          }
        )
        .catch(
          function () {
            return null;
          }
        );
    }

    function getCourse(course, key) {
      var results = $q.all([getManifest(course.manifest), getCourseProgress(course.id, key)]);

      return results.then(
        function (responses) {
          var courseResponse = responses[0];
          var courseProgressResponse = responses[1];

          return {
            course: courseResponse.data,
            progress: courseProgressResponse
          }
        }
        )
        .catch(
          function (error) {
            return null;
          }
        )
    }

    function getQuiz(quizUrl) {
      return $http(
          {
            method: 'GET',
            url: quizUrl
          }
        )
        .then(
          function (response) {
            return response.data;
          }
        )
        .catch(
          function (error) {
            return null;
          }
        )
    }

    function getManifest(manifestUrl) {
      var request = {
        method: "GET",
        url: "courses/" + manifestUrl
      }

      return $http(request);
    }

    function setCourseProgress(courseId, user, value) {

      var request = {
        method: "POST",
        url: "course/status",
        data: {user: user, courseId: courseId, progress:value}
      }

      return $http(request)
        .then(
          function(response) {
            return true;
          }
        )
        .catch(
          function(ex) {
            return false;
          }
        )
    }

    function getCourseProgress(courseId, key) {
      var dataKey = courseId + "_" + key;

      var request = {
        method: "GET",
        url: "course/status",
        params: {key: dataKey}
      }

      return $http(request)
        .then(
          function(response) {
            return response.data;
          }
        )
        .catch(
          function(ex) {
            return null;
          }
        )
    }

    return api;
  }
})();
