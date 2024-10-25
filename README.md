# [Formfiy](https://formify.techbabette.com/)

## Overview

Formify is a web application that helps people create no-code forms in a user friendly way.

## Technologies used

The frontend is based on React and its various libraries, [the backend](https://github.com/techbabette/FormifyBackend) is comprised of a main Laravel service and a NodeJS microservice, the backend services communicate using RabbitMQ and take advantage of Redis for caching.

## Running

To run the frontend, clone this repository and type 

```
npm run dev
```
to start a local development environment, or
```
npm run build
```
to build the frontend for a production environment.

## Features

- Lets users start creating forms locally before they register, increasing user retention.
- Light \& dark mode available.