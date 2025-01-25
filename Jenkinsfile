pipeline {
    agent {
        label 'dockeragent'
    }
    
    environment {
        registryBackend = "ief2iyyom/pfe_backend"
        registryFrontend = "ief2iyyom/pfe_frontend"
        reverseProxy = "nginx"
        registryCredential = 'dockerhub_pat'
        backendImage = ''
        frontendImage = ''
        DB_URL = "mongodb://db-docker:27017/PFE"
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
                // how to integrate this line of code : df -h , du -sh /home/jenkins/.npm/_cacache/tmp
                sh 'df -h && du -sh /home/jenkins/.npm/_cacache/tmp


                sh 'npm install'
                dir('frontend') {
                    sh 'npm install'
                }
                // shutdown backend server before running tests
                //  sh 'docker start pfe-backend'
                echo 'Testing code...'
                sh 'npx jest --verbose'
                // startup backend
                // sh 'docker start pfe-backend'
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
                    sh 'docker stop reverse-proxy || true && docker rm reverse-proxy || true'
                    docker.image(reverseProxy + ':latest').run('--name reverse-proxy --network my_network -p 80:80 -v /root/reverse_proxy.conf:/etc/nginx/conf.d/default.conf')
                }
            }
        }
    }
}