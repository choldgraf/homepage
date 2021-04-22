import React from "react";
import hubsConfig from "./hubs.yaml";
import MarkdownIt from "markdown-it";
import { render } from "react-dom";
import { Center, Image, RadioGroup, Radio, Stack, ChakraProvider, Container, Heading, Text, Link, Box, Flex, Button, baseStyle } from "@chakra-ui/react";
import rstudioLogo from "./logos/rstudio.svg";
import jupyterLogo from "./logos/jupyter.svg";

const md = MarkdownIt();
const pageProperties = window.pageProperties;

const FAQItem = ({ q, a, ...props }) => {
  return <Box key={q} {...props}>
    <Heading
      fontSize="lg" marginBottom={2}
      dangerouslySetInnerHTML={{ __html: md.render(q) }} />
    <Text dangerouslySetInnerHTML={{ __html: md.render(a) }} />
  </Box>
}

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

const LoginPanel = ({ ...props }) => {
  const urlParams = new URLSearchParams(window.location.search);
  // If the user is being sent to a given URL after logging in (via ?next),
  // we want to say 'Log in to Continue'. If they came to the hub directly,
  // we want to say 'Log in to start'
  const nextUrl = urlParams.get('next');
  const freshPage = nextUrl === null || nextUrl === '' || nextUrl === '/hub/';
  console.log(urlParams.get('next'))

  return <Flex alignItems="center" direction="column" {...props}>
    {freshPage &&
      <RadioGroup defaultValue="notebook" paddingBottom={4}>
        <Stack spacing={4} direction="row">
          <Text>After logging in, open</Text>
          <Radio value="notebook">Jupyter Notebook</Radio>
          <Radio value="rstudio">RStudio</Radio>
          <Radio value="lab">JupyterLab</Radio>
        </Stack>
      </RadioGroup>
    }
    <Button as={Link} href={pageProperties.loginUrl} colorScheme="orange" size="lg">
      {freshPage ? "Log in to start" : "Log in to continue"}
    </Button>
  </Flex>
}

const Header = ({ logo, tagline, ...props }) => {
  return <Flex {...props} direction="column" alignItems="center">
    <Link href="/" marginBottom={4}>
      <Image src={logo.img} width={logo.width} />
    </Link>
    <Text size="xs"
      dangerouslySetInnerHTML={{ __html: md.render(tagline) }} />
  </Flex>
}

const getCurrentHub = () => {
  const defaults = hubsConfig.defaults;
  const queryParams = new URLSearchParams(location.search);
  // FIXME: This should only work with dev builds
  // Can be a security issue in prod builds, since one hub
  // can be made to look like a different hub
  const host = queryParams.get('host') || location.hostname;

  let hub = hubsConfig.hubs[host]
  Object.keys(defaults).forEach(key => {
    if (hub[key] === undefined) {
      hub[key] = defaults[key];
    }
  })
  console.log(hub)

  return hub;
}

const LoginPage = () => {

  const hub = getCurrentHub()
  return <Container maxW="container.md" marginTop={4}>
    <Header logo={hub.logo} tagline={hub.tagline}
      marginBottom={8} />
    <LoginPanel marginBottom={12} />
    <Flex direction="row"
      paddingBottom={2}
      marginBottom={16}
      borderBottom="1px dotted" borderColor="gray.600">
      <Welcome
        flex={3} padding={4} paddingRight={12}
        title={hub.welcome.title} subTitle={hub.welcome.subTitle} />
      <Interfaces flex={2} interfaces={hub.interfaces} />
    </Flex>
    <Box>
      {hub.faq.map(f =>
        <FAQItem q={f.q} a={f.a} margin={4}
          borderBottom="1px dotted" borderBottomColor="gray.400"
          paddingBottom={4}
        />
      )}
    </Box>
  </Container>
}

document.addEventListener('DOMContentLoaded', function () {

  render(
    <ChakraProvider>
      <LoginPage />
    </ChakraProvider>,
    document.getElementById("root")
  );
})
