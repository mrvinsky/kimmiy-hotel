#!/bin/bash
# Wrapper to run create-next-app via docker
docker run --rm -it -v $(pwd):/app -w /app node:18-alpine npx -y create-next-app@latest "$@"
