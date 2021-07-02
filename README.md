# Unsplash Photo Gallery

This is a template photo gallery that uses [Unsplash API](https://unsplash.com/documentation) to display a collection of beautiful photos. You will be able to browse the photos by categories, and filter by tags.

The app is built with performance in mind. It has cached query, so the page will show stale data while refetching in the background.

The code is written to be as modular as possible to encourage code reuse. Thus, you can refer to the following for easier navigation of the folder structures.

1. Presentational layer

```bash
/components
```

This layer is purely concerned with the generic components in the application, such as `<Badge>`, `<Card />` etc. These components are reuse throughout the application, so they do not contain any business logic. They also use proper semantic tags for easier web-accesibility.

2. Features

```bash
/features
```

The app is separated into business domain called features. Here you can find the React components that are specific to certain business feature. For example, you can find the salary features under `/features/salaries` directory. Thus, this is more scalable in the future if you decided to add more features

3. Business logic

```bash
/data
```

These are business logic calculations, such as the salary calculations etc

The presentational layer is built using tailwindcss, as it is a CSS only framework, and doesn't add javascript overhead for some CSS-in-JS framework such as ChakraUI. **The website is also fully responsive using CSS only**. Do checkout the mobile view using the demo below

[LIVE DEMO](https://employee-analytics.netlify.app/)

p.s. This app is also tested using jest and testing-libary. You can also view the test coverage setup by running `npm run test:cov` and see the report in `/coverage/index.html`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### To Install

1. Clone the git repository

```bash
git clone https://github.com/dandyling/employee-analytics
```

2. Change to the `/frontend` directory and install the dependencies

```bash
cd employee-analytics/frontend
npm install
# or
yarn install
```

3. To start the development:

```bash
npm run start
# or
yarn run start
```

You will find the development server running on `localhost:3000`

## Running the tests

To run the test:

```bash
npm run test
# or
yarn run test
```

### Viewing test coverage

Test coverage is setup for this project. To view the test coverage, run the following

```bash
npm run test:cov
# or
yarn run test:cov
```

You will be able to see the coverage in `/coverage/index.html`

## Deployment

To build the output bundle, run the following command

```bash
npm run build
# or
yarn run build
```

You will find the output bundle in `/build` directory. You can deploy it just by uploading the whole folder to a provider such as netlify.

## Built With

- [React Chartist](https://www.npmjs.com/package/react-chartist) - The React wrapper for the awesome [Chartist.js](http://gionkunz.github.io/chartist-js/) which allows the drawing of responsive charts with animations
- [Tailwindcss](https://tailwindcss.com/) - for the CSS framework to build the presentation layer
- [Recoil](https://recoiljs.org/) - for the state management framework

## Authors

- Panalyt - For the initial idea
- [Dandy Ling](https://github.com/dandyling/) - initial work

## Features

1. New Photos
2. Caching support
3. Performance - will prefetch the next page
4. Responsive at 80ch
5. Infinite Query
6. Categories

## Todo

1. Implement error boundaries :white_check_mark:
2. Implement loading indicator :white_check_mark:
3. Fix the pager current number :white_check_mark:
4. Suitable type for pageSize change :white_check_mark:
5. Use high resolution photos for different screen sizes :white_check_mark:
