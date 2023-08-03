# Star Wars API (SWAPI) App

## Introduction

The Star Wars API (SWAPI) App is a web application that allows users to explore the Star Wars API. It leverages the SWAPI database, providing users with a search feature to discover various entities, such as characters, planets, and starships, within the Star Wars universe. The application utilizes Redux for managing CRUD (Create, Read, Update, Delete) operations.

![App Screenshot](/media/screenshot.png)
_Screenshot of the Star Wars API (SWAPI) App._

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features

- Search for entities in the Star Wars universe, such as characters, planets, and starships.
- View detailed information about each entity, including their names, characteristics, and descriptions.
- Real-time search results as the user types their query, with an autocomplete feature.
- Perform CRUD operations:
  - Add new entities with details such as names, characteristics, and descriptions.
  - Edit existing entities' details.
  - Delete entities from the database.
- Navbar component for easy navigation between different sections of the app and exploration of various entities within the Star Wars universe.

## Installation

Follow these steps to set up the SWAPI App:

1. Clone the repository to your local machine using the following command:

```bash
   git clone https://github.com/NoaD159/swapi
```

2. Install the required dependencies:

```bash
cd swapi
npm install
```

## Usage

To run the app, use the following command:

```bash
npm start
```

Once the app is running, open your web browser and go to http://localhost:3000 to access the SWAPI App.

## Technologies Used

The SWAPI App is built using the following technologies:

- React.js: Front-end JavaScript library for building user interfaces.
- Material-UI: A popular React UI framework for designing responsive web applications.
- Axios: A library for making HTTP requests to interact with the server.
- Redux: A predictable state container for managing application state.
- SWAPI: The Star Wars API, providing comprehensive data about the Star Wars universe.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
