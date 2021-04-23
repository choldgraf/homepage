import jupyterLogo from "./logos/jupyter.svg";
import rstudioLogo from "./logos/rstudio.svg";

export const DEFAULT_INTERFACE = "jupyter";
export const INTERFACES = {
    rstudio: {
        url: "https://rstudio.com",
        logo: rstudioLogo,
        width: 48,
        nextUrl: "rstudio",
        name: "RStudio"
    },
    jupyter: {
        url: "https://jupyter.org",
        logo: jupyterLogo,
        width: 56,
        nextUrl: "tree",
        name: "Jupyter Notebook"
    },
    jupyterlab: {
        url: "https://github.com/jupyterlab/jupyterlab/",
        // FIXME: Find a JupyterLabs pecific logo
        logo: jupyterLogo,
        width: 56,
        nextUrl: "lab",
        name: "JupyterLab"
    }
}
