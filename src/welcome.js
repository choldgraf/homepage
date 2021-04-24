import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import React from "react";
import jupyterLogo from "./logos/jupyter.svg";
import rstudioLogo from "./logos/rstudio.svg";

const md = MarkdownIt();


const Welcome = ({ title, subTitle, ...props }) => {
  return <Box {...props}>
    <Heading
      fontSize="xl" marginBottom={2}
      dangerouslySetInnerHTML={{ __html: md.render(title) }} />
    <Text fontSize="md" dangerouslySetInnerHTML={{ __html: md.render(subTitle) }} />
  </Box>
}

const Interfaces = ({ interfaces, ...props }) => {
  const interfaceDetails = {
    rstudio: {
      url: "https://rstudio.com",
      logo: rstudioLogo,
      width: 48
    },
    jupyter: {
      url: "https://jupyter.org",
      logo: jupyterLogo,
      width: 56
    }
  }
  return <Flex
    flexDir="column" alignItems="end" justifyContent="center"
    {...props}>
    {interfaces.map(i => {
      const iface = interfaceDetails[i];
      return <Link href={iface.url} key={i} marginBottom={4}>
        <Image width={iface.width} src={iface.logo} />
      </Link>
    })}
  </Flex >
}

export { Welcome, Interfaces }