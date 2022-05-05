# API DOCUMENTATION.
Live URL: https://simple-api-auth.herokuapp.com/

## AUTH
----
account creation and login.

**SIGN UP**

* **URL**

  /auth/signup
  ----
  returns json reponse about a user to be created.

* **Method:**

  `POST`

* **Data Params**

  `username=[string]`
  `email=[string]`
  `password=[string]`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
      ```{
          "message": "New user created",
          "data": {
            "username": "Teniola",
            "email": "teniolafatunmbi@gmail.com",
            "password": "teni123",
            "_id": "6272d5386f59508a9b309a14",
            "__v": 0,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlbmlvbGEiLCJfaWQiOiI2MjcyZDUzODZmNTk1MDhhOWIzMDlhMTQiLCJpYXQiOjE2NTE2OTI4NTYsImV4cCI6MTY1MTcwMzY1Nn0.a_1RuJgm9lHofQlEo_uyRP7mlcfsZP0B_NMGUNhmX1c"
          }
        }
      ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
      ```
        {
        "statusCode": 400,
        "message": "User with this email already exist",
        "error": "Bad Request"
        }
      ```

**LOG IN**

* **URL**

  /auth/login
  ----
  returns json response a login operation.
* **Method:**

  `POST`

* **Data Params**

  `username=[string]`
  `password=[string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        "data": {
          "message": "login successful",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlbmlvbGEiLCJzdWIiOiI2MjcyZDUzODZmNTk1MDhhOWIzMDlhMTQiLCJpYXQiOjE2NTE2OTMyODcsImV4cCI6MTY1MTcwNDA4N30.Xurd8LqNd_vU1pWgFKbNeHAtEQvI8tIY5161GYYfbYA"
        }
      }
      ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
      ```
          {
          "statusCode": 401,
          "message": "Unauthorized"
          }
      ```


## ITEMS
----
endpoints for items in the database

> Note: Authorization token for request is in the Bearer <token> format

**FETCH ITEMS**

* **URL**

  /items
  ----
  Returns an array of items.

* **Method:**

  `GET`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
      ```[
            {
              "_id": "6272d2ff6f59508a9b309a0e",
              "name": "Teniola",
              "qty": 1,
              "description": "teniolafatunmbi@gmail.com",
              "__v": 0
            }
          ]
      ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
      ```
        {
        "statusCode": 500,
        "error": "Internal server error"
        }
      ```
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** 
    ```
        {
        "statusCode": 401,
        "message": "Unauthorized"
        }
    ```

**CREATE ITEM**

* **URL**

  /items
  ----
  returns json response of a created item.

* **Method:**

  `POST`

* **Data Params**

  `name=[string]`
  `description=[string]`
  `qty=[string]`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```{
        "name": "Item 1",
        "qty": 20,
        "description": "Item #1",
        "_id": "6272d8ab808f302f739f8043",
        "__v": 0
      }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** ```
              {
              "statusCode": 401,
              "message": "Unauthorized"
            }
            ```
  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```{
            "statusCode": 400,
            "message": [
              "name must be a string",
              "description must be a string",
              "qty must be a number conforming to the specified constraints"
            ],
            "error": "Bad Request"
          }
    ```
