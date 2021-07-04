# Maniera-be-pjt-51

A cross-platform application that connects fashion designers and clients.

The app is deployed [here](https://maniera-dev.herokuapp.com/) on heroku
[Heroku deployment link](https://maniera-dev.herokuapp.com/)

> URL = `http://localhost:8888`

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
<h2>Add item to cart</h2>

 
 Endpoint:  ```https://maniera-dev.herokuapp.com/api/auth/add-to-cart```
 
 Method: ```POST```
 
 URL Params: None
```sh
Data Params: {
    
  productId: "60d8890484d6151e84910250",
  quantity: 20

}
```
> Success Response
   200 status code
```sh
{
    "type": "success",
    "mgs": "Process Successful",
    "data": {
        "subTotal": 100,
        "_id": "60d88b8d1d41680388fb15dc",
        "items": [
            {
                "_id": "60dcb0a0b9e8d135aced7b43",
                "productName": "Shirt",
                "image": "cloudinarylink",
                "productId": "60dc7ca9ad47952f08b956fd",
                "quantity": 10,
                "price": 10,
                "total": 100,
                "createdAt": "2021-06-30T17:57:52.802Z",
                "updatedAt": "2021-06-30T17:57:52.802Z"
            }
        ],
        "createdAt": "2021-06-27T14:30:37.091Z",
        "updatedAt": "2021-06-30T17:57:52.803Z",
        "__v": 14
    }
}
```
> Error Response
     400 Status code
```
{
type: "Invalid",
msg: "Something Went Wrong",
}
```
    
> 500 Status code
```
{
 type: "Not Found",
 msg: "Invalid request",
}
```

<h2>Remove an item from cart</h2>
 
 Endpoint:  ```https://maniera-dev.herokuapp.com/api/auth/removesingleproduct```
 
 Method: POST
 
 URL Params: None
```
Data Params: {
  "productId": "60dc7c48ad47952f08b956fb"
}
```
> Success Response
   200 status code
```
{
    "type": "Success",
    "mgs": "product removed",
    "data": {
        "subTotal": 1000,
        "_id": "60d88b8d1d41680388fb15dc",
        "items": [
            {Remaining objects in cart}
        ],
        "createdAt": "2021-06-27T14:30:37.091Z",
        "updatedAt": "2021-06-28T13:44:24.805Z",
        "__v": 9
    }
}
```
> Error Response
     400 Status code
```{
type: "Invalid",
msg: "Bad Request",
}
```
> 500 Status code

``` {
 type: "Not Found",
 msg: "Internal server error",
}
```
<h2>Empty Cart</h2>
 
 Endpoint:  ```https://maniera-dev.herokuapp.com/api/auth/empty-cart```
 
 Method: DELETE
 
 URL Params: None
```
Data Params: {
  None
}
```
> Success Response
   200 status code
```
{
    "type": "Success",
    "mgs": "Cart has been emptied",
    "data": {
        "subTotal": 0,
        "_id": "60d88b8d1d41680388fb15dc",
        "items": [],
        "createdAt": "2021-06-27T14:30:37.091Z",
        "updatedAt": "2021-06-30T17:48:18.495Z",
        "__v": 13
    }
}
```
> Error Response
     400 Status code
```{
type: "Invalid",
msg: "Something went wrong",
}
```
> 500 Status code

``` {
 type: "Not Found",
 msg: "Internal server error",
}
```

## API Reference

## Feedback

If you have any feedback, please reach out.

## License

[MIT](https://choosealicense.com/licenses/mit/)
