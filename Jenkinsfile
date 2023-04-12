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
            branch 'main'
        }
        steps {
            sh 'docker-compose -f docker-compose.yml up -d --build'
            script {
                def dockercli = docker.image('docker').inside("-v /var/run/docker.sock:/var/run/docker.sock") {
                    return sh(script: 'which docker', returnStdout: true).trim()
                }
                sh "${dockercli} ps -a"
            }
        }
    }
  }
}
