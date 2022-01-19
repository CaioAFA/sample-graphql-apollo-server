# GraphQL Apollo Server Sample

## Technologies
- NodeJS + Apollo Server for Backend
- Token JWT to authenticate and save session data
- MySQL database with Query Builder (Knex), password encryptation and DB transactions

## NPM packages
- **apollo-server**: GraphQL implementation
- **graphql**: GraphQL implementation
- **graphql-import**: separate GraphQL Queries, Mutations, etc. into many files
- **bcrypt-nodejs**: data encrypt (for passwords stored in the database)
- **dotenv**: environment variables
- **jwt-simple**: JWT implementation
- **knex**: query builder for database
- **mysql**: MySQL database connection
- **nodemon**: dev dependency (update the app when a file is updated)

## Running the project
<ol>
  <li>
    Execute the commands of the <b>create-database.sql</b> file on your MySQL database (as a root user). It'll create a database <b>graphql-sample</b> and a user <b>gql_sample</b> with password <b>gql_sample_123</b>.
  </li>

  <li>
    Copy the file <b>.env.sample</b> and name it as <b>.env</b>. Then, update the database credencials if necessary and edit APP_AUTH_SECRET parameter.
  </li>

  <li>
    Execute the command <b>npm install</b> to install the dependencies.
  </li>

  <li>
    Execute the command <b>npx knex migrate:latest</b> to apply all of the migrations on the database.
  </li>

  <li>
    Execute the command <b>npm start</b> to run the project.
    <br/>
    To execute the project as a logged admin user: <b>npm run startSimulatingLoggedAdminUser</b>
    <br/>
    To execute the project as a logged user: <b>npm run startSimulatingLoggedUser</b>
    <br/>
  </li>

  <li>
    Login credentials:
    <br/>
    Admin user:
    <br/>
    <b>User</b>: admin
    <br/>
    <b>Password</b>: admin
    <br/>
    <br/>
    Normal user:
    <br/>
    <b>User</b>: user
    <br/>
    <b>Password</b>: user
  </li>
</ol>

## Files and directories structure

- **config/context.js**: here, we find the *context* variable from Apollo Server, where we can insert variables, functions, etc. to use in the resolvers. Here we add a variable that informs if the user is logged or not and if it's an admin!

- **migrations**: here are the Knex *migrations*, that will edit the database.

- **resolvers/Mutation**: mutations implementations.
  - OBS: if you add some file, don't forget to import it on **resolvers/Mutation/index.js**.

- **resolvers/Query**: GraphQL query implementations.
  - OBS: if you add some file, don't forget to import it on **resolvers/Query/index.js**.

- **resolvers/Type**: "Special types" implementation. Here, for example, we implement the field "authors" when we query a "music" object (this needs other Database Query to get the information).
  - OBS: if you add some file, don't forget to import it on **resolvers/index.js**.

- **schema**: GraphQL API definition. Here we define Queries, Mutations, Types, returned Types, etc.
  - OBS: if you add some file, don't forget to import it on **schema/index.graphql**. This is possible thanks to *graphql-import* package.
