# TodoList

## Deliverables/ Assumptions:
- Run on local Node.JS / Python server for the following APIs. 
- NO frontend development is required. 
- Please include all dependencies and instruction on how to run your code in README.
- You can choose what methods to use for each API and their respective request and response formats.
- All TODO Items are stored in Google Firebase or Firestore (it’s free to use).
- NO Authentication is required.

- Optional: 
    - Share your API collection using Postman Collection URL
        - https://www.getpostman.com/collections/5906c2bd4f8c524d8bd0

    - Unit testing


# Dependencies

- Some package depends on Node.js
    - axios
    - body-parser
    - express

- Unit testing depends on Jasmine


# instruction
    
1. Install Node.js ( preferably, version > 8.x )
    - https://nodejs.org/en/

2. Install Jasmine using npm:     
    ```bash
    npm install -g jasmine
    ```

3. Clone this repo and navigate into it: 
    ```bash
    git clone git@github.com:LucasNG521/TodoList.git
    cd TodoList
    ```
4. Install required package:
    ```bash
    npm install
    ```
    If you display the package.json file (cat package.json), the dependencies section of your package.json will include axios, body-parser , express.

    ```json
    {
        "name": "todo_list",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
            "axios": "^0.18.0",
            "body-parser": "^1.18.3",
            "express": "^4.16.3"
        }
    }
    ```
5. You can start the server by calling node with the script in your command prompt:

    ```bash
    node index.js
    
    server running at http://localhost:8080
    ```
6. Running tests
    ```sh
    # Testing TodoRouter
    jasmine spec/Router/TodoRouter.spec.js
    # Testing TodoService
    jasmine spec/Service/TodoService.spec.js
    ```
# API Functions:
- All TODO Items are stored in Google Firebase ( Realtime Database )

## API 1) Add a TODO Item with the following data 

### `POST` http://localhost:8080/api/ 

#### Request
- User ID
- TODO Name
- TODO Deadline
- *TODO Created Time created by the API shall be stored to Firebase as well

    - Body of the post request ( Postman )
    ```json
    {
        "user_id": 100,
        "todo_name": "name",
        "todo_deadline": "deadline"
    }
    ```
#### Response
- TODO ID

    - A successful request is indicated by a 200 OK HTTP status code. The response contains the child name of the new data specified in the POST request.
    ```json
    {
        "name": "-LKbiNl0tYkqPe3Gaawb"
    }
    ```


## API 2) Read a TODO Item
### `GET` http://localhost:8080/api/-LKaOfhxW2pJBRh4xaJL 

#### Request
- TODO ID
    - Get request by params.id ( Postman )

#### Response
- User ID
- TODO Created Time
- TODO Name
- TODO Deadline


    - A successful request is indicated by a 200 OK HTTP status code. The response contains the data associated with the path in the GET request.
    ```json
    {
        "created_time": "Thu Aug 23 2018 18:48:52 GMT+0800 (Hong Kong Standard Time)",
        "todo_deadline": "morning",
        "todo_name": "Breakfast",
        "user_id": 1
    }
    ```


## API 3) Change the Deadline of a TODO item

### `PATCH` http://localhost:8080/api/-LKaj6kCb41SniwNkFxV 

#### Request
- TODO ID
- TODO Deadline
    - Body of the patch request ( Postman )
    ```json
    {
        "todo_deadline": "new_todo_deadline"
    }
    ```

#### Response
- User ID
- TODO Created Time
- TODO Name
- TODO Deadline (New Deadline)
    - A successful request is indicated by a 200 OK HTTP status code. The response contains the data specified in the PATCH request.

    ```json
    {
        "todo_deadline": "new_todo_deadline"
    }
    ```

## API 4) Delete a TODO item

### `DELETE` http://localhost:8080/api/-LKaj6kCb41SniwNkFxV 

#### Request
- TODO ID
    - Delete request by params.id ( Postman )

#### Response
- Success/ Error

    - A successful DELETE request is indicated by a 200 OK HTTP status code with a response containing JSON message.
    ```json
    "Success"
    ```
- Or fail to delete
    ```json
    {
        "errMsg": "DATA_DOES_NOT_EXIST"
    }
    ```
## API 5) List all TODO items

### `GET` http://localhost:8080/api/user/1 

#### Request
- User ID
    - Delete request by params.id ( Postman )

#### Response
- Array of all TODO Items for that User ID
    - A successful request is indicated by a 200 OK HTTP status code. The response contains the data associated with the path in the GET request.

    ```json
    [
        {
            "created_time": "Thu Aug 23 2018 18:48:52 GMT+0800 (Hong Kong Standard Time)",
            "todo_deadline": "morning",
            "todo_name": "Breakfast",
            "user_id": 1
        }
    ]
    ```