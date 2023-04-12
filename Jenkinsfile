pipeline {
  agent any

  stages {
    stage('Stop containers') {
      steps {
        sh 'docker-compose down'
      }
    }
    stage('Pull from Git repo') {
      steps {
        git url: 'your-git-repo-url'
      }
    }
    stage('Start containers') {
      steps {
        sh 'docker-compose up -d'
      }
    }
    stage('Show container status') {
      steps {
        sh 'docker ps'
      }
    }
  }
}
