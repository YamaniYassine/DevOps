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
        stage('pull the modification') {
            steps {
                sh 'git pull origin main'
            }
        }
        stage('Docker buid') {
            steps {
                sh ''
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
