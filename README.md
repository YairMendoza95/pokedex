<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Amibientación en desarrollo

1. Clonar el proyecto
2. Ejecutar

```
npm install
```

3. Tener instalado Nest.js CLI

```
npm i -g @nestjs/cli
```

4. Levantar la BD

```
docker-compose up -d
```

5. Clonar el archivo `.env.template` y renombrar la compia a `.env`

```
http://localhost:3000/api/v2/seed
```

6. Llenar las variables de entorno definidas en el `.env`

7. Para pruebas en desarrollo, ejecutar el siguiente endpoint para reconstruir la BD

```
http://localhost:3000/api/v2/seed
```

## Stack

- Nest.js
- MongoDB
