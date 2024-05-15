FROM php:8.2-fpm
LABEL authors="szymonduranowski"

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Set working directory
WORKDIR /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install npm packages
RUN npm install npm@latest -g

# Copy composer files and install dependencies
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# Copy package.json and install npm dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Laravel key
RUN php artisan key:generate

# Build React assets
RUN npm run dev

# Expose port 9000 and start PHP-FPM server
EXPOSE 9000
CMD ["php-fpm"]
