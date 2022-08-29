# mandrill-templates-action

**A github action to trigger automatic adding/updating of mailchimp templates from a github repository.**

<br />

# Inputs Required

### MUST Required
- Mandrill api key

### Adding new templates
- Template formats allowed - `.html`
-  **NOTE**: Both Adding / Updating templates will be published by default after the action

### Updating existing templates
- template_name
- template_code

<br />

## Usage
- Create an action in your repo by copy pasting the code in `./.github/workflows/mailer.yml`
- In the last step, under the `uses:` param, replace `./` with `saurishkar/mandrill-templates-action@<version>`
- Add `mandrill_key` as a repository secret for your action
- Trigger the workflow to see it in action
