const mailchimp = require("@mailchimp/mailchimp_transactional");
const core = require("@actions/core");

let mandrillClient;

const updateTemplates = async () => {
  const name = core.getInput("template_name");
  const content = core.getInput("template_content");
  const response = await mandrillClient.templates.update({
    name,
    code: content,
    publish: true,
  });
  return response;
};

async function callPing() {
  const mandrillKey = core.getInput("mandrill_key");
  mandrillClient = mailchimp(mandrillKey);
  const response = await mandrillClient.users.ping();
  console.log("----------------------");
  console.log(response);
  console.log("----------------------");
  const updateResponse = await updateTemplates();
  console.log(updateResponse);
}

callPing(); // if mandrill works, it will return "PONG!"
