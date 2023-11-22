import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";
import useStore from "./store";

import Layout from "./components/layout";
import Protected from "./pages/Protected";

function App() {
  const { user } = useStore();

  return (
    <>
      <Routes>
        {/* Use Layout as a wrapper for whole app (every route) */}
        <Route element={<Layout />}>
          {/* Render routes */}
          {routes.map((route) => {
            // Return protected route if user not logged in and route requires authentication
            if (!user && route.authentication) {
              return (
                <Route
                  key={route.slug}
                  path={route.path}
                  element={<Protected />}
                ></Route>
              );
            }

            return (
              <Route
                key={route.slug}
                path={route.path}
                element={<route.component />}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
