FROM jenkins/jenkins:lts

USER root

# Install sudo
RUN apt-get update && \
    apt-get -y install sudo && \
    rm -rf /var/lib/apt/lists/*

# Add jenkins user to sudoers with no password
RUN echo "jenkins ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Add jenkins user to docker group
RUN usermod -aG docker jenkins

USER jenkins
