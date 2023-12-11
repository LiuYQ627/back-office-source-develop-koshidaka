Param(
  [parameter(mandatory=$true)][String]$VERSION
) 

# Dockerfile��
$DOCKERFILE = "Dockerfile"
# AWS���|�W�g��
$AWS_REPO = "874935652146.dkr.ecr.ap-northeast-1.amazonaws.com"
# AWS-CLI�v���t�@�C����
$AWS_CLI_PROFILE = "retailgear-ci"
# �R���e�i��
$CONTAINER_NAME = "tec/retail-gear/pre-maintenance"
# �R���e�i�^�O��`
$TAG = "${AWS_REPO}/${CONTAINER_NAME}:${VERSION}"

# �r���h
Set-Location ${PSScriptRoot}
docker build . `
  -t ${TAG} `
  -f ${DOCKERFILE} `

# AWS���O�C��
aws ecr get-login-password --region ap-northeast-1 --profile ${AWS_CLI_PROFILE} | docker login --username AWS --password-stdin ${AWS_REPO}

# �R���e�i��push����
docker push ${TAG}
