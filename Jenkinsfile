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
        stage('Docker buid') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('starting containers') {
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
