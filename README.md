## REST API Testing
This is REST API testing using Jest, Supertest and in-memory MongoDB database.

## Technologies Used
NodeJs, Express, Jest, Supertest, MongoDB and Mongoose

## Getting Started
Download and install [NodeJs](https://nodejs.org)

Clone respository:
```git
    https://github.com/its-nedum/rest-api-testing.git
```

Open this file directory in your terminal and run the following command:

- Install Mongoose dependecy
```bash
    yarn install
```

- Start server on port 7000
```bash
    npm start
```

- Run test
```bash
    npm test
```

## API Routes
<table>
	<thead>
		<th>HTTP VERB</th>
		<th>ENDPOINT</th>
		<th>FUNCTIONALITY</th>
	</thead>
    <tbody>
        <tr>
            <td>POST</td>
            <td>/api/v1/post/create</td>
            <td>Create a post</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/v1/post/getAll</td>
            <td>Get all posts</td>
        </tr>
        <tr>
            <td>GET</td>
            <td>/api/v1/post/get/:id</td>
            <td>Get a single post</td>
        </tr>
        <tr>
            <td>PUT</td>
            <td>/api/v1/post/update/:id</td>
            <td>Update a post</td>
        </tr>
        <tr>
            <td>DELETE</td>
            <td>/api/v1/post/destroy/:id</td>
            <td>Delete a post</td>
        </tr>
    </tbody>
</table>