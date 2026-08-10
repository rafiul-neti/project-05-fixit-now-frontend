# API Integration

| Frontend Feature | Method | Endpoint | Purpose |
|---|---|---|---|
| Navbar / User Info | GET | `/api/auth/me` | Fetch the currently authenticated user's information |
| Services Section | GET | `/api/services` | Fetch and display all available services |
| Technicians Section | GET | `/api/technicians` | Get and display available technicians with their services, ratings, and review counts. |

## Endpoints Used

### `GET /api/auth/me`
Used to retrieve the current active user's information for authentication state and user details.

### `GET /api/services`
Used to retrieve all available services and display them in the home page services section.

### `GET /api/technicians`
Used to retrieve available technicians and display them in the home page technicians section.