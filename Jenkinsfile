pipeline {
    agent any
    stages {
        stage('stoping containers') {
            steps {
                sh ''
            }
        }
        stage('Clean docker') {
            steps {
                sh 'docker system prune --all --force --volumes'
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('Docker buid') {
            steps {
                sh 'docker-compose build --no-cache'
            }
        }
        stage('starting containers') {
            steps {
                sh ''
            }
        }
        stage('Testing') {
            steps {
                sh 'docker ps'
            } 
        }
    }
}
