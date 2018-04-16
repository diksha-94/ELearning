/**
 * CoursesController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fileSystem = require("fs");

module.exports = {



  /**
   * `CoursesController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },

  getAll: function (req, res) {
    var courses = [];
    
    try {
      var user = req.param("user");
      var fileExists = fileSystem.existsSync("repo/courses/courses.json");

      if (fileExists) {
        var result = fileSystem.readFileSync("repo/courses/courses.json");
        courses = JSON.parse(result.toString());
      }
    }
    catch(ex) {
      console.log(ex);
    }

    return res.send(courses);
  },

  /**
   * `CoursesController.find()`
   */
  find: function (req, res) {
    var courses = [];
    try{
      var user = req.param("user");
      var fileExists = fileSystem.existsSync("repo/courses/courses.json");

      if(fileExists) {
        var result = fileSystem.readFileSync("repo/courses/courses.json");
        courses = JSON.parse(result.toString());

        var coursesCount = courses.length;
        var course = null;
        for(var i=0;i<coursesCount;i++) {
          course = courses[i];

          var fileExists = fileSystem.existsSync("repo/"+course.id+"_"+user+".json");

          if(fileExists) {
            var progress = fileSystem.readFileSync("repo/"+course.id+"_"+user+".json");
            course.metadata = JSON.parse(progress).metadata;
          }
          else {
            course.metadata = null;
          }
        }
      }
    }
    catch(ex) {
      console.log(ex);
    }

    return res.send(courses);
  },

  getStatus: function (req, res) {

    var result = null;
    try{
      var key = req.param("key");
      var fileExists = fileSystem.existsSync("repo/"+key+".json");

      if(fileExists) {
        result = fileSystem.readFileSync("repo/"+key+".json");
      }
    }
    catch(ex) {
      console.log(ex);
    }

    return res.send(result);
  },

  setStatus: function (req, res) {
    var result = null;
    try{
      var user = req.param("user");
      var courseId = req.param("courseId");
      var progress = req.param("progress");
      var progressFileKey = courseId + "_" + user;

      fileSystem.writeFileSync("repo/"+progressFileKey+".json", JSON.stringify(progress));

      var recentCoursesUrl = "repo/dashboard/recent_"+user+".json";
      var recentFileExists = fileSystem.existsSync(recentCoursesUrl);

      var recentList;
      if(recentFileExists){
        recentList = JSON.parse(fileSystem.readFileSync(recentCoursesUrl));

        var targetIndex = recentList.indexOf(courseId);
        if(targetIndex !== -1) {
          recentList.splice(targetIndex, 1);
          recentList.splice(0, 0, courseId);
        }
        else {
          if(recentList.length < 4) {
            recentList.splice(0, 0, courseId);
          }
          else {
            recentList.pop();
            recentList.splice(0, 0, courseId);
          }
        }
      }
      else {
        recentList = [courseId];
      }

      fileSystem.writeFileSync(recentCoursesUrl, JSON.stringify(recentList));

      result = "success";
    }
    catch(ex) {
      console.log(ex);
      result = "failed";
    }

    return res.send({status:result});
  }

};

