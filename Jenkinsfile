pipeline {
    agent {
        docker {
            image 'node:14-alpine'
            args '-v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose'
        }
    }
    environment {
        CI_COMMIT_REF_NAME = "${env.BRANCH_NAME}"
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Dev Deploy') {
            when {
                branch 'dev'
            }
            environment {
                DOCKER_COMPOSE_FILE = 'docker-compose.dev.yml'
            }
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
            }
        }
        stage('Pre-Production Deploy') {
            when {
                branch 'preproduction'
            }
            environment {
                DOCKER_COMPOSE_FILE = 'docker-compose.preproduction.yml'
            }
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
            }
        }
        stage('Production Deploy') {
            when {
                branch 'production'
            }
            environment {
                DOCKER_COMPOSE_FILE = 'docker-compose.production.yml'
            }
            steps {
                sh 'docker-compose -f $DOCKER_COMPOSE_FILE up -d'
            }
        }
    }
}
