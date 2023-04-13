pipeline {
    agent any
    stages {
        stage('stoping containers') {
            steps {
                sh 'docker-compose down'
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('starting containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('Testing') {
            steps {
                sh 'docker-compose ps'
            } 
        }
    }
}
