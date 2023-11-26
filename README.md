
![Logo](https://i.ibb.co/QF23xQn/logo.png)

# Project Seeder

Project Seeder is a development tool designed to deliver a fully-featured web application right from the start. It aims to streamline the development process by integrating essential components that often require additional setup and configuration.

You'll get a complete app boilerplate and will be able to focus on your app's logic from the get-go!
## What is included
Your application includes **server-side rendering (SSR)** to enhance performance and boost search engine optimization without any additional setup. The integrated **state management system** ensures seamless data flow within your app, allowing you to focus on building features rather than dealing with complex state configurations.

Enjoy the convenience of a simple **routing system** and a built-in **API wrapper** which facilitates easy connection to various backend services, streamlining data fetching and user authentication.

Additionally, we've included a **UI library**, a predefined **layout**, and a styling system with **CSS variables** providing you a collection of pre-designed components and saving you time on styling.
## Usage

Create new project with **npx**

```
  npx project-seeder
```
You'll be asked for your new **project's name** and which **template** to use. Your project will be created in a new folder with dependencies installed.

Go to folder and run **npm start** or **yarn start** to run your project.
## Features

- SSR - Server side rendering
- State management
- API wrapper
- Routing system
- Data prefetching
- Authentication
- UI Library + CSS Styling + Basic UI Layout
- Dockerfile
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT` - Port the app will run on

`VITE_API_BASE_URL` - Base URL the API wrapper will build requests on, example https://jsonplaceholder.typicode.com


## Roadmap

- Internalization
- Documentation
- Tests
- Caching


## License

[GPL-3.0](https://opensource.org/license/gpl-3-0/)
