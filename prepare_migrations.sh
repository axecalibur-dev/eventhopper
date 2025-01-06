echo "Database Migration Script"

if [ ! "$1" ]; then
  echo "Migration Name not provided."
  exit 1
fi

# docker exec into server

npx sequelize-cli migration:generate --name "$1"
sh cjsConversionScript.sh
