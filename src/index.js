import React, { useState } from "react";
import hubsConfig from "./hubs.yaml";
import MarkdownIt from "markdown-it";
import { render } from "react-dom";
import { Center, Image, RadioGroup, Radio, Stack, ChakraProvider, Container, Heading, Text, Link, Box, Flex, Button, baseStyle, Select, extendTheme } from "@chakra-ui/react";
import rstudioLogo from "./logos/rstudio.svg";
import jupyterLogo from "./logos/jupyter.svg";
import "./index.css";

const md = MarkdownIt();
const pageProperties = window.pageProperties;

const Message = ({ markdown, ...props }) => {
  return <Box {...props} className="message"
    dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
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

const getHub = (domain) => {
  const defaults = hubsConfig.defaults;
  let hub = hubsConfig.hubs[domain]
  Object.keys(defaults).forEach(key => {
    if (hub[key] === undefined) {
      hub[key] = defaults[key];
    }
  })
  console.log(hub)

  return hub;
}

const HubChooser = ({ setHub }) => {
  const domain = location.hostname;
  const queryDomain = new URLSearchParams(location.search).get('domain');
  if (queryDomain !== null) {
    if (domain !== 'localhost' && !domain.endsWith('.netlify.app')) {
      // Don't allow queryDomain in prod, since it can be used to pretend
      // one hub is another in phishing style attacks
      return <Heading size="xl">
        ?domain query parameter is only supported during development
      </Heading>
    } else {
      if (hubsConfig.hubs[queryDomain]) {
        // Can't setHub *during* a render, since setHub will trigger render
        // of LoginPage. So we trigger it on next tick of the event loop.
        setTimeout(() => setHub(getHub(queryDomain)), 0);
      } else {
        return <Heading size="xl">
          Config for {queryDomain} not found
        </Heading>
      }
    }
  } else {
    if (domain !== 'localhost' && !domain.endsWith('.netlify.app')) {
      return <Heading size="xl">
        The front page for this 2i2c hub has not been configured. You
      can still try <Link href={pageProperties.loginUrl}>Logging in</Link>.
    </Heading>
    } else {
      return <Select placeholder="Select JupyterHub to view its front page">
        {Object.keys(hubsConfig.hubs).map(domain =>
          <option value={domain} key={domain} onClick={() => {
            setHub(getHub(domain))
          }
          }>{domain}</option>)
        }
      </Select>
    }
  }
  return null;
}

const LoginPage = () => {

  const [hub, setHub] = useState(null);

  return hub === null ? <HubChooser setHub={setHub} /> :
    <Container maxW="container.md" marginTop={4}>
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
        {hub.messages.map(m =>
          <Message markdown={m} key={m} margin={4}
            borderBottom="1px dotted" borderBottomColor="gray.400"
            paddingBottom={4}
          />
        )}
      </Box>
    </Container>
}


export const theme = extendTheme({
  styles: {
    global: {
      a: {
        color: "#2c7bb6",
        _hover: {
          color: "#1d5178",
          textDecoration: "underline"
        }
      }
    }
  }
})

document.addEventListener('DOMContentLoaded', function () {
  render(
    <ChakraProvider theme={theme}>
      <LoginPage />
    </ChakraProvider>,
    document.getElementById("root")
  );
})
