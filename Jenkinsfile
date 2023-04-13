pipeline {
    agent any
    stages {
        stage('testing') {
            steps {
                sh '''
                    docker info
                    docker version 
                    docker compose version
                    curl --version
                    jq --version
                '''
            }
        }
    }
}
