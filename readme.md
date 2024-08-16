![architect](https://github.com/user-attachments/assets/dbf1ea7a-47e5-4ae6-afab-1a37c4696edb)

I developed an e-commerce site using a microservices architecture.

API Gateway : I created the API Gateway myself using Node.js. The API Gateway has two primary responsibilities: First, it routes requests from the client to the appropriate services; second, it validates the token received from the auth service along with the auth cache to grant necessary permissions and access to the required services.

Auth Service : This service allows users to register and log in to the system. I used Express.js, MongoDB, Redis, and RabbitMQ for this service.

User Service : Users can update their profile information, add avatars, etc. This service uses Express.js, MongoDB, and RabbitMQ.

Event Driven : When a user registers in the Auth Service, the user information is sent to a queue, and the User Service retrieves this information to register the user.

Product Service : Users can search for and add products. This service uses Java, Spring Boot, PostgreSQL, AWS S3, and Elasticsearch.

Basket Service : Users can add products to their basket. This service uses Express.js, MongoDB, Redis, and RabbitMQ.

Payment Service : After the basket is confirmed, the payment process is handled. This service uses TypeScript, Nest.js, PostgreSQL, and RabbitMQ.

Order Service : After the payment is completed, the order creation steps are carried out. This service uses TypeScript, Nest.js, PostgreSQL, and RabbitMQ.

Sync Communication : When a product is added to the basket, an HTTP request is sent to the Product Service to obtain the necessary product details.

Event Driven : After a product is added to the basket and the basket is confirmed, the basket information is written to a queue. The Payment Service listens to this queue and processes the payment. Once the payment is confirmed, the payment information is written back to the queue, and the Order Service retrieves the necessary data from this queue to create the order.

I used Docker to set up the required services. Testing was performed using Postman.