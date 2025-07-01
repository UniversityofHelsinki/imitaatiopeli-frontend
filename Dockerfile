# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Set the working directory
WORKDIR /app

# Update packages, install dependencies, and configure directories
RUN apk update && \
    apk add --no-cache tzdata && \
    mkdir -p /app/logs /var/cache/nginx /usr/share/nginx/html && \
    rm -rf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the dist files into the working directory
COPY dist /usr/share/nginx/html

# Create a non-root user and group, configure permissions for OpenShift
RUN addgroup -S nginxgroup && \
    adduser -S nginxuser -G nginxgroup && \
    # Set group ownership and group-writable permissions (OpenShift compatible)
    chown -R nginxuser:root /app/logs /var/cache/nginx && \
    chmod -R 775 /app/logs /var/cache/nginx && \
    # Static files should be readable by all
    chmod -R 755 /usr/share/nginx/html && \
    chmod 644 /etc/nginx/nginx.conf


# Switch to the non-root user
USER nginxuser

# Expose port 8080
EXPOSE 8080

# Define the command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
