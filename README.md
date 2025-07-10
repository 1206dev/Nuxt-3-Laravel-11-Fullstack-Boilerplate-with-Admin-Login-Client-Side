# Nuxt 3 + Laravel Fullstack Boilerplate with Admin Login

A modern fullstack starter kit using **Nuxt 3 (client-side)** as frontend and **Laravel 11** as backend API. Includes basic admin login using **Laravel Sanctum**.

---

## Project Structure

```
/frontend   # Nuxt 3 app (SPA with client-side routing)
/backend    # Laravel 11 API (REST with Sanctum auth)
```

---

## Requirements

- **PHP** >= 8.2
- **Node.js** >= 20
- **Composer**
- **Yarn** or **npm**

---

## Quick Start

### 1. Clone Repo
```bash
git clone https://github.com/1206dev/Nuxt-3-Laravel-11-Fullstack-Boilerplate-with-Admin-Login-Client-Side.git your-repo-name
cd your-repo-name
```

---

### 2. Setup Backend (Laravel)
```bash
cd backend

# Install dependencies
composer install

# Copy environment config
cp .env.example .env

# Generate app key
php artisan key:generate

# (Optional) Setup DB
# php artisan migrate

# Start Laravel server
php artisan serve
```

Laravel will run at: `http://127.0.0.1:8000`

---

### 3. Setup Frontend (Nuxt 3)
```bash
cd ../frontend

# Copy environment config
cp .env.dev .env

# Install dependencies
yarn install

# Run Nuxt in dev mode
yarn run dev
```

Nuxt will run at: `http://localhost:3000`

---

## Authentication

- Admin login is implemented using **Laravel Sanctum**
- Frontend handles auth client-side (token stored in localStorage or cookie)
- API protected by middleware: `auth:sanctum`

---

## Tech Stack

### Frontend (Nuxt 3)
| Package | Purpose |
|--------|---------|
| `nuxt` | Nuxt 3 Framework |
| `vue3-toastify` | Toast notification |
| `@vee-validate/nuxt` + `yup` | Form validation |
| `sweetalert2` | Alert & popup UI |
| `compromise` | NLP text parser |
| `jquery` | Legacy support (if needed) |
| `better-sqlite3` | For local SQL logic or dev tools |

---

### Backend (Laravel 11)
| Package | Purpose |
|--------|---------|
| `laravel/framework` | Main framework |
| `laravel/sanctum` | Token-based auth |
| `jenssegers/agent` | Device detection |
| `fakerphp/faker` | Fake data for testing |
| `laravel/sail`, `pail`, `pint` | Dev tools (Docker, logs, formatter) |
| `phpunit`, `mockery` | Testing |

---

## Testing

### Laravel
```bash
cd backend
php artisan test
```

### Nuxt (optional setup needed)
```bash
cd frontend
# Coming soon!
```

---

## Deployment

- Nuxt 3 can be built as static or hosted separately from Laravel API
- Sanctum setup assumes **separate frontend + backend domains**
- Use proxy or CORS config in `.env` as needed

---

## License

This project is open-sourced under the [MIT license](https://github.com/1206dev/Nuxt-3-Laravel-11-Fullstack-Boilerplate-with-Admin-Login-Client-Side/blob/master/LICENSE).

---

## ✨ Credits

Maintained by [1206dev](https://github.com/1206dev). Feel free to fork, star, and contribute!