pipeline {
    agent any
    stages {
        stage('Install Docker Compose') {
            steps {
                sh 'curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose'
                sh 'chmod +x /usr/local/bin/docker-compose'
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh '/usr/local/bin/docker-compose version'
            }
        }
        stage('Testing') {
            steps {
                sh '/usr/local/bin/docker-compose ps'
            }
        }
    }
}
