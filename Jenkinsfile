pipeline {
    agent any
    stages {
        stage('Install Node.js and npm') {
            steps {
                sh 'curl -sL https://deb.nodesource.com/setup_14.x | bash -'
                sh 'apt-get install -y nodejs'
                sh 'npm install -g npm@latest'
            }
        }
        stage('Build') {
            steps {
                script {
                    // Check if there are changes in the frontend directory
                    def frontendChanges = sh(returnStdout: true, script: 'git diff --name-only HEAD^ HEAD -- frontend/').trim()

                    // Check if there are changes in the backend directory
                    def backendChanges = sh(returnStdout: true, script: 'git diff --name-only HEAD^ HEAD -- backend/').trim()

                    // Build and test the frontend if changes were made
                    if (frontendChanges) {
                        dir('frontend') {
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'npm run test'
                        }
                    }

                    // Build and test the backend if changes were made
                    if (backendChanges) {
                        dir('backend') {
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'npm run test'
                        }
                    }
                }
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
