FROM ubuntu:20.04

RUN apt-get update -y
## && apt-get upgrade -y

###########################################################################
# Install php
###########################################################################

RUN apt install -y software-properties-common
RUN add-apt-repository ppa:ondrej/php

RUN apt-get update

RUN apt install -y php8.2-fpm
RUN apt install -y php8.2-common php8.2-mysql php8.2-xml php8.2-xmlrpc php8.2-curl php8.2-gd php8.2-imagick php8.2-cli php8.2-imap php8.2-mbstring php8.2-opcache php8.2-zip php8.2-intl php8.2-bcmath

###########################################################################
# Install nginx
###########################################################################

RUN apt install -y nginx

###########################################################################
# Install node & npm & nvm & pm2
###########################################################################
RUN apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
#RUN npm install -g npm
#RUN npm install
#RUN apt-get install -y npm && npm install -g npm
RUN npm install -g pm2

# Update node version suitable to the project

#RUN ls $HOME

#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
#SHELL ["bash", "-lc"]  # This similar to restart terminal (to get nvm work)
#SHELL ["bash", "-lc"]
#ENV NVM_DIR=/root/.nvm
#RUN . $HOME/.nvm/nvm.sh && nvm install 10.21.0 # Install correct node version

###########################################################################
# Install common util
###########################################################################

RUN apt-get install -y procps
RUN apt install -y cron
RUN apt install nano
RUN apt install curl
RUN apt install -y mysql-server

ENTRYPOINT ["/startup.sh"]
