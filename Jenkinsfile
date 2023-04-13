pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Install Docker Compose') {
            steps {
                sh 'curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'chmod +x /usr/local/bin/docker-compose'
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('shut down') {
            steps {
                sh ''
            }
        }
        stage('Testing') {
            steps {
                sh 'docker-compose ps'
            }
        }
    }
}
