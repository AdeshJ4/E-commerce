const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: "AX2JJEhn-jqxDhC5udgLWMee-iDGBxSfjWNhkXG3RdM5SnHwhLoxB9_2qhQt8blB7hrPKdta1nUTY3Oa",
  client_secret: "EAFYmeJwCFj4yRV7glpu06SEIUYJzSPld8DqWx709UxlInyWLKSvV6rCxwBnyvxhu7gfNSl_6St1ccRV",   
});

module.exports = paypal;
