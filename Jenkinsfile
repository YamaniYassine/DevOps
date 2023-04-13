pipeline {
    agent any
    stages {
        stage('Install Docker Compose') {
            steps {
                sh ''
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('stoping containers') {
            steps {
                sh 'docker-compose ps'
            }
        }
        stage('Testing') {
            steps {
                sh 'docker-compose ps'
            }
            
        }
    }
}
