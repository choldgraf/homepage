import jinja2
import os
import shutil
import subprocess

env = jinja2.Environment(loader=jinja2.FileSystemLoader("templates"))


def static_url(url):
    return url


params = {"static_url": static_url, "authenticator_login_url": "https://some-login-url"}

os.makedirs("_build", exist_ok=True)
with open("_build/index.html", "w") as f:
    f.write(env.get_template("login.html").render(**params))

subprocess.check_call(["npm", "run", "dev"])
shutil.copytree("extra-assets", "_build/extra-assets")