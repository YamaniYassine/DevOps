pipeline {
    agent any
    stages {
        stage('stoping containers') {
            steps {
                sh ''
            }
        }
        stage('pull the modification') {
            steps {
                sh "git rev-parse --abbrev-ref HEAD"
                sh "git rev-parse HEAD"
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('Docker buid') {
            steps {
                sh 'docker build'
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
