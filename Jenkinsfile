pipeline {
    agent {
        docker {
            image 'docker:latest'
            args '--privileged'
        }
    }
    stages {
        stage('testing') {
            steps {
                sh 'docker-compose ps'
            }
        }
    }
}
