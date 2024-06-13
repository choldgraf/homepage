"""
jupyterhub_config purely used for testing changes to templates.

See README.md for information on how to test this out.
"""

import pathlib
from oauthenticator.generic import GenericOAuthenticator
from jupyterhub.spawner import SimpleLocalProcessSpawner


HERE = pathlib.Path(__file__).parent

# Add templates from our local checkout to the path JupyterHub searches
# This allows us to override any template present in upstream
# jupyterhub (https://github.com/jupyterhub/jupyterhub/tree/main/share/jupyterhub/templates)
# locally
c.JupyterHub.template_paths = [str(HERE / "templates")]

# We use this so we can get a 'login' button, instead of a username / password
# field.
c.JupyterHub.authenticator_class = GenericOAuthenticator

# Variables that are passed through to templates!
c.JupyterHub.template_vars = {
    "custom": {
        "interface_selector": True,
        "default_url": "/rstudio",
        "extra_css": "veda.css",
        "docs": {
            "home": "https://nasa-impact.github.io/veda-docs/",
            "access_request": "https://nasa-impact.github.io/veda-docs/services/jupyterhub.html#getting-access-to-vedas-jupyterhub-environment",
        },
        "org": {
            "name": "The Visualization, Exploration, and Data Analysis (VEDA)",
            "url": "https://www.earthdata.nasa.gov/esds/veda",
        },
        "operated_by": {
            "name": "2i2c",
            "url": "https://2i2c.org",
            "custom_html": "",
        },
        "funded_by": {
            "name": "NASA",
            "url": "https://www.earthdata.nasa.gov/esds",
            "custom_html": "",
        },
        "designed_by": {
            "name": "2i2c ",
            "url": "https://2i2c.org",
            "custom_html": "",
        },
    }
}
