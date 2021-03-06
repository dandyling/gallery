# Unsplash Photo Gallery

This is a website template for [Unsplash](https://unsplash.com) powered photo gallery. You will be able to use the website to display beautiful photos and wallpapers using the [Unsplash API](https://unsplash.com/documentation) provided by Unsplash.

The app is built with performance in mind. It uses [React Query](https://react-query.tanstack.com/), which has many benefits such as showing stale data while refetching, and infinite query. It also uses [Chakra UI](https://chakra-ui.com/), an accessible component library which are easily composible.

Using the photo gallery, you will be able to scroll through photos infinitely. You will also be able to browse photos by categories. The photos are also optimized to show different resolutions depending on your screen size, and will show a [blurhash](https://blurha.sh/) while loading.

You can check out the live [demo](https://unsplash-photo-gallery.netlify.app/) here.

The application is responsive with mobile-first.

## Application structure

The app is written to be as modular as possible. You will find the structure of the folders as below to encourage code reuse.

1. Components folder

```bash
/components
```

This folder is purely concerned with the presentational components in the application, such as `<Gallery>` and `<Photo />` etc. These components are generic components that can be reuse throughout the application and they do not contain business logic.

2. Features

```bash
/features
```

The app is separated into domain called features. Here you can find the components that are specific to certain domain feature. For example, you can find the Unsplash's API photo gallery under the `/features/home` directory.

For extra features, you can add it under this directory.

3. Business logic

```bash
/data
```

These are data hooks that call the api. You can use them for example below

`const { data } = useSearch()`

4. Tests

The app is tested using jest and testing-libary. You can view the test coverage in the directory `/coverage/lcov-report/index.html`.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project to a live system.

### To Install

1. Clone the git repository

```bash
git clone https://github.com/sonny-pulse-id/fe-dandyling-gmail.com.git photo-gallery
```

2. Install the dependencies

```bash
cd photo-gallery
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
npm run coverage
# or
yarn run coverage
```

You will be able to see the coverage in `/coverage/lcov-report/index.html`

## Deployment

To build the output bundle, run the following command

```bash
npm run build
# or
yarn run build
```

You will find the output bundle in `/build` directory. You can deploy it just by uploading the whole folder to a provider such as [Netlify](https://www.netlify.com/).

## Authors

- Initial idea by [Dandy Ling](https://github.com/dandyling/)

## Todo

1. Implement prefetching for infinite query.
