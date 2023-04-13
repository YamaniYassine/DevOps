FROM jenkins/jenkins:lts

USER root



# Install sudo
RUN apt-get update && \
    apt-get -y install sudo && \
    rm -rf /var/lib/apt/lists/*

# Install Docker
RUN curl -fsSL https://get.docker.com -o get-docker.sh && \
    sh get-docker.sh

# Add jenkins user to sudoers with no password
RUN echo "jenkins ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create docker user
RUN groupadd -g 999 docker && \
    useradd -r -u 999 -g docker docker

# Add jenkins user to docker group
RUN usermod -aG docker jenkins

ENV PATH=$PATH:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin

USER jenkins
