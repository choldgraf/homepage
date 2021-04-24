import jinja2
import os
import shutil
import subprocess
import jsonschema
from ruamel.yaml import YAML

yaml = YAML(typ="safe")


def validate():
    """
    Validate hubs.yaml config

    Prevents runtime bugs
    """
    schema_file = "src/schema.yaml"
    config_file = "src/hubs.yaml"
    with open(config_file) as cf, open(schema_file) as sf:
        cluster_config = yaml.load(cf)
        schema = yaml.load(sf)
        # Raises useful exception if validation fails
        jsonschema.validate(cluster_config, schema)


env = jinja2.Environment(loader=jinja2.FileSystemLoader("templates"))


def static_url(url):
    return url


validate()
params = {"static_url": static_url, "authenticator_login_url": "https://some-login-url"}

os.makedirs("_build", exist_ok=True)
with open("_build/index.html", "w") as f:
    f.write(env.get_template("login.html").render(**params))

subprocess.check_call(["npm", "run", "dev"])
shutil.copytree("extra-assets", "_build/extra-assets")