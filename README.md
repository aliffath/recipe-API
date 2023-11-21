# Food Recipe

<div align="center">
<a href="https://github.com/aliffath/recipe-API">
    <img src="https://i.ibb.co/ZcsX3g3/fix.png" alt="Logo" width="150" height="150">
</a>

**Discover Recipe & Delicious Food.**

</div>

## About The Project

This backend project aims to provide an API that enables CRUD (Create, Read, Update, Delete) operations on user entities (users) and products (products). This API can be used to manage user and product data in the system.

## Table of Contents

- [Requirement](#requirement)
- [Built With](#built-with)
- [Installation](#installation)
- [How use](#how-use)
- [Related Project](#related-project)
- [Contact](#contact)

## Requirement

Before you install this project on your local computer. You need:

- **NodeJS**, I'm using **v18.16.0** when this docs is uploaded. You can download NodeJS in https://nodejs.org/en/download
- **PostgreSQL**, I'm using **v15.3** when this docs is uploaded. You can download PostgreSQL in https://www.postgresql.org/download
- **Postman**, I'm using **v10.18.8** when this docs is uploaded. You can download Postman in https://www.postman.com/downloads

## Built with

- [**argon2 0.31.2**](https://www.npmjs.com/package/argon2)
- [**body-parser 1.20.2**](https://www.npmjs.com/package/body-parser)
- [**cloudinary 1.40.0**](https://www.npmjs.com/package/cloudinary)
- [**cors 2.8.5**](https://www.npmjs.com/package/cors)
- [**dotenv 16.3.1**](https://www.npmjs.com/package/dotenv)
- [**express 4.18.2**](https://www.npmjs.com/package/express)
- [**helmet 7.0.0**](https://www.npmjs.com/package/helmet)
- [**jsonwebtoken 9.0.1**](https://www.npmjs.com/package/jsonwebtoken)
- [**morgan 1.10.0**](https://www.npmjs.com/package/morgan)
- [**multer 1.4.5-lts.1**](https://www.npmjs.com/package/multer)
- [**pg 8.11.3**](https://www.npmjs.com/package/pg)
- [**xss-clean 0.1.4**](https://www.npmjs.com/package/xss-clean)

## Installation

Open your default terminal like CMD or Git Bash. Then clone this project, in your folder destination, type on your terminal like below:

```
git clone https://github.com/aliffath/recipe-API
```

After installation is done, on your terminal type:

```
cd recipeAPI
```

You need install package dependencies, to make this project work properly, in your terminal type:

```
npm install
```

Open folder **recipeAPI**, if you have Visual Studio Code installed on you computer, you can type on terminal:

```
code .
```

or open it manually, with search in directories libraries windows explorer

Theres two important file for guide the set up database and env, you will found file named **database.sql** and **.example.env**, open your PostgreSQL then set up like query in database.sql. For .example.env set up you can follow this next tutorial below

You need to put file name **.env** in folder **recipeAPI**, the **.env** should include this:

```
DB_HOST =
DB_USER =
DB_NAME =
DB_PASSWORD =
DB_PORT =
JWT_SECRET =
CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

After all above is done, you can run this project with type on terminal:

```
node index.js
```

## How Use

Open Postman, go to workspace then import postman collection on folder recipeApiV2, name is **recipeAPI.postman_collection**

## Related Project

You can visit my github where I'm using this API for the server:

:rocket: [`Recipe Web App`](https://github.com/aliffath/Food-Recipe-Web-App)

:rocket: [`Recipe Mobile App`](https://github.com/aliffath/Recipe-MobileApp)

## Contact

- Email : [`alifmiftakhulfatah@gmail.com`](mailto:alifmiftakhulfatah@gmail.com)

- LinkedIn : [`/in/alif-miftakhul-fatah/`](https://www.linkedin.com/in/alif-miftakhul-fatah/)

- GitHub : [`aliffath`](https://github.com/aliffath)
