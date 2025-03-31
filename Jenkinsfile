pipeline {
    agent {
        label 'dockeragent'
    }
    
    environment {
        registryBackend = "ief2iyyom/pfe_backend"
        registryFrontend = "ief2iyyom/pfe_frontend"
        registryDatabase = "mongo"
        registryDatabaseTagged = "ief2iyyom/db-docker" // Re-tagged MongoDB image name
        reverseProxy = "nginx"
        registryCredential = 'dockerhub_pat'
        backendImage = ''
        frontendImage = ''
        databaseImage = ''
        DB_URL = "mongodb://admin:YthetiptopO123.@db-docker:27017/PFE?authSource=admin"

    }
    
    stages{
        stage('Checkout'){
            steps{
                git url: 'https://github.com/YamaniYassine/DevOps.git', branch: 'main'
            }
        }

        stage('Test code') {
            steps {
                echo 'Installing dependencies...'
                sh 'echo "Disk space usage before installing dependencies:"'
                sh 'df -h'


                sh 'npm install'
                dir('frontend') {
                    sh 'npm install'
                }
                echo 'Testing code...'
                // sh 'npx jest --verbose --runInBand'
                // Read the test output and send it by email
                script {
                    // Exécuter les tests et récupérer le résultat
                    def testResults = sh(script: 'npx jest --verbose --runInBand 2>&1', returnStdout: true).trim()
                    // Afficher les résultats dans la console Jenkins
                    echo "${testResults}"
                    // Envoyer l'email avec les captures d'écran en pièce jointe
                    emailext subject: "Jenkins Test Report - Build ${env.BUILD_NUMBER}",
                        body: """
                        Hello,

                        The tests for build ${env.BUILD_NUMBER} have completed.

                        Here are the test results: 

                        ${testResults}

                        Regards,
                        YAMANI dev Department
                        """,
                        to: 'YY.OM.thetiptop@gmail.com',
                        attachmentsPattern: "**/login-page-before.png, **/login-page-after.png"
                }
            }
        }
        
        stage('Building images') {
            steps{
                script {
                    backendImage = docker.build(registryBackend + ":$BUILD_NUMBER")
                }
                script {
                    dir('frontend') {
                        frontendImage = docker.build(registryFrontend + ":$BUILD_NUMBER")
                    }
                }
                script {
                    databaseImage = docker.build(registryDatabase + ":$BUILD_NUMBER")
                }
                script {
                    sh "docker tag ${registryDatabase}:$BUILD_NUMBER ${registryDatabaseTagged}:$BUILD_NUMBER"
                    sh "docker tag ${registryDatabase}:$BUILD_NUMBER ${registryDatabaseTagged}:latest"
                    databaseImage = docker.image("${registryDatabaseTagged}:$BUILD_NUMBER")
                }
            }
        }
        

        stage('Push images') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        backendImage.push()
                        backendImage.push('latest')
                    }
                }
                script {
                    docker.withRegistry( '', registryCredential ) {
                        frontendImage.push()
                        frontendImage.push('latest')
                    }
                }

                script {
                    docker.withRegistry( '', registryCredential ) {
                        databaseImage.push()
                        databaseImage.push('latest')
                    }
                }
                script {
                    echo 'Backing up MongoDB...'
                    sh '''
                    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
                    BACKUP_FILE="/tmp/mongodb_backup_$TIMESTAMP.gz"
                    docker exec db-docker mongodump --archive=/tmp/mongodb_backup_$(date +%Y%m%d_%H%M%S).gz --gzip --username admin --password 'YthetiptopO123.' --authenticationDatabase admin
                    docker cp db-docker:$BACKUP_FILE .
                    '''
                    
                    // Send backup via email (optional)
                    emailext subject: "MongoDB Backup - ${env.BUILD_NUMBER}",
                        body: """
                        Hello,

                        A backup of the MongoDB database has been created for build ${env.BUILD_NUMBER}.


                        Regards,
                        YAMANI Dev Department
                        """,
                        to: 'YY.OM.thetiptop@gmail.com',
                        attachmentsPattern: "mongodb_backup_*.gz"

                    // Delete the backup file after sending it
                    sh 'rm -f mongodb_backup_*.gz'
                }
            }
        }
        
        stage('Test images') {
            steps {
                echo 'testing backend image...'
                sh 'docker inspect --type=image ' + registryBackend + ':latest'
                echo 'testing frontend image...'
                sh 'docker inspect --type=image ' + registryFrontend + ':latest'
            }
        }


        stage('Deploy'){
            steps{
                echo 'Deploying backend'
                script {
                    sh 'docker stop pfe-backend || true && docker rm pfe-backend || true'
                    docker.image(registryBackend + ':latest').run('--name pfe-backend -e DATABASE=' + DB_URL +  ' --network my_network -p 5001:5001')
                }
                echo 'Deploying frontend'
                script {
                    sh 'docker stop pfe-frontend || true && docker rm pfe-frontend || true'
                    docker.image(registryFrontend + ':latest').run('--name pfe-frontend --network my_network -p 3000:3000')
                }
            }
        }
        

        stage('Run reverse proxy'){
            steps {
                script {
                    // sh 'docker stop reverse-proxy || true && docker rm reverse-proxy || true'
                    // docker.image(reverseProxy + ':latest').run('--name reverse-proxy --network my_network -p 80:80 -v /root/nginx.conf:/etc/nginx/nginx.conf')
                    sh 'docker restart reverse-proxy' 
                }
            echo 'reverse proxy is working'
            }
        }
    }
}
