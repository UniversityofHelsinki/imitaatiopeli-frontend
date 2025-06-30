# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Set the working directory
WORKDIR /app

# Copy the dist files into the working directory
COPY dist /usr/share/nginx/html

# Update the package list and install dependencies
RUN apk update && \
    apk add --no-cache tzdata

# Ensure /app directories exist and have the correct permissions
RUN mkdir -p /app/logs /var/cache/nginx /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create a non-root user and group
RUN addgroup -S nginxgroup && \
    adduser -S nginxuser -G nginxgroup

# Create nginx.pid file and set permissions
RUN touch /var/run/nginx.pid && \
    chown nginxuser:nginxgroup /var/run/nginx.pid && \
    chmod 660 /var/run/nginx.pid

# Set ownership and permissions for /app directories to be writable by nginxuser
RUN chown -R nginxuser:nginxgroup /app/logs /usr/share/nginx/html /var/cache/nginx && \
    chmod -R 755 /app/logs /usr/share/nginx/html /var/cache/nginx

# Ensure /tmp directory has correct permissions
RUN mkdir -p /tmp && \
    chown -R nginxuser:nginxgroup /tmp && \
    chmod 755 /tmp

# Switch to the non-root user
USER nginxuser

# Expose port 8080
EXPOSE 8080

# Define the command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
