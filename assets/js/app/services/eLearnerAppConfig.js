(function () {
  'use strict'

  angular
    .module("elearnerApp")
    .factory("eLearnerAppConfig", config);

  function config() {
    var config = {
      activePage: null,
      user: {
        loggedIn: false,
        name: null,
        displayName: null,
        isAdmin: false
      },
      activeCourse: null,
      course: {
        showSideBar: false,
        showSideBarToggle: false,
        showNavBar: false,
        started: false
      }
    }

    return config;
  }
})();
