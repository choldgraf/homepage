import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import React from "react";
import { INTERFACES } from "./interfaces";

const md = MarkdownIt();

const Welcome = ({ title, subTitle, ...props }) => {

  return <Flex direction="row"
    paddingBottom={2}
    marginBottom={16}
    borderBottom="1px dotted" borderColor="gray.600">

    <Box
      flex={3} padding={4} paddingRight={12}>
      <Heading
        fontSize="xl" marginBottom={2}
        dangerouslySetInnerHTML={{ __html: md.render(title) }} />
      <Text fontSize="md" dangerouslySetInnerHTML={{ __html: md.render(subTitle) }} />
    </Box>
    <Interfaces flex={1} />
  </Flex>
}

const Interfaces = ({ ...props }) => {
  return <Flex
    flexDir="row" alignItems="end" alignItems="center" justifyContent="right"
    {...props}>
    {Object.keys(INTERFACES).map(i => {
      const iface = INTERFACES[i];
      if (iface.logo === undefined) {
        return;
      }
      return <Link href={iface.url} key={i} marginRight={4}>
        <Image width={12} src={iface.logo} />
      </Link>
    })}
  </Flex >
}

export { Welcome, Interfaces, INTERFACES }