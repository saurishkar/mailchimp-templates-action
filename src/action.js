const mailchimp = require("@mailchimp/mailchimp_transactional");
const core = require("@actions/core");

async function callPing() {
  const mandrillKey = core.getInput("mandrill_key");
  const mandrillClient = mailchimp(mandrillKey);
  const response = await mandrillClient.users.ping();
  console.log(response);
}

callPing();
