# Movies DB Backend



![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![image](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)



[English version](#English-version)<br>

## 0. Indice:


  [1. Introduccion:](#1-introducción)<br>
  [2. Descripción del proyecto.](#2-como-usar)<br>
  [3. Como Usar:](#3-descripción-del-proyecto)<br>
  [4. Futuras Funcionalidades:](#4-Futuras-Funcionalidades)<br>
  [5. Herramientas Utilizadas:](#5herramientas-utilizadas)<br>


## 1. Introducción.

- Proyecto desarrollado para GeeksHubs Academy, en este simulamos un "e-commerce" que se dedica al alquiler de peliculas, la cual dispondra de una API RestFul para el manejo del CRUD en los Endpoints detallados mas abajo y una Base de Datos propia para el almacenamiento de pedidos, a la vez que listados de peliculas y usuarios (los cuales podran registrarse y realizar login). 
- BackEnd Deployed [HEROKU](https://movie-db-geekshubs.herokuapp.com)<br>
- Aqui una imagen del diseño de la Base de datos:
  
![image](screenshot/db.png)


## 2. Descripción del proyecto.

- En este proyecto se ha creado un BackEnd completo y funcional para la simulacion de un "e-commerce", que continuacion se describiran las partes que compone este BackEnd :
  

- API Restful para el manejo del CRUD de los EndPoints (descritos mas abajo), consta de 3 diferentes "views" que en las que podemos encontrar Pedidos, Peliculas y Usuarios, al estar modularizado de esta manera conseguimos una mejor limpiza en el codigo y una mayor escalabilidad.
  
- BBDD Relacional en MySql, la cual nos permite una gestion muy potente y robusta frente a las no Relacionales como MongoDB y tambien gracias a MySql las consultas en PEDIDOS estan en RAW SQL implementado para practicar su uso en el proceso de aprendizaje con este proyecto.
  

## 3. Como Usar.

- Este proyecto esta deployado en HEROKU por lo cual para probarlo solo tendras que tener una heramienta llamada POSTMAN la cual te permite probar el CRUD en los endpoints.
  <br>

- Una vez abierto el postman simplemente tienes que introducir esta URL :
    https://movie-db-geekshubs.herokuapp.com/ 
    
A continuacion se describen las posibilidades que tienes:
### EndPoints de /peliculas:


- Leer todos las Peliculas de nuestra propia DB:
  
  ```bash
  router.get('/', auth, PeliculasController.traePeliculas);
  ```
  
- Registro Peliculas En la propia DB:

  ```bash
  router.post('/', auth, PeliculasController.registraPelicula);
  ```

- Borrar Pelicula DB propia:
    ```bash
    router.delete('/', auth, isAdmin, PeliculasController.borrarPelicula);
    ```
- Busca peliculas por Genero En propia DB:
    ```bash
    router.get('/genero', auth, PeliculasController.buscaGenero);
    ```
- Busca peliculas por Adult En propia DB:
  
    ```bash
    router.get('/adult', auth, PeliculasController.buscaAdult);
    ```

- Buscar Peliculas por Genero y Titulo en propia DB: 

    ```bash
    router.get('/genero_titulo', auth, PeliculasController.buscaGenTit);
    ```

EndPoints Varios a la API de MovieDB:

- Busqueda de peliculas por titulo: 

    ```bash
    router.get('/titulo', auth, PeliculasController.peliculasTitulo)
    ```

- Busqueda de novedades: 

    ```bash
    router.get('/novedades', auth, PeliculasController.traeNovedades)
    ```






## 4. Futuras funcionalidades.

- Mas adelante me gustaria pulir los Campos de las tablas añadiendo o modificando algunos para aumentar la cantidad de Endpoints, añadiendo mas vistas y mas funcionalidades.
- Como extra me gustaria tambien poder añadir un FrontEnd con React



## 5. Herramientas Utilizadas.

- MySQL Workbench
- Visual Studio Code
- Postman
- Heroku

<br>

## English version


### 404 - NOT FOUND.
WORK IN PROGRESS...<br>

[Subir](#top)
