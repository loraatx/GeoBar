# Use an official Node runtime as a parent image for building
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Production image to serve the app
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g serve

# Copy built assets from previous stage
COPY --from=build /app/dist ./dist

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Run the app with serve
CMD ["serve", "-s", "dist", "-l", "8080"]
