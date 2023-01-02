fclean: clean
	@ sudo rm -rf ./volumes
	@ mkdir -pv ./volumes/api

clean:
	@ docker rmi zocialize-api:donado

re: changes-from-volumes down fclean up

up:
	@ mkdir -pv ./volumes/api
	@ docker-compose up --build

down:
	@ docker-compose down --volumes

changes-from-volumes:
	@ rm -rf ./api/nestjs
	@ cp -r ./volumes/api ./api/nestjs
