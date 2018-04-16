(function () {
  'use strict'

  angular
    .module("elearnerApp")
    .directive("quizManager", quizManager);

  function quizManager() {
    var quizDdo = {
      restrict: "E",
      scope: {
        quiz: "=",
        activeUser: "@",
        courseName: "@",
        onReviewCourse: "&",
        onQuizCompleted: "&"
      },
      templateUrl: "js/app/directives/quizManager.html",
      controller: quizController,
      controllerAs: "qzvm",
      bindToController: true
    }

    function quizController() {
      var qzvm = this;
      var questionIndex = 0;
      //var quizBackUp = angular.copy(qzvm.quiz);

      qzvm.totalQuestions = qzvm.quiz.questions.length;
      qzvm.quizStarted = false;
      qzvm.quizFinished = false;
      qzvm.activeQuestion = null;

      qzvm.startQuiz = function() {
        qzvm.quizStarted = true;
        qzvm.quiz.started = true;
        qzvm.quiz.ended = false;

        var no = 0;
        angular.forEach(qzvm.quiz.questions, function(question){
          question.number = ++no;
        });

        setActiveQuestion();
      }

      qzvm.nextQuestion = function () {
        questionIndex++;

        if (questionIndex < qzvm.quiz.questions.length) {
          setActiveQuestion();
        }
        else {
          qzvm.finishQuiz();
        }
      }

      qzvm.previousQuestion = function () {
        if (questionIndex !== 0) {
          questionIndex--;
          setActiveQuestion();
        }
      }

      qzvm.finishQuiz = function () {
        qzvm.quizFinished = true;
        qzvm.quiz.started = false;
        qzvm.quiz.ended = true;

        var correctlyAnswered = 0;
        angular.forEach(qzvm.quiz.questions, function (question) {
          question.answered = true;

          if (question.selectedAnswer === question.answer) {
            question.answeredCorrectly = true;
            correctlyAnswered++;
          }
          else {
            question.answeredCorrectly = false;
          }
        });

        qzvm.quiz.score = Math.round((correctlyAnswered / qzvm.totalQuestions) * 100);

        if (qzvm.quiz.score < qzvm.quiz.passPercentage) {
          qzvm.quiz.passed = false;
        }
        else {
          qzvm.quiz.passed = true;
        }

        if(qzvm.onQuizCompleted) {
          qzvm.onQuizCompleted();
        }
      }

      qzvm.resetQuiz = function () {
        qzvm.quiz = angular.copy(quizBackUp);

        qzvm.quiz.started = true;
        qzvm.quiz.ended = false;
        qzvm.quizStarted = false;

        qzvm.quizFinished = false;
        qzvm.activeQuestion = null;
        questionIndex = 0;
      }

      qzvm.reviewCourse = function () {
        if(qzvm.onReviewCourse !== null) {
          qzvm.onReviewCourse();
        }
      }

      function setActiveQuestion() {
        qzvm.activeQuestion = qzvm.quiz.questions[questionIndex];
      }
    }

    return quizDdo;
  }
})();
