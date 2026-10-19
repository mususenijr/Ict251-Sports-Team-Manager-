ICT 251 Activity 4: Sports Team Roster and Fixtures

1. Project Description

The Sports Team Roster and Fixtures Management System is a Node.js web application designed to manage sports players and match fixtures.

The system allows users to add, view, update, and delete records through a web interface and REST API.

2. Technologies Used

- Node.js
- JavaScript
- HTML5
- CSS3
- REST API
- SQL

3. Main Features

- Register sports players.
- Record player positions and jersey numbers.
- Record opponents, match dates, venues, and fixture types.
- View all stored records.
- Update existing records.
- Delete records.
- Use HTTP methods to perform CRUD operations.

4. Project Structure

ict251-sports-team-manager/
├── server.js
├── schema.sql
├── README.md
└── public/
    └── index.html

5. API Endpoints

Base endpoint: "/api/sports"

HTTP Method| Endpoint| Purpose
GET| /api/sports| Retrieve all records
POST| /api/sports| Create a new record
PUT| /api/sports/1| Update record with ID 1
DELETE| /api/sports/1| Delete record with ID 1

6. Example POST Request

{
  "record_type": "Player",
  "player_name": "John Banda",
  "position": "Forward",
  "jersey_number": 10,
  "status": "Player"
}

7. Example Fixture

{
  "record_type": "Fixture",
  "opponent": "Campus Eagles",
  "match_date": "2026-10-25",
  "venue": "University Court",
  "fixture_type": "League",
  "status": "Upcoming"
}

8. Database Design

The SQL file creates a database named "campus_crud" and a table named "sports".

The table includes an automatically incrementing primary key, player details, fixture details, and timestamps.

The SQL script is provided in "schema.sql".

9. Running the Application

The application uses Node.js built-in modules and does not require Express or other external packages.

To run it in a suitable Node.js environment:

1. Download or clone the repository.
2. Ensure Node.js is installed.
3. Run "node server.js".
4. Open the application's available web address.
5. Use the form to add, edit, and delete records.

The application uses a JSON file for record storage when running in an environment where the file system is writable. The SQL schema is supplied separately for database implementation.

10. Conclusion

The project demonstrates the implementation of basic CRUD operations using Node.js and HTTP methods. It provides a simple interface for managing sports roster information and fixtures.
