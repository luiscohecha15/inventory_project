FROM node:20-bullseye-slim
WORKDIR /workspace

# Install utilities and minimal deps for Playwright browsers and MongoMemoryServer
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl gnupg libgtk-3-0 libx11-6 libxcomposite1 libxrandr2 libasound2 libnss3 libatk1.0-0 libatk-bridge2.0-0 libgbm1 libpangocairo-1.0-0 \
    libssl1.1 \
    && rm -rf /var/lib/apt/lists/*

# Copy repo into image
COPY . /workspace

WORKDIR /workspace

# Make the test script executable
RUN chmod +x /workspace/docker/test-runner/run-tests.sh

ENTRYPOINT ["/workspace/docker/test-runner/run-tests.sh"]
