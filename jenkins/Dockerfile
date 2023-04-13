FROM jenkins/jenkins:lts

USER root

# Install Docker prerequisites
RUN apt-get update && \
    apt-get -y install apt-transport-https ca-certificates curl gnupg lsb-release && \
    rm -rf /var/lib/apt/lists/*

# Add Docker GPG key
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor | tee /usr/share/keyrings/docker-archive-keyring.gpg >/dev/null

# Add Docker repository
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list >/dev/null

# Install Docker
RUN apt-get update && \
    apt-get -y install docker-ce docker-ce-cli containerd.io && \
    rm -rf /var/lib/apt/lists/*

# Add jenkins user to docker group
RUN usermod -aG docker jenkins

USER jenkins
