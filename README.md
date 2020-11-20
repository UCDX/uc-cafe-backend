# UC café Backend

## Dependencias del sistema operativo

* MaríaDB 10.x o superior.

## Intalación

Antes de empezar, colocar lo siguiente en el archivo `etc/.env` y llenar los
datos correspondientes.

```
MARIADB_USER=
MARIADB_PASS=
MARIADB_HOST=localhost
MARIADB_DATABASE=uccafe_dihm
IANA_TIMEZONE=America/Cancun
MARIADB_PORT=3306
PORT=3000
```

Correr el script de creación de la base de datos que se encuentra en `src/scripts/db.sql`.

Para instalar las dependencias, ejecutar: `npm ci`.

Para arrancar el servidor en modo desarrollo, usar `npm run dev`.

Para arrancar el servidor en modo de producción, usar `npm start`.

## Script de instalación (POSIX)

En el directorio raíz del projecto, ejecutar:

```bash
cat src/scripts/db.sql | mariadb -u [tu_usuario] -p
npm ci
npm run dev #Arranca el servidor en modo desarrollo.
```
