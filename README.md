Environment Requirements:

> node ^10.16.0 <br>
> npm ^6.9.0 <br>
> yarn ^1.17.3 <br>

For windows architecture I recommended to install globally: <br>
> nodemon ^1.19.0 <br>
> ts-node ^8.3.0 <br>
> typescript ^3.5.3

This project consists of two smaller projects. 
<br> 
<br> 
Worker directory is separate applications than can be copy few time for another server localizations
or even another virtual machine.
<br>
<br>

In /api directory we have main Rest applications include: <br>
> rabbitMQ - message broker <br>
> @restless/restless - Express.js api, validations <br>
> mongodb - noSQL database <br>
> ts-node

This point of the project is like Producer for rabbitMQ architecture <br>
To see more consider visit link below with rabbitMQ documentations.
> https://www.rabbitmq.com/ <br>

To better understand req api validations pleas check link:
> https://github.com/EthWorks/restless/tree/master/restless <br>

And to see more about mongoDB architecture: <br>
> https://docs.mongodb.com/manual/

<br>
Worker is consumer / or WORKER in other words for rabbitMQ
<br> [ _pleas see rabbitmq docs for better understanding typical rabbit concept_ ].
<br> 
This small service is responsible for loading date from queue and preparing to save in mongoDB, after all insert JSON date to cloud
<br>
<br>
Start whole project in developer mood, type in your favorite terminal for root directory: <br> 

> cd api/ <br>
> yarn install <br>
> nodemon --exec ts-node index.ts <br>

Next open new terminal in root directory and type command: <br>
> cd worker/ <br>
> yarn install <br>
> nodemon --exec ts-node worker.ts 

Remand to insert your .env file to both directory, or change url line responsible for connection with AMQP cloud, and MongoDB.