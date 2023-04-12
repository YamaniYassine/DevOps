pipeline {
  agent any

  stages {
    stage('Stop containers') {
      steps {
        sh 'docker-compose down'
      }
    }
    stage('Show container status') {
      steps {
        sh 'docker ps'
      }
    }
    stage('Pull from Git repo') {
      steps {
        git url: 'https://github.com/IEF2IYYOM/PFE-YY-OM-V2'
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
