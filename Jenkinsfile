pipeline {
    agent any
    stages {
        stage('stoping containers') {
            steps {
                sh ''
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('starting containers') {
            steps {
                sh 'docker-compose up -d --network pfe-yy-om-v2_mynetwork'
            }
        }
        stage('Testing') {
            steps {
                sh 'docker-compose ps'
            } 
        }
    }
}
