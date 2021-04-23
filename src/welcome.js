import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import React from "react";
import { INTERFACES } from "./interfaces";

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
  return <Flex
    flexDir="column" alignItems="end" justifyContent="center"
    {...props}>
    {interfaces.map(i => {
      const iface = INTERFACES[i];
      return <Link href={iface.url} key={i} marginBottom={4}>
        <Image width={iface.width} src={iface.logo} />
      </Link>
    })}
  </Flex >
}

export { Welcome, Interfaces, INTERFACES }