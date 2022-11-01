# portfolio-back
Developed as the final project of my web development bootcamp at Ironhack Barcelona. It's a MERN Stack application, check the frontend repository [here](https://github.com/afabregasm/portfolio-front).

## About
Hi! My name is Andrea. I'm a designer and a web developer. This project constitutes my own portfolio, a platform that makes it easier for me to promote my work to the public and at the same time makes it easier for users interested in my services to place an order or contact directly with me.  

![Project Image](https://i.imgur.com/6k3J5gW.png "Project Image")

## Deployment
You can check the app fully deployed [here](https://afabregasm.herokuapp.com/). If you wish to view the API deployment instead, check [here](https://afabregasm-back.herokuapp.com/api/).

## Work structure
I developed this project alone and used [Trello](https://trello.com/home) to organize my workflow.

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd portfolio-back
$ npm install
$ npm start
```

## Models
#### User.model.js
```js
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  isAdmin: Boolean,
});
```
#### CodingProject.model.js
```js
const codingProjectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  url: { type: String, unique: true },
  image: String,
});
```
#### DesignProject.model.js
```js
const designProjectSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: String,
  images: [String],
});
````
#### Order.model.js
```js
const orderSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  modComment: {
    type: String,
    default: "Pendiente",
  },
  status: {
    type: String,
    enum: ["Aprobado", "Pendiente", "Denegado"],
    default: "Pendiente",
  },
});
```

## User roles
| Role  | Capabilities                                                                                                                               | Property       |
| :---: | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| User  | Can login/logout. Can read all the projects. Can create a new order.                                                                       | isAdmin: false |
| Admin | Can login/logout. Can read, edit or delete all the projects. Can create a new project. Can read all user's orders and edit or delete them. | isAdmin: true  |

## API Reference
| Method | Endpoint                    | Require                                             | Response (200)                                                        | Action                                                                    |
| :----: | --------------------------- | --------------------------------------------------- |---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| POST   | /signup                     | const { username, email, password } = req.body      | json({user: user})                                                    | Registers the user in the database and returns the logged in user.        |
| POST   | /login                      | const { email, password } = req.body                | json({authToken: authToken})                                          | Logs in a user already registered.                                        |
| GET    | /coding-projects            | -                                                   | json([allProjects])                                                   | Returns an array with all the coding projects registered in the database. |
| GET    | /design-projects            | -                                                   | json([allProjects])                                                   | Returns an array with all the design projects registered in the database. |
| GET    | /coding-projects/:projectId | const { projectId } = req.params                    | json({project})                                                       | Returns the information of the specified project.                         |
| GET    | /design-projects/:projectId | const { projectId } = req.params                    | json({project})                                                       | Returns the information of the specified project.                         |
| POST   | /coding-projects            | const { title, description, url, image } = req.body | json({response})                                                      | Creates a coding project in the database.                                 |
| POST   | /design-projects            | const { title, description, images } = req.body     | json({response})                                                      | Creates a design project in the database.                                 |
| PUT    | /coding-projects/:projectId | const { projectId } = req.params                    | json({updatedProject})                                                | Edits a coding project that already exists on the database.               |
| PUT    | /design-projects/:projectId | const { projectId } = req.params                    | json({updatedProject})                                                | Edits a design project that already exists on the database.               |
| DELETE | /coding-projects/:projectId | const { projectId } = req.params                    | json({message: "Project with *projectId* was removed successfully."}) | Deletes a coding project from the database.                               |
| DELETE | /design-projects/:projectId | const { projectId } = req.params                    | json({message: "Project with *projectId* was removed successfully."}) | Deletes a design project from the database.                               |
| GET    | /profile                    | -                                                   | json({thisUser})                                                      | Returns the current user object.                                          |
| POST   | /profile                    | const { title, description, reference } = req.body  | json({message: "Your order was created successfully."})               | Creates an order in the database and update the current user document.    |
| DELETE | /profile/:orderId           | const { orderId } = req.params                      | json({message: "Your order was removed successfully."})               | Deletes an order from the database.                                       |
| GET    | /all-orders                 | -                                                   | json([allOrders])                                                     | Returns an array with all the orders registered in the database.          |
| GET    | /all-orders/:orderId        | const { orderId } = req.params                      | json({order})                                                         | Returns the information of the specified order.                           |
| PATCH  | /all-orders/:orderId        | const { orderId } = req.params                      | res.json({updatedOrder})                                              | Edits an order that already exists on the database.                       |

---

Any doubts? Contact me!
<a href="https://www.behance.net/afabregasm"><img align="right" width="20px" src="https://simpleicons.now.sh/behance/495f7e" alt="Andrea's Behance" /></a>
<a href="https://www.linkedin.com/in/afabregasm"><img align="right" width="20px" src="https://simpleicons.now.sh/linkedin/495f7e" alt="Andrea's LinkedIn" /></a>
<a href="mailto:contact@afabregasm.com"><img align="right" width="20px" src="https://simpleicons.now.sh/maildotru/495f7e" alt="Andrea's Facebook" /></a>
