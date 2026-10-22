#!/bin/sh

# Start the NestJS backend in the background
echo "Starting backend..."
cd /app/backend
node dist/main.js &

# Wait for the backend (and through it the database) to answer, then seed the admin user
echo "Waiting for backend to be ready..."
i=0
until nc -z localhost 3001 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -ge 60 ]; then
    echo "Backend did not respond in time, continuing..."
    break
  fi
  sleep 1
done

echo "Running admin seed..."
node dist/create-admin-seed.js || echo "Seed already done or failed, continuing..."

# Start the Next.js frontend in the foreground
echo "Starting frontend..."
cd /app/frontend
exec node server.js
