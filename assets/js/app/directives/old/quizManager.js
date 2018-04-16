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
        onReviewCourse: "&",
        onQuizCompleted: "&",
        onExitCourse: "&"
      },
      templateUrl: "js/app/directives/quizManager.html",
      controller: quizController,
      controllerAs: "qzvm",
      bindToController: true
    }

    function quizController() {
      var qzvm = this;
      var questionIndex = 0;
      var quizBackUp = angular.copy(qzvm.quiz);

      qzvm.quizStarted = false;
      qzvm.quizFinished = false;
      qzvm.activeQuestion = null;

      qzvm.startQuiz = function () {
        qzvm.quizStarted = true;
        qzvm.quiz.started = true;
        qzvm.quiz.ended = false;
        setActiveQuestion();
      }

      qzvm.nextQuestion = function () {
        questionIndex++;

        if (questionIndex === qzvm.quiz.questions.length) {
          qzvm.finishQuiz();
        }
        else {
          setActiveQuestion();
        }
      }

      qzvm.validateActiveQuestion = function () {
        qzvm.activeQuestion.answered = true;

        if (qzvm.activeQuestion.selectedAnswer === qzvm.activeQuestion.answer) {
          qzvm.activeQuestion.answeredCorrectly = true;

          document.getElementById("correctSound").src = "app/directives/sound/applause.mp3";
          document.getElementById("right").load();
        }
        else {
          qzvm.activeQuestion.answeredCorrectly = false;

          document.getElementById("incorrectSound").src = "app/directives/sound/noSound.mp3";
          document.getElementById("wrong").load();
        }
      }

      qzvm.validateQuestions = function () {
        angular.forEach(qzvm.quiz.questions, function (question) {
          question.answered = true;

          if (question.selectedAnswer === question.answer) {
            question.answeredCorrectly = true;
          }
          else {
            question.answeredCorrectly = false;
          }
        });

        qzvm.submitted = true;
      }

      qzvm.getCorrectAnswer = function (question) {
        var correctAnswer = null;
        var targetQuestion = null;

        if (question) {
          targetQuestion = question;
        }
        else {
          targetQuestion = qzvm.activeQuestion;
        }

        for (var i in targetQuestion.options) {
          if (targetQuestion.answer === targetQuestion.options[i].id) {
            correctAnswer = targetQuestion.options[i].text;
            break;
          }
        }

        return correctAnswer;
      }

      qzvm.isWizardMode = function () {
        return qzvm.quiz.mode === "wizard";
      }

      qzvm.finishQuiz = function () {
        qzvm.quizFinished = true;
        qzvm.quiz.started = false;
        qzvm.quiz.ended = true;
        var totalQuestions = qzvm.quiz.questions.length;
        var correctlyAnswered = 0;

        angular.forEach(qzvm.quiz.questions, function (question) {
          if (question.answeredCorrectly) {
            correctlyAnswered++;
          }
        });

        qzvm.quiz.score = Math.round((correctlyAnswered / totalQuestions) * 100);

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

      qzvm.exitCourse = function() {
        if(qzvm.onExitCourse) {
          qzvm.onExitCourse();
        }
      }

      function setActiveQuestion() {
        qzvm.activeQuestion = qzvm.quiz.questions[questionIndex];
      }
    }

    return quizDdo;
  }
})();
