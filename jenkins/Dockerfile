FROM jenkins/jenkins:lts-jdk11
USER root

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils && apt-get install -y curl
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils && apt-get install curl -y
RUN curl -fsSl https://get.docker.com | sh
RUN curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose \ && chmod +x /usr/local/bin/docker-compose
RUN groupmod -g 997 docker
RUN usermod -aG docker jenkins

USER jenkins
