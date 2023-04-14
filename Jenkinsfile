pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'cd frontend && npm install && npm run build'
                sh 'cd backend && npm install && npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'cd frontend && npm run test'
                sh 'cd backend && npm run test'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
