import { Button, Flex, Link, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React from "react";

const pageProperties = window.pageProperties;

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


export { LoginPanel };
