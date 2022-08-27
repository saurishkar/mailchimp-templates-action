const mailchimp = require("@mailchimp/mailchimp_transactional")("YOUR_API_KEY");

async function callPing() {
  const response = await mailchimp.users.ping();
  console.log(response);
}

callPing();
