pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "thetiptop"
        COMPOSE_FILE = "./docker-compose.yml"
        PATH = "${PATH}:/usr/local/bin"
    }

    stages {
        stage('Dev') {
            steps {
                sh 'cd /root/mon-projet/PFE-YY-OM-V2 && docker-compose pull && docker-compose up -d'
            }
        }

        stage('Preproduction') {
            steps {
                sh 'cd /root/mon-projet/PFE-YY-OM-V2 && docker-compose -f docker-compose.yml pull && docker-compose -f docker-compose.yml up -d'
            }
        }

        stage('Production') {
            steps {
                sh 'cd /root/mon-projet/PFE-YY-OM-V2 && docker-compose -f docker-compose.yml pull && docker-compose -f docker-compose.yml up -d'
            }
        }
    }
}
