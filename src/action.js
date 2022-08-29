const mailchimp = require("@mailchimp/mailchimp_transactional");
const core = require("@actions/core");
const fs = require("fs");
const path = require("path");

let mandrillClient;
const mandrillKey = core.getInput("mandrill_key");

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
  console.log("----------------------");
  console.log("Check for template");
  console.log("----------------------");
  console.log("\n");
  const { status: getTemplateStatus } = findTemplate({ name });

  if (getTemplateStatus === 200) {
    // Template Found
    console.log("----------------------");
    console.log("Found Template, Updating and Publishing...");
    console.log("----------------------");
    console.log("\n");
    const updateResponse = await updateAndPublishTemplate({ name, content });
    console.log(updateResponse);
  } else {
    // Template Does not exist
    console.log("----------------------");
    console.log("Template Not Found, Adding New Template...");
    console.log("----------------------");
    console.log("\n");
    const updateResponse = await addAndPublishTemplate({ name, content });
    console.log(updateResponse);
  }
};

const readFileContents = () => {
  const fileNames = JSON.parse(`${core.getInput("fileNames")}`);
  fileNames.forEach((fileName) => {
    const fullPath = path.resolve(fileName);
    core.info(`Processing file: ${fullPath}`);
    const breaks = fileName.split("/");
    const exactFileName = breaks[breaks.length - 1];
    const rawdata = fs.readFileSync(fullPath);
    console.log(exactFileName);
    console.log(rawdata);
    console.log("\n");
    addOrUpdateTemplate({ name: exactFileName, content: rawdata });
  });
};

async function callPing() {
  mandrillClient = mailchimp(mandrillKey);
  const response = await mandrillClient.users.ping();
  console.log("----------------------");
  console.log(response);
  console.log("----------------------");
  console.log("\n");
  readFileContents();
}

callPing(); // if mandrill works, it will return "PONG!"
