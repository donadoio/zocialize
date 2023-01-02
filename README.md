# Zocialize App (Project In Progress)
A social app for mobile (initially only Android) that's sort of a hybrid between facebook and twitter built using React Native for the front-end, NestJS for the backend and a PostgreSQL database.

#### Instructions to build project: 

1. First create & setup a `.env` file in root directory with the following values:

```.env
DATABASE_URL="postgresql://user123:pass123@zocialize-db:5432/zocializedb?schema=public"
SECRET=[A random secret]
REFRESH_TOKEN_SECRET=[A random secret] 
ACCESS_TOKEN_SECRET=[A random secret]
CLIENT_REFRESH_TOKEN_SECRET=[A random secret]
CLIENT_ACCESS_TOKEN_SECRET=[A random secret]
BACKEND_URL=[Backend URL]

POSTGRES_USER=[Username for DB]
POSTGRES_PASSWORD=[Password for DB]
POSTGRES_DB=[Name for DB]
```

2. Edit the docker-compose.yml file and replace the volume directory in the `volumes` section of the file.

```yml
volumes:
  zocialize_api:
    name: zocialize_api_volume
    driver_opts:
      type: 'none'
      o: 'bind'
      device: [INSERT VOLUME FOLDER LOCATION HERE]
```

3. Open the Makefile in the /app/ directory (NOT THE ONE IN ROOT DIRECTORY) and edit the values for the Android Debug Bridge (ADB_DIR) and the Device ID, (Run `adb devices` to check)

4. Open up a terminal window

```bash
make up
```

5. Open Android Studio and a second terminal window

```bash
cd app
make adb && make start
```

6. Run the App in Android Studio
