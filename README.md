# TodoList

Deliverables/ Assumptions:
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


# Dependencies (require)

- NodeJS
    - axios
    - body-parser
    - express

- Jasmine

# instruction (step)
    
Clone this repo and navigate into it: 
$git clone git@github.com:LucasNG521/TodoList.git
$cd TodoList

Install required package:
$npm install

You can start the server by calling node with the script in your command prompt:
$node index.js


# API Functions:

## API 1) Add a TODO Item with the following data 
Request
User ID
TODO Name
TODO Deadline
* TODO Created Time created by the API shall be stored to Firebase as well

Response
TODO ID


## API 2) Read a TODO Item
Request
TODO ID

Response
User ID
TODO Created Time
TODO Name
TODO Deadline


## API 3) Change the Deadline of a TODO item
Request
TODO ID
TODO Deadline

Response
User ID
TODO Created Time
TODO Name
TODO Deadline (New Deadline)


## API 4) Delete a TODO item
Request
TODO ID

Response
Success/ Error


## API 5) List all TODO items
Request
User ID

Response
Array of all TODO Items for that User ID
