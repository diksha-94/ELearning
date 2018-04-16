(function () {
  angular.module("elearnerApp")
    .factory("elearnerRuntimeService", elearnerRuntimeService);

  elearnerRuntimeService.$inject = ["$timeout"];

  function elearnerRuntimeService($timeout) {

    var navigation = {
      list: [],
      index: 0,
      defaultAutoPlayTime: 5
    }

    var metadata = {
      status: 0,
      totalChapters: 0,
      totalRead: 0,
      reviews: 0,
      quizAttempts: 0,
      quizPassed: null,
      quizPercentage: 0
    }

    var timerVar = null;

    var api = {
      activePage: null,
      activeQuiz: null,
      assets: {},
      manifest: null,
      autoPlay: false,
      metadata: metadata,
      started: false,
      loadCourse: loadCourse,
      unloadCourse: unloadCourse,
      reviewCourse: reviewCourse,
      updateQuizDetails: updateQuizDetails,
      loadCourseProgress: loadCourseProgress,
      getCourseProgress: getCourseProgress,
      navigateToNext: navigateToNext,
      navigateToPrevious: navigateToPrevious,
      navigateTo: navigateTo,
      startAutoPlay: startAutoPlay,
      stopAutoPlay: stopAutoPlay,
      loadQuiz: loadQuiz,
      reviewTest: reviewTest,
      getQuizDetails: null
    }

    function loadCourse(courseManifest) {
      api.manifest = courseManifest;
      populateCourseAttributes();
    }

    function unloadCourse() {
      clearCourseAttributes();
    }

    function reviewCourse() {
      metadata.reviews++;

      angular.forEach(navigation.list, function(chapter) {
        chapter.hasRead = false;
        chapter.selected = false;
      });

      timerVar = null;
      navigation.index = 0;
      api.autoPlay = false;

      api.activePage = null;
      api.activeQuiz = null;
      metadata.totalRead = 0;
      if(metadata.status === 2) {
        metadata.status = 1;
      }

      navigateTo(navigation.list[0]);
    }

    function updateQuizDetails() {
      if(api.activeQuiz) {
        metadata.quizAttempts++;
        metadata.quizPassed = api.activeQuiz.passed;
        metadata.quizPercentage =  api.activeQuiz.score;

        if(metadata.quizPassed) {
          metadata.status = 4;
        }
        else {
          metadata.status = 3;
        }
      }
    }

    function navigateToNext() {
      setActivePage(navigation.list[++navigation.index]);

      if (api.autoPlay === true && !api.activePage.isLastPage) {
        startAutoPlay();
      }
      if (api.autoPlay === true && api.activePage.isLastPage) {
        stopAutoPlay();
      }
    }

    function navigateToPrevious() {
      setActivePage(navigation.list[--navigation.index]);
    }

    function navigateTo(chapter) {
      setActivePage(chapter);
      var chapterIndex = navigation.list.indexOf(chapter);
      navigation.index = chapterIndex;

      if (api.autoPlay) {
        api.stopAutoPlay();
      }
    }

    function loadCourseProgress(progress) {
      if (progress) {
        var chapter = getChapterById(progress.activePageId);
        api.navigateTo(chapter);
        api.started = progress.started;

        angular.forEach(navigation.list, function (chapter) {
          if (progress.chaptersRead.indexOf(chapter.id) !== -1) {
            chapter.hasRead = true;
          }
        });

        metadata.status = progress.metadata.status;
        metadata.totalChapters = progress.metadata.totalChapters;
        metadata.totalRead = progress.metadata.totalRead;
        metadata.reviews = progress.metadata.reviews;
        metadata.quizAttempts = progress.metadata.quizAttempts;
        metadata.quizPassed = progress.metadata.quizPassed;
        metadata.quizPercentage = progress.metadata.quizPercentage;
      }
      else {
        metadata.status = 1;
        metadata.totalChapters = navigation.list.length;
        setActivePage(navigation.list[navigation.index]);
      }
    }

    function getCourseProgress() {
      var progress = {
        activePageId: api.activePage.id,
        dateTime: new Date(),
        chaptersRead: [],
        started: api.started
      }

      angular.forEach(navigation.list, function (chapter) {
        if (chapter.hasRead) {
          progress.chaptersRead.push(chapter.id);
        }
      });

      progress.metadata = metadata;
      return progress;
    }

    /**
     * Local Functions
     */

    function populateCourseAttributes() {
      setAbsoluteUrls();
      setNavigationOptions();
    }

    function clearCourseAttributes() {
      timerVar = null;
      navigation.list = [];
      navigation.index = 0;
      api.autoPlay = false;

      api.activePage = null;
      api.activeQuiz = null;
      api.assets = {};
      api.manifest = null;

      api.started = false;
      clearCourseMetadata();
    }

    function clearCourseMetadata() {
      metadata.status = 0;
      metadata.totalChapters = 0;
      metadata.totalRead = 0;
      metadata.reviews = 0;
      metadata.quizAttempts = 0;
      metadata.quizPassed = null;
      metadata.quizPercentage = 0;
    }

    function setNavigationOptions() {
      api.manifest.isFirstPage = true;

      var chaptersCount = api.manifest.chapters.length;
      var lastChapter = api.manifest.chapters[chaptersCount - 1];

      if (lastChapter.chapters && lastChapter.chapters.length > 0) {
        chaptersCount = lastChapter.chapters.length;
        lastChapter = lastChapter.chapters[chaptersCount - 1];
        lastChapter.isLastPage = true;
      }
      else {
        lastChapter.isLastPage = true;
      }

      var no = 0;
      angular.forEach(navigation.list, function(item){
        item.pageNo = ++no;
      });
    }

    function setAbsoluteUrls() {
      var url = "courses/" + api.manifest.id + "/";
      api.manifest.absUrl = url + api.manifest.url;
      navigation.list.push(api.manifest);

      if (api.manifest.assets && api.manifest.assets) {
        setAssetsAbsUrls(url, api.manifest.assets);
      }

      if (api.manifest.chapters && api.manifest.chapters.length > 0) {
        setChaptersAbsUrls(url, api.manifest.chapters);
      }
    }

    function setChaptersAbsUrls(urlPrecedence, chapters) {
      angular.forEach(chapters, function (chapter) {
        navigation.list.push(chapter);
        chapter.absUrl = urlPrecedence + chapter.url;
        if (chapter.assets && chapter.assets.length > 0) {
          setAssetsAbsUrls(urlPrecedence, chapter.assets);
        }

        if (chapter.chapters && chapter.chapters.length > 0) {
          setChaptersAbsUrls(urlPrecedence, chapter.chapters);
        }
      });
    }

    function setAssetsAbsUrls(urlPrecedence, assets) {
      angular.forEach(assets, function (asset) {
        asset.absUrl = urlPrecedence + asset.value;
        api.assets[asset.key] = asset.absUrl;
      });
    }

    function startAutoPlay() {

      var timeSpan = null;
      if (api.activePage && api.activePage.duration && api.activePage.duration !== 0) {
        timeSpan = api.activePage.duration * 1000;
      }
      else {
        timeSpan = navigation.defaultAutoPlayTime * 1000;
      }

      api.autoPlay = true;
      timerVar = $timeout(api.navigateToNext, timeSpan);
    }

    function stopAutoPlay() {
      api.autoPlay = false;
      $timeout.cancel(timerVar);
    }

    function setActivePage(activePage) {
      if (activePage) {
        if (api.activePage) {
          api.activePage.selected = false;
          if (!api.activePage.hasRead) {
            metadata.totalRead++;
          }

          api.activePage.hasRead = true;
        }

        api.activePage = activePage;
        api.activePage.selected = true;

        if(metadata.totalRead === metadata.totalChapters - 1 &&
          !navigation.list[metadata.totalChapters - 1].passed &&
          metadata.status === 1) {
          metadata.status = 2;
        }
      }
    }

    function reviewTest() {
      loadQuiz();
    }

    function loadQuiz() {
      var url = "courses/" + api.manifest.id + "/" + api.manifest.quiz.url;
      return api.getQuizDetails(url)
        .then(
          function (data) {
            if (data) {
              api.activeQuiz = data;

              angular.forEach(api.activeQuiz.questions, function(question){
                question.getQuestionsAnswer = getQuestionsAnswer;
              });

              if(metadata.quizAttempts > 0){
                api.activeQuiz.score = metadata.quizPercentage;
              }
              else {
                api.activeQuiz.score = 0;
              }

              return true;
            }
            else {
              return false;
            }
          }
        )
        .catch(
          function (error) {
            return false;
          }
        )
    }

    function getQuestionsAnswer(question) {
      var answer = 'Not Answered';
      if(question.selectedAnswer) {
        angular.forEach(question.options, function(option){
          if(question.selectedAnswer === option.id) {
            answer = option.text;
          }
        });
      }

      return answer;
    }

    function getChapterById(chapterId) {
      var chapter = null;
      for (var i = 0; i < navigation.list.length; i++) {
        if (navigation.list[i].id === chapterId) {
          chapter = navigation.list[i];
          break;
        }
      }

      return chapter;
    }

    return api;
  }
})();
