pipeline {
  agent {
    docker {
      image 'node:lts'
      args '-u root'
      reuseNode true
    }
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Deploy') {
      when {
        branch 'production'
      }
      steps {
        sh 'docker-compose -f docker-compose.yml up -d --build'
      }
    }
  }
}
