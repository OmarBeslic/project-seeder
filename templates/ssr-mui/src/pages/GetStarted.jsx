import { useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
          In addition to SSR, your{" "}
          <span style={{ fontWeight: 600 }}>server.js</span> file manages data
          prefetching. This involves fetching necessary data before rendering
          the components, optimizing the app's performance. The server initiates
          global requests like{" "}
          <span style={{ fontWeight: 600 }}>getStyle and getUser</span> that are
          relevant to the entire application. Moreover, it dynamically fetches
          specific data based on the route the user is accessing, ensuring that
          each page has the required information ready before rendering.
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
            {`export const getUsers = async () => {`}
            <br />
            {`// Get all users`}
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
        <div
          style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}
        ></div>
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
        <div
          style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}
        ></div>
      </>
    </>
  );
}

function StepDone() {
  return (
    <>
      <>
        <div style={{ fontSize: 36, fontWeight: 200, marginBottom: 30 }}>
          Start Developing!
        </div>
        <div
          style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}
        ></div>
      </>
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
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
