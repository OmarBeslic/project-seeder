import { Route, Routes } from "react-router-dom";

import { routes } from "./routes";

import Layout from "./components/layout";

function App() {
  return (
    <>
      <Routes>
        {/* Use Layout as a wrapper for whole app (every route) */}
        <Route element={<Layout />}>
          {/* Render routes */}
          {routes.map((route) => (
            <Route
              key={route.slug}
              path={route.path}
              element={<route.component />}
            ></Route>
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
