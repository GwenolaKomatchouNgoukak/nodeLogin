pipeline {
    agent any
    // {
    //     docker { image 'node:14' }
    // }
    // set up environment
    environment {
        HOME = '.'
        AWS_ACCOUNT_ID = '767397795869'
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY = 'node-login-app'
        ECS_CLUSTER = 'nodelogin_cluster'
        ECS_SERVICE = 'nodeloginservice'
        DOCKER_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest"

    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
            }
        }
        // install application stage
        stage('Install_APP') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t node-login-app .'
                // script {
                //     docker.build("${ECR_REPOSITORY}")
                // }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
            }
        }

        stage('Push Docker Image to ECR') {
            steps {
                sh "docker tag ${ECR_REPOSITORY}:latest 767397795869.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest"
                sh "docker push 767397795869.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest"
                // script {
                //     docker.image("${ECR_REPOSITORY}").push("latest")
                // }
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh """
                    aws ecs update-service \
                        --cluster ${ECS_CLUSTER} \
                        --service ${ECS_SERVICE} \
                        --force-new-deployment \
                        --region ${AWS_REGION}
                """
            }
        }

         // Package application stage : create the tgz file 
        stage('Pack_APP') {
            steps {
                sh 'npm pack'
            }
        }

        // Push package to Artifactory
        stage('Push_APP_To_Artifactory') {
            steps {
                sh 'echo push stage'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}