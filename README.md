# EntomoConnect

EntomoConnect is a platform for entomologists and nature enthusiasts to connect, share observations, and engage in discussions about insects and other arthropods.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Register](#register)
  - [Login](#login)
  - [Dashboard](#dashboard)
  - [Observations](#observations)
  - [Discussions](#discussions)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- [Python](https://www.python.org/) (3.x) installed.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [SQLite](https://www.sqlite.org/) (or another database system) for storing data.

### Installation

```bash
1. Clone the repository:

   git clone https://github.com/Flash1105/python-p5-project-EntomoConnect.git

2. Change to the project directory:

   cd python-p5-project-EntomoConnect

3. Set up the Python virtual environment:

   python -m venv venv

4. Activate the virtual environment:

   venv\Scripts\activate

5. Install Python dependencies:

   pip install -r requirements.txt

6. Change to the client directory:

   cd client

7. Install front-end dependencies:

   npm install

8. Change back to the project root directory:

   cd  ..

9. Navigate to your backend folder:

   cd server

10. Enable development:

    export FLASK_ENV=development

11. Initialize the database:

    python init_db.py

12. Start the backend server:

    flask run

13. Start the front end development server in the client directory:

    npm start

## Usage

### Register

Users can register for an account by providing a username, email, and password.

### Login

Registered users can log in to their accounts using their credentials.

### Dashboard

After logging in, users are directed to the dashboard, where they can view observations and discussions.

### Observations

Users can create new observations, view existing observations, and like observations.

### Discussions

Users can create new discussions, view discussions, and like discussions.

## Features

- User registration and authentication.
- Creating, viewing, and liking observations.
- Creating, viewing, and liking discussions.
- Interactive dashboard for users to manage their content.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the guidelines outlined in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
