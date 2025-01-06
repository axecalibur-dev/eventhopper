echo " >> ✅  Starting with Docker Compose..."
docker-compose -f ../docker-compose.prod.yml up -d --build
cd ..
mkdir src/helllo
docker exec -it server sh -c "npx sequelize-cli db:migrate && apk update && apk add --no-cache nano htop && npm install -g pm2 && pm2 list"
echo " >> ✅  Installed htop/pm2 and nano. Executed migrations ( check logs )."
curl -X PUT "http://localhost:9200/events" -H "Content-Type: application/json" -d '{}'
docker logs server -f