### Endpoints
1. User Registration
- URL: /user/register
- Method: POST
- Description: Register a new user.
- Request Body:
```
json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- Success Response:
- Code: 201 Created
- Content:
```
json
Copy
Edit
{
  "message": "User registered successfully",
  "user": {
    "_id": "60a6f0b8c8a3a4b7a2345cd9",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

- Error Responses:
- 400 Bad Request (missing fields or invalid data)
- 409 Conflict (email already exists)

2. User Login
- URL: /user/login
- Method: POST
- Description: Authenticate a user and get JWT.
- Request Body:
```
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}

```

- Success Response:
- Code: 200 OK
- Content:
```
json
Copy
Edit
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

- Error Responses:

401 Unauthorized (invalid credentials)

3. Get All Learners
- URL: /learners

- Method: GET

- Description: Fetch all learners (requires authentication).

- Headers:

```
Authorization: Bearer <token>
```

- Success Response:

- Code: 200 OK

Content:
```
json
[
  {
    "_id": "60a6f123c8a3a4b7a2345cda",
    "name": "Learner 1",
    "age": 10,
    "grade": "5"
  },
  {
    "_id": "60a6f133c8a3a4b7a2345cdb",
    "name": "Learner 2",
    "age": 11,
    "grade": "6"
  }
]
```

- Error Responses:
- 401 Unauthorized