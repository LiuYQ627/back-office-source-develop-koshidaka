Param(
  [parameter(mandatory=$true)][String]$INFRA_ENV,
  [parameter(mandatory=$false)][String]$AWS_PROFILE = "default"
) 

# S3 bucket table
$S3Env = @{
  "isb-dev" = "retailgear-std-v2-isb-dev-wso2-webclient-0og"
#  "prd" = "retailgear-std-prd-wso2-public-webclient-yyp"
#  "stg" = "retailgear-std-stg-wso2-public-webclient-ycy"
}

if( $S3Env.ContainsKey($INFRA_ENV) -eq $false ){
  Write-Output "env name `"$INFRA_ENV`" is not defined."
  Exit
}

# S3 bucket name
$BucketName=$S3Env[$INFRA_ENV]

# sync dist files to s3
aws --profile $AWS_PROFILE s3 sync $PSScriptRoot/dist/ s3://${BucketName}/ --delete
