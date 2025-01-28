FROM php:8.1-apache

RUN a2enmod rewrite

COPY ./ /var/www/html

RUN echo "<Directory /var/www/html>" >> /etc/apache2/apache2.conf \
    && echo "    AllowOverride All" >> /etc/apache2/apache2.conf \
    && echo "</Directory>" >> /etc/apache2/apache2.conf
RUN docker-php-ext-install mysqli pdo pdo_mysql

WORKDIR /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]