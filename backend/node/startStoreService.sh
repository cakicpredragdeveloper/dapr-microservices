if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

cd EmployeeStoreService && npm i && dapr run --app-id ${STORE_IMAGE_TAG} --app-port $STORE_SERVICE_HTTP_PORT --dapr-http-port $DAPR_PORT --components-path ../../../dapr/components -- npm start