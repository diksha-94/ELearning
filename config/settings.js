module.exports.settings = {
  byPassAuthentication: true,
  appAdmins: ["sunil"],
  ldap: {
    url: 'ldap://ustdevdcpw001.ustdev.com',
    baseDn: 'dc=ustdev,dc=com',
    adminDn: 'walmartlearner@ustdev.com',
    adminPassword: 'W@lm@rT@123#',
    checkUserGroup: true,
    groupName: 'Walmart.Engagement'
  }
};
