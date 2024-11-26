const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: "AX2UiE-s8QtFWmpyjXkXRruvYiP8wdy8XMMDrIKOqYk2e8W-gDrzf6UnB0jWXeyTFl-WIUNuBDmJDpI0",
  client_secret: "EOLovUqU_W6SKLH4A4vlRReig2JytVHc19AUb4zmPfRYgMfsG06SQc1M8uJUaFN03xeSUxk4_VDspfYm",   
});

module.exports = paypal;
