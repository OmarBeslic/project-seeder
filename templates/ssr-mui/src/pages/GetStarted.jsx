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
  { label: "SSR & File structure", component: StepSSR },
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
          State Management and API wrapper
        </div>
        <div
          style={{ textAlign: "justify", fontSize: 20, lineHeight: 1.7 }}
        ></div>
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

function StepperBottom({ activeStep, handleBack, handleNext, handleReset }) {
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
      <Button variant="contained" onClick={handleNext}>
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
        />
      </Box>
    </div>
  );
}
