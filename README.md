# MEAN Stack CRUD Application with Docker

A complete Task Manager application built with MongoDB, Express.js, Angular, and Node.js, fully containerized with Docker.

## Features

- ✅ **Full CRUD Operations** (Create, Read, Update, Delete)
- 🐳 **Dockerized** with Docker Compose
- 📱 **Responsive Design** 
- 🎯 **Task Management** with status and priority
- 🚀 **Production Ready** with proper error handling

## Tech Stack

- **Frontend**: Angular 16 with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Project Structure

```
mean-crud-app/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── angular.json
    └── src/
        ├── index.html
        ├── main.ts
        └── app/
            ├── app.module.ts
            ├── app.component.ts
            ├── app.component.html
            ├── app.component.css
            └── task.service.ts
```

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git (to clone the repository)

### Installation & Setup

1. **Create the project directory structure:**
   ```bash
   mkdir mean-crud-app
   cd mean-crud-app
   mkdir backend frontend
   ```

2. **Create all the files** as shown in the artifacts above:
   - Copy `docker-compose.yml` to the root directory
   - Create backend files in the `backend/` directory
   - Create frontend files in the `frontend/` directory

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - **Frontend**: http://localhost:4200
   - **Backend API**: http://localhost:3000/api
   - **MongoDB**: localhost:27017

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/health` | Health check |

## Task Schema

```json
{
  "title": "string (required)",
  "description": "string (required)",
  "status": "pending | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "date (optional)",
  "createdAt": "date (auto)",
  "updatedAt": "date (auto)"
}
```

## Docker Services

- **mongodb**: MongoDB database with persistent volume
- **backend**: Node.js/Express API server
- **frontend**: Angular development server

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev  # Uses nodemon for hot reload
```

### Frontend Development
```bash
cd frontend
npm install
ng serve --host 0.0.0.0 --port 4200
```

### Database Access
```bash
# Connect to MongoDB container
docker exec -it mean-mongodb mongosh

# Use the database
use taskdb

# View collections
show collections

# Find all tasks
db.tasks.find()
```

## Production Deployment

For production deployment, you should:

1. **Build optimized Angular app:**
   ```bash
   ng build --configuration production
   ```

2. **Use production MongoDB setup** with proper authentication
3. **Add environment variables** for sensitive data
4. **Use reverse proxy** (nginx) for serving static files
5. **Add SSL certificates** for HTTPS

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 4200, and 27017 are available
2. **Docker permissions**: Ensure Docker daemon is running
3. **MongoDB connection**: Wait for MongoDB to fully start before backend connects

### Useful Commands

```bash
# View logs
docker-compose logs -f [service_name]

# Rebuild specific service
docker-compose up --build [service_name]

# Stop all services
docker-compose down

# Clean up
docker-compose down -v  # Removes volumes too
docker system prune     # Clean up unused containers/images
```

## Next Steps

To extend this application, consider adding:

- User authentication and authorization
- Real-time updates with WebSockets
- File upload functionality
- Email notifications
- Advanced filtering and search
- Unit and integration tests
- CI/CD pipeline
- Monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).