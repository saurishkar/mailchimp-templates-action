# mailchimp-templates-action

**A github action to trigger automatic adding/updating of mailchimp transactional templates (mandrillapp) from a github repository.**
**Uses `mailchimp/transactional` node api**

<br />


### Template formats
- `.html`

### Inputs
- `mandrill_key` - mandrill transactional api key
- `templateNames` - A list of comma separated file names with extensions (Ex: a.html,b.html,c.html)

### Actions allowed
- Adding a new template
- Updating a template

#### **NOTE**: Both Adding / Updating templates will be published by default after the action


<br />

## Usage
**Under your github workflow**

```
- name: Update templates
        uses: "saurishkar/mailchimp-templates-action@<version>"
        with:
          templateNames: <your comma separated filenames>
          mandrill_key: ${{ secrets.mandrill_key }}
```
**Replace `<version>` with the correct version**
<br />
**Set `mandrill_key` under your repository secrets**
