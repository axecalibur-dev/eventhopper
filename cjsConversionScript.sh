
MIGRATIONS_DIR="src/migrations"

# Check if the migrations directory exists
if [ ! -d "$MIGRATIONS_DIR" ]; then
    echo "Migrations directory not found: $MIGRATIONS_DIR"
    exit 1
fi

for file in "$MIGRATIONS_DIR"/*.js; do
    # Check if the file exists
    if [ -e "$file" ]; then
        # Check if the file is not already a .cjs file
        if [[ "$file" != *.cjs ]]; then
            # Rename the file to .cjs
            mv "$file" "${file%.js}.cjs"
            echo "Renamed: $(basename "$file") to $(basename "${file%.js}.cjs")"
        else
            echo "Skipping: $(basename "$file") (already a .cjs file)"
        fi
    fi
done

echo "Renaming completed."
