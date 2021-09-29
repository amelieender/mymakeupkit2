# My Makeup Kit 2.0

<p>My Makeup Kit is a Progressive Web App, that supports all makeup enthusiasts to organize their makeupkit.</p> 
<p>It will help to get an overview of every single item of the makeup collection and when each of it expires!</p> 

###### It includes the following functions 
* Add an item to the collection
* Add a photo and a location to your item
* Update the information of an item
* Delete a makeup item 
* Search for items
* Offline and background synchronization with service worker
* Push Notifications when a new item is added
* Install the app

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
a file (backend/config/jwt-secret.js) that includes the webtoken signing secret
```
module.exports = 'yoursecret';
```
and a file (backend/config/push-notifications.js) that includes the push signing secret (obtained with `npm run web-push generate-vapid-keys`)

```
module.exports = {
    privateVapidKey: 'privatekey',
    publicVapidKey: 'publickey'
};
```


### Installation
To run this project, install it locally using npm

```
  $ cd backend
  $ npm install
  $ npm start
  
  $ cd mymakeupkit
  $ npm install
  $ ng build --prod
  $ http-server -p 8080 -c-1 dist/mymakeupkit
```

## Technologies
This project is created with:
* Angular 11.0.9
* php MyAdmin 4.9.5deb2
* express 4

