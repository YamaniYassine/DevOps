pipeline {
    agent any
    stages {
        stage('Install Docker Compose') {
            steps {
                sh 'curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin/docker-compose'
                sh 'chmod +x /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin/docker-compose'
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
