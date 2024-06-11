# Custom JupyterHub templates for 2i2c hubs

This repo contains html jinja2 templates for customizing the appearance of JupyterHub. Each HTML file here will override the files in `https://github.com/jupyterhub/jupyterhub/tree/master/share/jupyter/hub/templates`.

Any changes made in this repository will be reflected in the JupyterHub within 5 minutes.

## General, out of the box variations to the default homepage via existing branches

In this repositories there are some branches that provide alternatives to the default 2i2c landing page, but without being specific to a certain community hub. These are:

1. **The [username-and-password-homepage](https://github.com/2i2c-org/default-hub-homepage/tree/username-and-password-homepage) branch**

   This branch allows username and password input fields instead of the regular login single button, along with providing specific info about and for each community.

   This branch is useful for hubs that instead of an OAuth2 based authenticator want to use a username and password one.

2. **The [no-homepage-subsections](https://github.com/2i2c-org/default-hub-homepage/tree/no-homepage-subsections) branch**

   This branch removes all the sub-sections that follow the login button, including the interface choice.

   This branch is useful for hubs that might serve a binderhub-style page right after login instead of the spawning regular UI. In this case, the sections after the login button are not that relevant and removing them makes expectations more clear.


## Local development

### 1. Test login template changes

You can run a local JupyterHub to test your login template changes.


1. Setup a virtual python environment and ensure you have NPM installed.

2. Set up [`configurable-http-proxy`](https://github.com/jupyterhub/configurable-http-proxy#install)

3. Install packages from `requirements.txt`

   ```bash
   python3 -m pip install -r requirements.txt
   ```

4. Symlink extra assets we have, so templates can use it.

   ```bash
   ln -s $(pwd)/extra-assets $(dirname $(which python3))/../share/jupyterhub/static
   ```
5. Add extra templates variables you might use in the templates, by editing
   `jupyterhub_config.py` file's `c.JupyterHub.template_vars`

6. Start a JupyterHub!

   ```bash
   python3 -m jupyterhub
   ```

7. Check out your work at `http://localhost:8000`.

8. If you change templates, you need to restart JupyterHub to see changes.
   But for asset changes (JS, CSS, etc) you don't need a restart

### 2. Test other template changes

If you create a branch in this repository with a name that matches `<cluster-name>`-`<hub-name>`in the [2i2c hubs repository](https://github.com/2i2c-org/infrastructure/tree/HEAD/config/clusters), then the changes in this branch will be reflected on that cluster and hub. This can be used either for testing (if this branch gets deleted once the changes have been merged into the main branch), or for having specific homepage customizations per hub.

**Steps for testing changes on staging:**

1. From the local branch where you have your changes committed, create a new branch called `2i2c-staging`:

   ```bash
   git checkout -b 2i2c-staging
   ```

2. Push the local `2i2c-staging` branch to the remote repository:

   ```bash
   git push <remote> 2i2c-staging
   ```

2. Go to the [infrastructure repository](https://github.com/2i2c-org/infrastructure) and update the 2i2c staging hub config to track this new branch (if not already).

   Follow the example at https://infrastructure.2i2c.org/en/latest/howto/features/login-page.html about how to set the `jupyterhub.custom.homepage.gitRepoBranch` config.

   Open a PR against that repo with the changes if any.

3. It should take around 5min to see your changes on the staging hub at `https://staging.pilot.2i2c.cloud` after the PR against the infrastructure repository has been merged.

4. After you've checked that everything works, merge the `2i2c-staging` branch into the main branch of this repository if you want the changes to be deployed to the other hubs too after around 5min.

5. Delete the remote staging branch, either from the GitHub GUI, or using:

   ```bash
   git branch git push -d <remote> 2i2c-staging
   ```

**NOTE**
For per-hub specific templates, follow the steps above, but without deleting the remote branch.
