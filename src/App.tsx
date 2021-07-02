import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./features/home/Home";
import "./App.css";

export const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          <Switch>
            <Route path="/" children={<Home />}></Route>
          </Switch>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
};
