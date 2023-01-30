if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

cd EmployeeInfoService && npm i && dapr run --app-id ${INFO_IMAGE_TAG} --app-port $INFO_SERVICE_HTTP_PORT --dapr-http-port $DAPR_INFO_PORT --components-path ../../../dapr/components -- npm start