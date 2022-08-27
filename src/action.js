const mailchimp = require("@mailchimp/mailchimp_transactional");
const core = require("@actions/core");

let mandrillClient;
const mandrillKey = core.getInput("mandrill_key");
const templateName = core.getInput("template_name");
const templateCode = core.getInput("template_content");
const templateSubject = core.getInput("template_subject");

const validatePrimaryInputs = () => {
  if(!templateName) {
    throw Error("Template Name is Required");
  }
  if(!templateCode) {
    throw Error("Template Code cannot be blank");
  }
}

const addAndPublishTemplate = async() => {
  if(!templateSubject) {
    throw Error("Subject is required for adding a new template");
  }
  const response = await mandrillClient.templates.add({
    name: templateName,
    code: templateCode,
    publish: true,
    subject: templateSubject
  });
  return response;
}

const updateAndPublishTemplate = async () => {
  const response = await mandrillClient.templates.update({
    name: templateName,
    code: templateCode,
    publish: true,
  });
  return response;
};

const findTemplate = async() => {
  const response = await mandrillClient.templates.info({
    name: templateName,
  });
  return response;
}

async function callPing() {
  validatePrimaryInputs();
  mandrillClient = mailchimp(mandrillKey);
  const response = await mandrillClient.users.ping();
  console.log("----------------------");
  console.log(response);
  console.log("----------------------");
  console.log("\n");
  console.log("----------------------");
  console.log("Check for template");
  console.log("----------------------");
  console.log("\n");
  const { status: getTemplateStatus } = findTemplate();

  if(getTemplateStatus === 200) { // Template Found
    console.log("----------------------");
    console.log("Found Template, Updating and Publishing...");
    console.log("----------------------");
    console.log("\n");
    const updateResponse = await updateAndPublishTemplate();
    console.log(updateResponse);
  } else { // Template Does not exist
    console.log("----------------------");
    console.log("Template Not Found, Adding New Template...");
    console.log("----------------------");
    console.log("\n");
    const updateResponse = await addAndPublishTemplate();
    console.log(updateResponse);
  }
}

callPing(); // if mandrill works, it will return "PONG!"
