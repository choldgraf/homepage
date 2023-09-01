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
c.JupyterHub.template_paths = [str(HERE / 'templates')]

# We use this so we can get a 'login' button, instead of a username / password
# field.
c.JupyterHub.authenticator_class = GenericOAuthenticator

# Variables that are passed through to templates!
c.JupyterHub.template_vars = {
    'custom': {
        "interface_selector": True,
        "default_url": "/rstudio",
        'org': {
            'name': 'VICTOR',
            'logo_url': 'https://i.imgur.com/D2vXQ5k.png',
            'url': 'https://victor.ldeo.columbia.edu',
        },
        'operated_by': {
            'name': '2i2c',
            'url': 'https://2i2c.org',
            'custom_html': '',
        },
        'funded_by': {
            'name': 'National Science Foundation',
            'url': 'https://people.climate.columbia.edu/projects/sponsor/National%20Science%20Foundation',
            'custom_html': 'Funding <i>Org</i>',
        },
        'designed_by': {
            'name': '2i2c',
            'url': 'https://2i2c.org',
            'custom_html': '',
        }
    }
}
