#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Kimmiy Hotel App..."

# Fix for "docker-credential-desktop not found"
export PATH=$PATH:/Applications/Docker.app/Contents/Resources/bin

# Check if docker is available now
if ! command -v docker &> /dev/null; then
    echo "Error: Docker command not found. Please install Docker Desktop."
    exit 1
fi

echo "Docker found at: $(which docker)"

# Run Docker Compose
echo "Building and starting containers..."
docker compose up -d --build

if [ $? -eq 0 ]; then
    echo "Success! Application is running."
    echo "Frontend: http://localhost:3000"
    echo "Admin:    http://localhost:3000/admin/login"
else
    echo "Failed to start containers."
    exit 1
fi
