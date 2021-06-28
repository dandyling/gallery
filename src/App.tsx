import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" children={<Home />}></Route>
            <Route path="/:id" children={<Home />}></Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
