FROM jenkins/jenkins:lts

USER root

# Install sudo
RUN apt-get update && \
    apt-get -y install sudo && \
    apt-get -y autoremove && \
    apt-get -y autoclean

# Install Docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
    sudo apt-get update && \
    sudo apt-get -y install docker-ce docker-ce-cli containerd.io && \
    sudo apt-get -y autoremove && \
    sudo apt-get -y autoclean

# Add jenkins user to sudoers with no password
RUN echo "jenkins ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create docker group
RUN sudo groupadd docker

# Add jenkins user to docker group
RUN sudo usermod -aG docker jenkins

USER jenkins
