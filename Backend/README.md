# Vidhaan — Auth Backend (Login/Register)

Express + JWT + bcrypt backend for login/register. No external database needed —
users are stored in a local JSON file (`src/db/users.json`), so you can run this
immediately without setting up MongoDB/Postgres. Swap `src/db/db.js` + `src/models/User.js`
for a real database later without touching controllers or routes.

## Setup

```bash
npm install
cp .env.example .env     # edit JWT_SECRET and CLIENT_ORIGIN as needed
npm run dev               # http://localhost:5000
```

## Folder structure

```
server.js                    entry point — starts the HTTP server

src/
  app.js                      Express app: middleware + route mounting

  config/
    env.js                     reads & centralizes .env values

  db/
    db.js                      tiny JSON-file read/write helper
    users.json                 the "database" (auto-created if missing)

  models/
    User.js                    data-access functions (findByEmail, create, ...)

  controllers/
    authController.js          register, login, getMe, updateMe, logout

  routes/
    authRoutes.js               /api/auth/* endpoint wiring

  middleware/
    authMiddleware.js           verifies JWT, attaches req.user
    errorHandler.js             404 + centralized error responses

  utils/
    token.js                    generateToken / verifyToken (JWT)
    asyncHandler.js              wraps async routes, forwards errors
    validators.js                request payload validation
```

## API

Base URL: `http://localhost:5000/api/auth`

| Method | Route      | Auth required | Body                                    |
|--------|------------|----------------|------------------------------------------|
| POST   | /register  | No             | `{ name, email, password, org? }`        |
| POST   | /login     | No             | `{ email, password }`                    |
| GET    | /me        | Yes            | —                                         |
| PUT    | /me        | Yes            | `{ name?, org? }`                         |
| POST   | /logout    | Yes            | —                                         |

Protected routes expect `Authorization: Bearer <token>`.

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sarah Anand","email":"sarah@nimbuspay.in","password":"demo1234","org":"NimbusPay"}'
```
Response `201`:
```json
{ "user": { "id": 1, "name": "Sarah Anand", "email": "sarah@nimbuspay.in", "org": "NimbusPay", "createdAt": "..." }, "token": "..." }
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sarah@nimbuspay.in","password":"demo1234"}'
```
Response `200`: same shape as register.

### Get current user
```bash
curl http://localhost:5000/api/auth/me -H "Authorization: Bearer <token>"
```

## Notes

- Passwords are hashed with bcrypt (10 salt rounds) — plaintext passwords are never stored.
- JWTs expire after `JWT_EXPIRES_IN` (default 7 days, set in `.env`).
- CORS is restricted to `CLIENT_ORIGIN` from `.env` — set this to your frontend's URL
  (e.g. `http://localhost:5173` for the Vidhaan React app).
- To connect this to the React frontend built earlier: on login/register success, store
  `token` (e.g. in memory or a cookie) and send it as `Authorization: Bearer <token>` on
  every subsequent request instead of the current mock `login()` in `AppContext.jsx`.
