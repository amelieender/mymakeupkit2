# My Makeup Kit 

<p>My Makeup Kit is a website, that supports all makeup enthusiasts to organize their makeupkit.</p> 
<p>It will help to get an overview of every single item of the makeup collection and when each of it expires!</p> 

###### It includes the following functions 
* Register and Login
* Add an item to the collection
* Update the information of an item
* Delete a makeup item 
* Search for items

## To run this application locally

### Setup DB
You need a config file (backend/config/db.config.js) with the following information
```
module.exports = {
    HOST: "localhost"
    USER: "youruser"
    PASSWORD: "yourpassword"
    DB: "makeup"
};
```
and a file (backend/config/jwt-secret.js) that includes the webtoken signing secret
```
module.exports = 'yoursecret';
```


### Installation
To run this project, install it locally using npm

```
  $ cd backend
  $ npm install
  $ npm start
  
  $ cd mymakeupkit
  $ npm install
  $ng serve
```

## Technologies
This project is created with:
* Angular 11.0.9
* php MyAdmin 4.9.5deb2

