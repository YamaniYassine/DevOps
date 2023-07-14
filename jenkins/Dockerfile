FROM jenkins/jenkins:lts-jdk11
USER root

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils && apt-get install -y curl
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils && apt-get install curl -y
RUN curl -fsSl https://get.docker.com | sh
RUN curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-Linux-x86_64 -o /usr/local/bin/docker-compose
RUN groupmod -g 999 docker
RUN usermod -aG docker jenkins

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

USER jenkins
