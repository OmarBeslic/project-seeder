import { useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import useStore from "../store";

const steps = [
  { label: "Intro", component: StepIntro },
  { label: "SSR", component: StepSSR },
  { label: "State management & API", component: StepStateAndAPI },
  { label: "Routing", component: StepRouting },
  { label: "UI", component: StepUI },
  { label: "All done!", component: StepDone },
];

function StepIntro() {
  return (
    <>
      <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
        Get started quickly!
      </div>
      <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
        Congratulations on using Project Seeder to kickstart your application
        development! By choosing our app creator, you've saved valuable time and
        effort, as your app now comes equipped with a powerful set of features
        right from the get-go.
        <br />
        <br />
        Let's explore the built-in features of your newly created app!
      </div>
    </>
  );
}

function StepSSR() {
  return (
    <>
      <>
        <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
          SSR - Server Side Rendering
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          In an isomorphic React app with server-side rendering (SSR), the goal
          is to render the initial HTML content on the server rather than solely
          relying on the client. In this scenario, your{" "}
          <span style={{ fontWeight: 600 }}>server.js</span> file, which runs an
          Express server, plays a central role. The server handles the rendering
          of the app using an entry file called{" "}
          <span style={{ fontWeight: 600 }}>entry-server.js</span>.
          <br />
          <br />
          When a user makes a request to your app, the server executes the code
          in <span style={{ fontWeight: 600 }}>entry-server.js</span> to render
          the React components defined in{" "}
          <span style={{ fontWeight: 600 }}>App.jsx</span> on the server side.
          This pre-rendered HTML is then sent to the client, improving initial
          page load performance and search engine optimization.
          <br />
          <br />
          On the client side, the{" "}
          <span style={{ fontWeight: 600 }}>entry-client.js </span> file serves
          the same <span style={{ fontWeight: 600 }}>App.jsx </span>
          file. Once the initial HTML is delivered to the client, the React
          components take over and the app becomes interactive. This hybrid
          approach of SSR and client-side rendering (CSR) combines the best of
          both worlds, providing a faster initial load and a responsive user
          experience.
          <br />
          <br />
          In addition to serverside rendering, your{" "}
          <span style={{ fontWeight: 600 }}>server.js</span> file manages data
          prefetching. This involves fetching necessary data before rendering
          the components, optimizing the app's performance. The server initiates
          global requests like{" "}
          <span style={{ fontWeight: 600 }}>getStyle and getUser</span> that are
          relevant to the entire application. Moreover, it dynamically fetches
          specific data based on the route the user is accessing, ensuring that
          each page has the required information ready before rendering.
        </div>
        <img
          src="/assets/img/getstarted/ssr.svg"
          style={{
            background: "white",
            borderRadius: 20,
            margin: "30px 0px 20px 0px",
            padding: 50,
            maxWidth: "100%",
          }}
        />
      </>
    </>
  );
}

function StepStateAndAPI() {
  return (
    <>
      <>
        <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
          State Management
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          In this app, state management is handled by Zustand, a simple yet
          powerful state management library that excels in both server-side and
          client-side scenarios. The state is defined in a file called store.js,
          creating a singleton instance on the server side and being used
          regularly on the client side.
          <br />
          <br />
          All state keys and actions are centralized in this single store.js
          file, making it a convenient one-stop location for managing the
          application's state. This setup eliminates the need for wrapping the
          entire app in a store provider or dealing with prop drilling.
          <br />
          <br />
          Using Zustand in components is straightforward. In any React
          component, you can access the state and actions with a concise hook,
          as exemplified by the following code:
          <br />
          <br />
          <div className="code-example">
            {"// Import the useStore hook"} <br />
            {"import {useStore} from './store';"}
          </div>
          <br />
          <br />
          <div className="code-example">
            {"// Inside a component"} <br />
            {"const { style, updateStyle } = useStore();"}
          </div>
          <br />
          <br />
          This usage pattern allows you to effortlessly access and update the
          application state in any component without the overhead of additional
          providers or prop passing. Zustand's simplicity, combined with its
          efficiency on both the server and client, makes it an excellent choice
          for managing the state in this React application.
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 200,
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          API Wrapper
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          In this app, the API wrapper, defined in the api.js file, serves as a
          centralized module responsible for managing all communication between
          the application and external APIs or third-party services. The wrapper
          simplifies the process of making HTTP requests, offering three basic
          functions: apiGet, apiPost, and apiGetAuthenticated. They accept two
          parameters, url and options. Url is used as an endpoint to be called
          and options are used to customize the request (body, data, headers,
          etc).
          <br />
          <br />
          <span style={{ fontWeight: 600 }}>apiGet</span>: This function handles
          simple GET requests. It constructs the URL and sends the request,
          returning the data received to the caller.
          <br />
          <br />
          <span style={{ fontWeight: 600 }}>apiPost</span>: For simple POST
          requests, this function automatically includes a bearer token as
          authorization. It streamlines the process of sending data to the
          server securely.
          <br />
          <br />
          <span style={{ fontWeight: 600 }}>apiGetAuthenticated</span>: This
          function is specifically designed for authorized GET requests. It
          includes a bearer token in the authorization header, ensuring that the
          request is authenticated.
          <br />
          <br />
          Other, more complex, requests within the application build on these
          basic functions. They construct URLs specific to the desired endpoint
          and pass them to one of the basic functions. Upon receiving the data
          from these requests, the function can prepare, deconstruct, or work
          with the data in any other way before returning it to the caller.
          <br />
          <br />
          <div className="code-example">
            {`// Get all users`}
            <br />
            {`export const getUsers = async () => {`}
            <br />
            {'const usersBaseURL = `${"API_BASE_URL"}/users`;'}
            <br />
            {`let users = await apiGet({ url: usersBaseURL });`}
            <br />
            <br />
            {`return users?.data || false;`}
            <br />
            {`};`}
          </div>
          <br />
          By centralizing these API-related functionalities in a dedicated file,
          the api.js module provides a clean and organized structure for
          handling communication with external services. It abstracts away the
          complexities of HTTP requests, token handling, and URL construction,
          making it easier for developers to manage and extend the application's
          interaction with external APIs.
          <br />
          To learn more about Zustand{" "}
          <a target="_zustand" href="https://zustand-demo.pmnd.rs/">
            click here
          </a>
          .
          <br />
          <div style={{ width: "100%", textAlign: "center" }}>
            <a target="_mui" href="https://zustand-demo.pmnd.rs/">
              <img
                src="https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560"
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
            </a>
          </div>
        </div>
      </>
    </>
  );
}

function StepRouting() {
  return (
    <>
      <>
        <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
          Routing system
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          In this app, the routing system is defined in the routes.js file as an
          array of objects, each representing a specific route in the
          application. Each route object contains essential information such as
          the path (key 'path'), the React component associated with the route
          (key 'component'), and whether the route requires authentication for
          access (key 'authentication').
          <br />
          <br />
          <div className="code-example">
            {`// Public route`}
            <br />
            {`{`}
            <br />
            {`path: "/",`}
            <br />
            {`component: Home,`}
            <br />
            {`},`}
            <br />
            <br />
            {`// Protected route`}
            <br />
            {`{`}
            <br />
            {`path: "/dashboard",`}
            <br />
            {`component: Dashboard,`}
            <br />
            {`authentication: true,`}
            <br />
            {`},`}
            <br />
          </div>
          <br />
          The app itself is designed to handle access to these routes, ensuring
          that only authorized (logged-in) users can access routes marked as
          requiring authentication. If a user attempts to access a restricted
          route without proper authorization, the app displays an appropriate
          message, enhancing the security and user experience.
          <br />
          <br />
          On the server side, an additional file named prefetchRoutes.js is
          employed to facilitate data prefetching and initialize the store with
          prefetched data. This is crucial for enabling full server-side
          rendering of the route. The prefetchRoutes.js file is structured as an
          array of objects, each specifying a path and a prefetch property.
          <br />
          <br />
          The prefetch property is an array of objects, where the key represents
          the store key to be populated initially, and the value is a function
          executed serverside. This function fetches the necessary data for the
          specified store key, ensuring that the store is initialized with the
          required data before rendering the route serverside.
          <br />
          <br />
          <div className="code-example">
            {`{`}
            <br />
            {`path: "/",`}
            <br />
            {`// Prefetch data for initial store state`}
            <br />
            {`// prefetch: [  { 'store key': 'action to perform to get data' }  ]`}
            <br />
            {`prefetch: [ { posts: getPosts } ],`}
            <br />
            {`},`}
            <br />
          </div>
        </div>
      </>
    </>
  );
}

function StepUI() {
  return (
    <>
      <>
        <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
          UI Library - MUI
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          This app leverages the{" "}
          <span style={{ fontWeight: 600 }}>Material-UI (MUI)</span> library for
          styling its components, providing a consistent and aesthetically
          pleasing user interface. Material-UI is a popular React component
          library that implements Google's Material Design principles, offering
          a set of pre-designed, customizable components that adhere to modern
          design standards.
          <br />
          To learn more about MUI{" "}
          <a target="_mui" href="https://mui.com/material-ui/getting-started/">
            click here
          </a>
          .
          <br />
          <div style={{ width: "100%", textAlign: "center" }}>
            <a
              target="_mui"
              href="https://mui.com/material-ui/getting-started/"
            >
              <img
                src="https://mui.com/static/logo.png"
                style={{ maxWidth: 200, maxHeight: 200 }}
              />
            </a>
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 200,
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          Style
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          The styling foundation is built on{" "}
          <span style={{ fontWeight: 600 }}>CSS variables</span>, providing a
          flexible and dynamic approach to styling elements. These variables,
          defined at the top of the HTML, include crucial parameters such as
          content{" "}
          <span style={{ fontWeight: 600 }}>
            background colors, text colors, fonts
          </span>{" "}
          used throught the app and{" "}
          <span style={{ fontWeight: 600 }}>dimensions</span> of various
          elements. This allows for dynamic theming and easy customization
          throughout the application.
          <br /> <br />
          Notably, the style information is prefetched on the server, ensuring a
          seamless initial rendering of the app. The app utilizes a getStyle
          function to fetch this styling information. While the function
          currently returns mock data, the intention is to implement a remote
          API call to dynamically fetch the style data from a server, enhancing
          the app's ability to adapt its appearance based on external
          configurations.
          <br />
          <br />
          <div className="code-example">
            {`html {`}
            <br />
            {`--htmlBackgroundColor: #e5e5e5;`}
            <br />
            {`--layerOneBackgroundColor: #1ac9a1;`}
            <br />
            {`--layerOneTextColor: #fff;`}
            <br />
            {`--layerTwoBackgroundColor: #1ac9a1;`}
            <br />
            {`--layerTwoTextColor: #fff;`}
            <br />
            {`--modalBackgroundColor: ;`}
            <br />
            {`--modalTextColor: ;`}
            <br />
            {`--logo: /assets/img/logo.svg;`}
            <br />
            {`--fontFamily: Inter;`}
            <br />
            {`}`}
            <br />
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 200,
            marginTop: 50,
            marginBottom: 30,
          }}
        >
          Layout
        </div>
        <div style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}>
          The app adopts a structured layout approach to ensure a consistent and
          organized presentation of its components. Every page or route is
          enveloped by a{" "}
          <span style={{ fontWeight: 600 }}>
            higher-order component named Layout
          </span>
          , which orchestrates a standardized structure comprising a{" "}
          <span style={{ fontWeight: 600 }}>Header, Content, and Footer</span>.
          <br />
          <br />
          The content of each page is rendered within the designated{" "}
          <span style={{ fontWeight: 600 }}>Content</span> section, encapsulated
          within a container to maintain a uniform appearance. This
          containerization ensures a cohesive design across different pages,
          sparing developers from concerning themselves with individual styling
          intricacies.
          <br />
          <br />
          Moreover, the layout is designed to be{" "}
          <span style={{ fontWeight: 600 }}>responsive</span>, adapting
          seamlessly to various devices. This responsive behavior alleviates
          developers from the burden of manually handling different screen
          sizes, contributing to a user-friendly experience across a range of
          devices.
        </div>
      </>
    </>
  );
}

