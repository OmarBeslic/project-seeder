import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

import Layout from "./components/layout";

// Load components for routes dynamically
let populatedRoutes = [];
for (const route of routes) {
  try {
    populatedRoutes.push({
      ...route,
      component: (await import(`./pages/${route.filename}.jsx`)).default,
    });
  } catch (error) {
    console.log(`Route`);
  }
}

function App() {
  return (
    <>
      <Routes>
        {/* Use Layout as a wrapper for whole app (every route) */}
        <Route element={<Layout />}>
          {/* Render routes */}
          {populatedRoutes.map((route) => (
            <Route
              key={route.filename}
              path={route.path}
              element={route.component()}
            ></Route>
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
