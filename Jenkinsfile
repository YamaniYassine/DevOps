pipeline {
    agent any
    stages {
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('Pulling the new commit') {
            steps {
                sh 'git pull origin main'
            }
        }
        stage('Testing') {
            steps {
                // Run frontend tests
                sh 'docker run -v $PWD/frontend:/frontend -w /frontend node:14 npm install && npm test'
            }
        }
        stage('Logs') {
            steps {
                sh 'docker-compose logs'
            } 
        }
    }
}
