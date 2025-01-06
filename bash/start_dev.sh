echo " >> ✅  Starting with Docker Compose..."
docker compose -f ../docker-compose.dev.yml up -d --build
echo " >> 📌  Using Alpine Linux Installation..."
echo " >> ✅  Now installing nano/nodemon in server container."
docker exec -it server sh -c "npx sequelize-cli db:migrate && apk update && apk add --no-cache nano && npm install -g nodemon"
echo " >> ✅  Installed nodemon and nano. Executed migrations ( check logs )."
curl -X PUT "http://localhost:9200/events" -H "Content-Type: application/json" -d '{}'
docker logs server -f

