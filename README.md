# tic-tac-toe

The goal of this exercise is to build a web-based Tic-Tac-Toe game that supports real-time multiplayer functionality.

A full-stack tic-tac-toe application built with React and Node.js, demonstrating modern web development patterns and architectural decisions.

## Getting Started
1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Database Setup**
   - Make sure you have PostgreSQL installed and running locally
   - You will need to set a username and password for your db and add them to the /database/.env -> DATABASE_URL string. For example here are the commands to set them on the db. Lets say you want user name USER_NAME and password MY_PASSWORD.
  
      1. Create the user (replace USER_NAME and MY_PASSWORD with your desired values)
      psql postgres -c "CREATE USER \"USER_NAME\" WITH PASSWORD 'MY_PASSWORD';"

      2. Create the db named tictactoe
      psql postgres -c "CREATE DATABASE tictactoe;"

      3. Grant privileges to the user
      psql postgres -c "ALTER USER \"USER_NAME\" WITH SUPERUSER; GRANT ALL PRIVILEGES ON DATABASE tictactoe TO \"USER_NAME\";"

      4. Update your .env file with the new credentia
      echo 'DATABASE_URL="postgresql://USER_NAME:MY_PASSWORD@localhost:5432/tictactoe?schema=public"' > packages/database/.env

3. **Initialize Database**
   ```bash
   yarn db:generate    # Generate Prisma client
   yarn db:migrate     # Create and apply database migrations
   ```

4. **Start the Development Servers**
   ```bash
   yarn dev
   ```
   This will start both:
   - Web frontend (PORT=3000)
   - Backend service (PORT=3001)

5. **Load the Site**
- Open brower window A and go to http://localhost:3000/
- Create a couple users on the home screen
- Select one of the users to impersonate
- Create a game with both users
- Open a second browser window B
- Select the user not selected by browser A
- Select the game created
- Play tic tac toe

## TODOS
This section holds some of the many things I didnt get the time to wrap up
- Add current user selection to session state so its not lost on page refresh.
- Add tests of course.
- Fix typings. Somehow along the line I broke things and I dont have time to fix it. I am getting issues with the typings for the database for example in my imports. tsc :(
- Simplify and cleanup A LOT
- Validation of inputs on the UX
- Add draw logic for the game
- Move to server events instead of polling
- Put some time in the UI/Css as I didnt do much there its pretty ugly.

## Architecture & Design Decisions

### Frontend
- **React Query** for server state management - chosen for simplicity over managing custom store synchronization
- **React Context** for user state - sufficient for current scope, would migrate to granular store (Redux/Zustand) as state complexity grows
- **Container/Presenter pattern** - separation makes testing easier, applied when components have 3+ lines of rendered content
- Raw CSS implementation - avoided component libraries to keep dependencies minimal

### Backend
- Simple service architecture - separate models for service and db would be overkill for this scope
- Basic user validation - full auth/authorization system would be needed for production
- RESTful API design with standard patterns

## Production Readiness Improvements

### Performance Considerations
- **Pagination** - all lists would implement pagination in production
- **Virtual scrolling** - for large datasets to prevent memory bloat
- **Prop stablization** - would stabilize props and callbacks(esp on large lists) to prevent unnecessary re-renders (implementation based on profiling needs)
- **Redis caching** - planned for game state storage to handle high-frequency game updates
- **Server-Sent Events** - preferred over polling for real-time updates to reduce server pressure
- **Nx monorepo** - for optimized large-scale builds
- **Component library** - with proper design tokens for theme and typography consistency to allow the repo to scale nicely

### Authentication & Security
- **Centralized auth service** - cookie-based authentication for same-domain deployment

## Development Philosophy

The codebase prioritizes simplicity and maintainability over premature optimization, with clear upgrade paths for production scaling needs.