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
        stage('re-building the images') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('Testing') {
            steps {
                sh 'docker ps'
            } 
        }
        stage('Logs') {
            steps {
                sh 'docker logs'
            } 
        }
    }
}
