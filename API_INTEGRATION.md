# API Integration

| Frontend Feature           | Method | Endpoint                  | Purpose                                                                                |
| -------------------------- | ------ | ------------------------- | -------------------------------------------------------------------------------------- |
| Navbar / User Info         | GET    | `/api/auth/me`            | Fetch the currently authenticated user's information                                   |
| Services Section           | GET    | `/api/services`           | Fetch and display all available services                                               |
| Technicians Section        | GET    | `/api/technicians`        | Get and display available technicians with their services, ratings, and review counts. |
| Testimonial                | GET    | `/api/reviews`            | Get customer reviews and display them as testimonials.                                 |
| Get a New Access Token     | POST   | `/api/auth/refresh-token` | Get a new access token using the refresh token                                         |
| Register a User            | POST   | `/api/auth/register`      | Registering a user into the app                                                        |
| Login User                 | POST   | `/api/auth/login`         | Login a user                                                                           |
| Upcoming Booking Overview  | GET    | `/api/bookings`           | To display a countdown of a customer's upcoming booking.                               |
| To get total reviews count | GET    | `api/reviews/customer`    | To display how many review has been given by a CUSTOMER                                |
| Get all categories         | GET    | `/api/categories`         | Display Top Categories                                                                 |

## Endpoints Used

### `GET /api/auth/me`

Used to retrieve the current active user's information for authentication state and user details.

### `GET /api/services`

Used to retrieve all available services and display them in the home page services section.

### `GET /api/technicians`

Used to retrieve available technicians and display them in the home page technicians section.

### `GET /api/reviews/`

Used to retrieve reviews from users and display them in the home page testimonial section.

### `POST /api/auth/refresh-token`

Used to get a new access token using the refresh token.

### `POST /api/auth/register`

Used to register a user into the app.

### `POST /api/auth/login`

Used to log a user in into the app.

### `GET /api/bookings`

To display a countdown of a customer's upcoming bookings, active and completed services into the customer's dashboard .

### `GET api/reviews/customer`

To display how many review has been given by a CUSTOMER into the customer's dashboard.

### `GET /api/categories`

To display top categories into the customer's dashboard home page.
