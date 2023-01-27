# Dapr Microservices Demo Project

## Running the project

<!-- FOR REACT AND NODE SERVICES  -->

### 1. Docker container initialize

Start the database docker container

```sh
cd backend/node
docker-compose up --build -d
```

### 2. Start Employee Store Service

Run the bash script to start the service.

If ran from the same terminal instance as the one in step 1:

```sh
bash ./startStoreService.sh
```

If ran from the new terminal instance:

```sh
bash ./backend/node/startStoreService.sh
```

### 3. Start Employee Info Service

Run the bash script to start the service.

If ran from the same terminal instance as the one in step 1:

```sh
bash ./startInfoService.sh
```

If ran from the new terminal instance:

```sh
bash ./backend/node/startInfoService.sh
```

## 4. Run Dashboard

```sh
cd ./frontend
npm i --legacy-peer-deps
npm start
```
