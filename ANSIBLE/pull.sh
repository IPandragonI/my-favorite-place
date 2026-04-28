for node in ansible-manager-1 ansible-node-1 ansible-node-2 ansible-node-3; do
  for image in redis:alpine postgres:15-alpine dockersamples/examplevotingapp_vote dockersamples/examplevotingapp_result dockersamples/examplevotingapp_worker; do
    echo "Pulling $image on $node..."
    docker exec $node docker pull $image
  done
done