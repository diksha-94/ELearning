/**
 * LoginController
 *
 * @description :: Server-side logic for managing Logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var ActiveDirectory = require('activedirectory');

module.exports = {
  login: function(req, res) {

    var uid = req.param("userId");
    var password = req.param("password");
    var userRole = "user";

    if(sails.config.settings.appAdmins.indexOf(uid) !== -1) {
      userRole = "admin";
    }

    if(sails.config.settings.byPassAuthentication) {

      if(uid === password) {
        return res.send({ userId: uid, displayName: uid, userRole: userRole });
      }
      else {
        res.status(401);
        return res.send("Unauthorized");
      }
    }
    else {
      try {
        var config = { url: sails.config.settings.ldap.url,
          baseDN: sails.config.settings.ldap.baseDn,
          username: sails.config.settings.ldap.adminDn,
          password: sails.config.settings.ldap.adminPassword };

        var ad = new ActiveDirectory(config);
        var username = uid + '@ustdev.com';

        ad.authenticate(username, password, function(err, auth) {
          if (err) {
            console.log('ERROR: '+ JSON.stringify(err));
            res.status(401);
            return res.send("Unauthorized");
          }

          if (auth) {
            console.log('Authenticated!');

            if (sails.config.settings.ldap.checkUserGroup === true) {
              console.log('Check ad group validity');
              ad.isUserMemberOf(username, sails.config.settings.ldap.groupName, function(err, isMember) {
                if (err || isMember === false) {
                  console.log('ERROR: ' +JSON.stringify(err));
                  res.status(401);
                  return res.send("Unauthorized");
                }
                else {
                  ad.findUser(username, function(err, user) {
                    if (err) {
                      console.log('ERROR: ' + JSON.stringify(err));
                      res.status(401);
                      return res.send("Unauthorized");
                    }

                    if (user){
                      console.log(JSON.stringify(user));
                      return res.send({ userId: user.sAMAccountName, displayName: user.cn, userRole: userRole });
                    }
                  });
                }
              });
            }
            else {
              ad.findUser(username, function(err, user) {
                if (err) {
                  console.log('ERROR: ' + JSON.stringify(err));
                  res.status(401);
                  return res.send("Unauthorized");
                }

                if (user){
                  console.log(JSON.stringify(user));
                  return res.send({ userId: user.sAMAccountName, displayName: user.cn, userRole: userRole });
                }
              });
            }
          }
          else {
            console.log('Authentication failed!');
            res.status(401);
            return res.send("Unauthorized");
          }
        });
      }
      catch(ex) {
        console.log(ex);
        res.status(401);
        return res.send("Unauthorized");
      }
    }
  }
};
