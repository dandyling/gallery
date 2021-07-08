import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./features/home/Home";
import "./App.css";
import { Viewer } from "./features/home/Viewer";
import { useState } from "react";

export const queryClient = new QueryClient();

export const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ChakraProvider theme={theme}>
          <Switch>
            <Route
              path="/photo/:id"
              children={<Viewer page={page} search={search} />}
            />
            <Route
              path="/"
              children={
                <Home
                  search={search}
                  onSearchChange={(e) => setSearch(e.currentTarget.value)}
                  page={page}
                  setPage={setPage}
                />
              }
            />
          </Switch>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
};
