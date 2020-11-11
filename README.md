# Covid-19 Map

## Run
Create a creds.env file with `MYSQL_ROOT_PASSWORD=password` to initialize MariaDB with a password

Make an empty `config/` directory

Run `docker-compose up`. 

Copy schema.sql and latLng.sql into the mariadb container
`mysql -u root -p < schema.sql`
`mysql -u root -p < latLng.sql`

Site will be available on `localhost:3000`