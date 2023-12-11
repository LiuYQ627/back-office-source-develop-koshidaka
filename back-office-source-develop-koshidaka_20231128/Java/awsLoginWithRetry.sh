max_retry_count=$DOCKER_PUSH_RETRY # リトライ回数
retry_interval=10 # リトライ間隔（秒）
retry_count=0

# Log the environment variables to debug
echo "AWS_DEFAULT_REGION is ap-northeast-1"
echo "ECR_REPOSITORY is $PUBLISH_REGISTORY"

# Log aws command
echo "Login to the ECR repository - "
echo "aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin $PUBLISH_REGISTORY"

# Login to the ECR
while true; do
  # Loginコマンド実行
  (aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin $PUBLISH_REGISTORY) && break
  # リトライ回数が上限に達している場合は、エラーメッセージを出力してリトライ終了
  retry_count=$((retry_count + 1))
  if [ $retry_count -eq $max_retry_count ]; then
    echo "Error: command failed after $max_retry_count attempts"
    exit 1
  fi
  # 待機
  echo "Retry command failed ($retry_count). Retrying in $retry_interval seconds..."
  sleep $retry_interval
done
