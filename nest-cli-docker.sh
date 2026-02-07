#!/bin/bash
# Wrapper to run nest cli via docker
docker run --rm -it -v $(pwd):/app -w /app node:18-alpine npx -y @nestjs/cli "$@"
