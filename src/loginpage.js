import { Image, Text, Box, Container, Flex, Heading, Link, Select } from "@chakra-ui/react";
import MarkdownIt from "markdown-it";
import React, { useState } from "react";
import hubsConfig from "./hubs.yaml";
import { LoginPanel } from "./loginpanel";
import { Message } from "./message";
import { Interfaces, Welcome } from "./welcome";

const md = new MarkdownIt();

const pageProperties = window.pageProperties;

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

  console.log(hub)
  return hub === null ? <HubChooser setHub={setHub} /> :
    <Container maxW="container.md" marginTop={4}>
      <Header logo={hub.logo} tagline={hub.tagline}
        marginBottom={8} />
      <LoginPanel interfaces={hub.interfaces} marginBottom={12} />
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

export { LoginPage };
