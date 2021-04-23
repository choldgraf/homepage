import { Button, Flex, Link, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { INTERFACES, DEFAULT_INTERFACE } from "./interfaces";

const pageProperties = window.pageProperties;

/**
 * Panel shown when there's a ?next= in the URL. This is often an nbgitpuller link or
 * similar, so we ask the user to log in so they can continue to this URL. We don't offer
 * any extra options here.
 */
const LoginContinuePanel = () => {
  return <Button onClick={() => location.href = pageProperties.loginUrl} colorScheme="orange" size="lg">Login to continue</Button>
}

/**
 * Panel shown when the user has directly landed on the hub, without any ?next URL. 
 * We offer some options on what UI they can start in.
 */
const LoginStartPanel = ({ interfaces }) => {
  const [ui, setUI] = useState(INTERFACES[DEFAULT_INTERFACE]);

  let nextUrl = new URL(pageProperties.loginUrl, location.origin);
  nextUrl.searchParams.set('next', "hub/user-redirect/" + ui.nextUrl);

  return <>
    <RadioGroup defaultValue={DEFAULT_INTERFACE} paddingBottom={4}>
      <Stack spacing={4} direction="row">
        <Text>After logging in, open</Text>
        {interfaces.map(i => {
          const iface = INTERFACES[i];
          return <Radio key={i} value={i} onChange={() => setUI(iface)}>{iface.name}</Radio>
        })}
      </Stack>
    </RadioGroup>

    <Button onClick={() => location.href = nextUrl} colorScheme="orange" size="lg">
      Login to start
    </Button>
  </>

}

const LoginPanel = ({ interfaces, ...props }) => {
  const urlParams = new URLSearchParams(window.location.search);
  // If the user is being sent to a given URL after logging in (via ?next),
  // we want to say 'Log in to Continue'. If they came to the hub directly,
  // we want to say 'Log in to start'
  const nextUrl = urlParams.get('next');
  const freshPage = nextUrl === null || nextUrl === '' || nextUrl === '/hub/';
  console.log(urlParams.get('next'))

  return <Flex alignItems="center" direction="column" {...props}>
    {freshPage ? <LoginStartPanel interfaces={interfaces} /> : <LoginContinuePanel />}
  </Flex >
}


export { LoginPanel };
