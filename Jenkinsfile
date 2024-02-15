pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage("Clear Docker Containers") {
            agent{
                label 'test'
            }
            steps {
                script {
                    def runningContainers = sh(script: 'docker ps -q | wc -l', returnStdout: true).trim().toInteger()
                    
                    if (runningContainers > 0) {
                        sh 'docker stop $(docker ps -a -q)'
                    } else {
                        echo "Nothing exist. Running container count: $runningContainers"
                    }
                }
            }
        }

        stage("Install Environment") {
            agent {
                label 'test'
            }
            steps {
                echo 'Installing Environment'
                sh 'npm install'
            }
        }

        stage("Unit Test") {
            agent {
                label 'test'
            }
            steps {
                echo 'Run Unit Test'
                sh 'npm run test'
            }
        }

        stage("Docker Compose API UP"){
            agent {
                label 'test'
            }
            steps {
                echo 'Compose API UP'
                sh 'pwd && ls -al'
                sh 'docker-compose -f ./compose.dev.yaml up -d --build'
                sh 'docker-compose ps'
                sh 'docker ps'
            }
        }

        stage("Run Robot") {
            agent {
                label 'test'
            }
            steps {
                echo 'Clone Robot'
                dir('./robot/') {
                    git branch: 'main', url: 'https://github.com/softdev-lab/jenkins-robot.git'
                }
                echo 'Run Robot'
                sh 'cd ./robot && python3 -m robot ./jenkins-test.robot'
            }
        }

        stage("Build & Push to Registry") {
            agent {
                label 'test'
            }
            steps {
                echo 'Build & Push'
                withCredentials([
                    usernamePassword(usernameVariable: 'DEPLOY_USER', passwordVariable: 'DEPLOY_TOKEN')
                ]) {
                    sh "docker login registry.gitlab.com -u ${DEPLOY_USER} -p ${DEPLOY_TOKEN}"
                }
                sh "docker build -t registry.gitlab.com/xsectorz/jenkins-test ."
                sh "docker push registry.gitlab.com/xsectorz/jenkins-test"
                echo 'Build & Push Success!'
            }
        }

        stage("Clean") {
            agent {
                label 'test'
            }
            steps {
                echo 'Cleaning'
                sh 'docker-compose -f ./compose.dev.yaml down'
                sh 'docker system prune -a -f'
            }
        }

        stage("Deploy in Pre-Prod") {
            agent {
                label 'preprod'
            }
            steps {
                echo 'Run on Pre-Prod'
                sh 'docker-compose up -d --build'
            }
        }
    }
}