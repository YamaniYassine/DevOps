pipeline {
    agent any
    stages {
        stage('stoping containers') {
            steps {
                sh 'docker stop $(docker ps -q)'
            }
        }
        stage('checking Docker Compose version') {
            steps {
                sh 'docker-compose version'
            }
        }
        stage('Docker down') {
            steps {
                sh 'docker-compose down'
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
