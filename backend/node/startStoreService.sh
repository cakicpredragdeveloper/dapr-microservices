if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

cd EmployeeStoreService && npm i && dapr run --app-id employeestoreservice --app-port $STORE_SERVICE_HTTP_PORT --dapr-http-port $DAPR_DATABASE_PORT --components-path ../../../dapr/components -- npm start