function StepDone() {
  return (
    <>
      <div>
        <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
          Start Developing!
        </div>
        <div style={{ textAlign: "center", fontSize: 20, lineHeight: 1.7 }}>
          <div
            style={{
              textAlign: "center",
              margin: 90,
            }}
          >
            <img
              src="/assets/img/logo.svg"
              style={{
                maxHeight: 300,
                maxWidth: 300,
              }}
            />
          </div>
          We're excited to see what you build with this powerful foundation!
        </div>
      </div>
    </>
  );
}

function StepperBottom({
  activeStep,
  handleBack,
  handleNext,
  handleReset,
  style,
}) {
  // If step is last step show reset buttons
  if (activeStep === steps.length - 1) {
    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      </>
    );
  }

  // In any other case show back and next buttons
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", pt: 2, marginTop: "30px" }}
    >
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
        style={{ display: activeStep === 0 ? "none" : "" }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button
        variant="contained"
        onClick={handleNext}
        style={{ background: style?.layerOneBackgroundColor }}
      >
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </Box>
  );
}

export default function GetStarted() {
  const { style } = useStore();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} className="get-started-stepper">
          {steps.map((step, index) => {
            return (
              <Step key={step.label} className="get-started-step">
                <StepLabel className="get-started-label">
                  {step.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className="get-started-step-wrapper">
          {steps[activeStep]?.component({ activeStep })}
        </div>

        <StepperBottom
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          handleReset={handleReset}
          style={style}
        />
      </Box>
    </div>
  );
}
