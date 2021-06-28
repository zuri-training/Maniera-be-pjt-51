# Maniera-be-pjt-51

A cross-platform application that connects fashion designers and clients.

The app is deployed [here](https://maniera-dev.herokuapp.com/) on heroku
[Heroku deployment link](https://maniera-dev.herokuapp.com/)
> URL = ```http://localhost:8888```

## Run Locally

Fork and clone the project

```bash
  git clone project url
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

Launch Postman

```Postman
  Use the API reference below to test the various endpoints in Postman: 
 ```
 <p>FORGET PASSWORD [REQUEST TYPE : PUT]</p>
 
```PUT``` ```{{ URL }}``` ```/api/auth/forgot-password```
> If you are using postman set to raw and ```Content-Type: application/json```
> Sample Request Body
```sh
{
       
        "email": "sample@email.com"
}
```
> Sample Response
```sh
{
    "message": "Email has been sent, kindly follow the instructions"
}
```
<p>RESET PASSWORD [REQUEST TYPE : PUT]</p>
 
```PUT``` ```{{ URL }}``` ```/api/auth/reset-Password```
> Sample Request Body
```sh
{
       
        "newPass": "newPassword",
        "resetLink": "linkinemail"
}
```
> Sample Response
```sh
{
     "message": "Your password has been changed"
}
```
```


## API Reference

## Feedback

If you have any feedback, please reach out.

## License

[MIT](https://choosealicense.com/licenses/mit/)
