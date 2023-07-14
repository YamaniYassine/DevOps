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
                dir('frontend') {
                    sh 'npm test'
                }
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
        stage('Logs') {
            steps {
                sh 'docker-compose logs'
            } 
        }
    }
}
