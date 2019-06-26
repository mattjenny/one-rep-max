# One rep max app

## Overview
This project allows a user to log in and view graphs of theoretical one-rep max values over time for each exercise they have performed. The app is optimized for web and mobile, has a responsive feel, and is architected to be easily expanded upon in the future. User sessions are stored in cookies and active for 24 hours. When viewing a graph, users can hover over points to view details about individual workouts.

## Architecture and libraries

This project is build on a React/Redux/Typescript stack and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Aside from a small handful of app-wide styles defined in `App.css`, all styling is handled in Javascript via `Styled-components`. Due to the simplicity of the app and custom design palette, no design framework was used. Network calls are made using fetch with the `whatwg-fetch` polyfill and use custom classes to add the appropriate auth headers from the auth info stored in the user's cookie. Most logic derived from the redux store, aside from the final presentational formatting, is handled in [Reselect](https://github.com/reduxjs/reselect) selectors. Only the root `Login` and `Exercises` components are connected to the redux store; data is passed to all downstream components via vanilla React props.

The page layout is responsive to resizing, and on small screens, the sidebar is collapsed behind a hamburger menu. Smooth animation on menu opening, hover styling on sidebar items, and tooltips on graph data points give the page a responsive feel.

### Libraries
* View layer: [React](https://reactjs.org/)
* State management: [Redux](https://redux.js.org/)
* Side effects: [Redux-saga](https://github.com/redux-saga/redux-saga)
* Type safety: [Typescript](https://www.typescriptlang.org/)
* Derived state and memoization: [Reselect](https://github.com/reduxjs/reselect)
* Charting: [Victory](https://github.com/FormidableLabs/victory)
* Routing: [React-router](https://github.com/ReactTraining/react-router)
* CSS-in-JS: [Styled-components](https://www.styled-components.com/)
* Testing framework: [Jest](https://jestjs.io/)
* React component testing: [Enzyme](https://github.com/airbnb/enzyme)
* Function spying in tests: [Sinon](https://sinonjs.org/)
* Other libraries: react-redux, lodash.keyby, history, whatwg-fetch

## Testing

Jest was used as a testing framework for unit tests. Integration tests of the core state management layer are found in store/tests. Because of the importance of charting visuals not changing unexpectedly, the WorkoutChart component utilizes snapshot tests.

All tests can be run using the `npm run test` script.

## Tradeoffs and future considerations

### API

If this were to be productionized, by far the most important area of focus would be the structure of API endpoints on the back end. We currently have to fetch the user, then fetch their workouts, and then make one network request per workout to get the data we need to determine one-rep maxes and create the charts. There are a few ways we could solve this; in increasing order of preference, I would advocate:

* **Adding a bulk endpoint** this quick and dirty approach would still send the same amount of data over the wire, but would require far fewer network requests and would allow us to query single sets before the workout request has returned.
* **Using GraphQL to query the data we need** A lot of the data we get back from the API endpoints isn't useful to the front end: things like created and updated timestamps. GraphQL would allow us to reduce the amount of data we send over the wire by querying only the parts of the data that we need.
* **Adding specialized endpoints to the back end** The front end probably shouldn't be in charge of core parts of our app's logic, like calculating the theoretical one-rep max, in the first place. In an ideal world, the back end would calculate the one-rep maxes and send the results to the front end to present. There are a few ways we could do this, depending on scale and latency requirements -- the back end could pre-calculate the overall and workout-by-workout maxes and send all the data at once, or graph data could be lazily loaded and queried when a workout is selected from the list.

A dedicated `/login` endpoint would also be useful, since right now we're just querying `/users` to validate auth and determine the userId.

### Charting

There's some relatively low-hanging fruit for improving the charts. They're currently using linear interpolations, but smoother interpolations would probably yield better-looking graphs in most cases. I tried a couple more advanced interpolation options here, but they ended up looking worse. With more time, I'd investigate using one of them.

I'd also look into improving the drill-down capability of the graphs to view more detailed workout data. The most useful thing, in my opinion, would be improving the data point hover & selection capabilities on the graph. I looked into using a Voronoi container to highlight the nearest point on hover, but performance was unacceptably poor. I'd want to try tweaking parameters to see if I could get it working.

### E2E tests
This app has fairly good unit test coverage and integration tests for the core state management and logic, but is lacking E2E tests. In production we'd want to add those.

### Other
I'd like to see a user profile view rather than just a logout button.

## Running, testing, and building

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
