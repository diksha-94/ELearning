(function(){
  'use strict'

  angular
    .module("elearnerApp")
    .controller("certificateController", certificateController);

  certificateController.$inject = ["$scope", "eLearnerAppConfig", "page"];

  function certificateController($scope, eLearnerAppConfig, page) {
    var certvm = this;

    $scope.validateUser();
    eLearnerAppConfig.activePage = page.certificate;

    certvm.app = eLearnerAppConfig;
    certvm.getCertificationImageUrl = getCertificationImageUrl;

    function getCertificationImageUrl(level) {
      if(level === 'bronze'){
        return 'images/bronse_prize.png';
      }
      else if(level === 'silver') {
        return 'images/diamound_prize.png';
      }
      else if(level === 'gold') {
        return 'images/gold_prize.png';
      }
      else {
        return '';
      }
    }
  }
})();
