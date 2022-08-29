const mailchimp = require("@mailchimp/mailchimp_transactional");
const core = require("@actions/core");
const fs = require("fs");
const path = require("path");

let mandrillClient;

const addAndPublishTemplate = async ({ name, content }) => {
  const response = await mandrillClient.templates.add({
    name,
    code: content,
    publish: true,
  });
  return response;
};

const updateAndPublishTemplate = async ({ name, content }) => {
  const response = await mandrillClient.templates.update({
    name,
    code: content,
    publish: true,
  });
  return response;
};

const findTemplate = async ({ name }) => {
  const response = await mandrillClient.templates.info({
    name,
  });
  return response;
};

const addOrUpdateTemplate = async ({ name, content }) => {
  core.info("----------------------");
  core.info("Check for template");
  core.info("----------------------");
  core.info("\n");
  const { status: getTemplateStatus } = findTemplate({ name });

  if (getTemplateStatus === 200) {
    // Template Found
    core.info("----------------------");
    core.info("Found Template, Updating and Publishing...");
    core.info("----------------------");
    core.info("\n");
    const updateResponse = await updateAndPublishTemplate({ name, content });
    core.info(updateResponse);
  } else {
    // Template Does not exist
    core.info("----------------------");
    core.info("Template Not Found, Adding New Template...");
    core.info("----------------------");
    core.info("\n");
    const updateResponse = await addAndPublishTemplate({ name, content });
    core.info(updateResponse);
  }
};

const readFileContents = () => {
  const input = core.getInput("templateNames");
  const fileNames = JSON.parse(input);
  console.log(fileNames, typeof fileNames);
  for(let filePath of fileNames) {
    core.info(filePath);
    const fullPath = path.resolve(filePath);
    core.info(`Processing file: ${fullPath}`);
    const breaks = filePath.split("/");
    const exactFileName = breaks[breaks.length - 1];
    const rawdata = fs.readFileSync(fullPath);
    core.info(exactFileName);
    core.info(rawdata);
    core.info("\n");
    addOrUpdateTemplate({ name: exactFileName, content: rawdata });
  };
};

async function callPing() {
  const mandrillKey = core.getInput("mandrill_key");
  mandrillClient = mailchimp(mandrillKey);
  const response = await mandrillClient.users.ping();
  core.info("----------------------");
  core.info(response);
  core.info("----------------------");
  core.info("\n");
  readFileContents();
}

try {
  callPing(); // if mandrill works, it will return "PONG!"
} catch(error) {
  core.setFailed(error.message);
}
