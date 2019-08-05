<h1>Precondition</h1>
<h5>Active account on services below ( for learning purpose it's free )</h5>

> https://www.mongodb.com/cloud
>
> https://www.cloudamqp.com/
>
> https://hub.docker.com/

<h5>
    Whole projects requires installations docker with all the necessary components.
    Complete installations guid is available in the official docker side.
    Be careful to choose the right version for your platform (windows, mac, linux) 
    Remember to install all dockers components (docker, docker-compose etc.)
</h5>

> https://docs.docker.com/install/

<h1>Api Gateway</h1>
<h5>In our project api gateway is reside in the ./api directions</h5>
<h5>To run projects type in your terminal, in root project directory</h5>

> docker build -t  "your hub.docker username"/nodejs_portfolio-api . 
>
<h5>Remember to type the dot char on the end of line</h6>
<h5>Next run container built for us before. Just typing</h6>

> docker run -p 8080:8080 -d  "your hub.docker username"/nodejs_portfolio-api
>
<h5> Running docker with -d flag means detached mood and -p flag means port and is depends on you</h5>
<h5> 
    Last one important thing about project. 
    Don't forget to insert .env file with mongodb_URL and amqp_URL variables contains yours private url to both cloud.
</h5>

<h1>Worker</h1>
<h5>Change line responsible for add and set project directory in our Dockerfile</h5>

```
  ADD worker /opt/worker
  WORKDIR /opt/worker
  
  ...

  CMD [ "node", "./dist/worker.js"]
```

<h5>
    Then run command such like before.
    Thankful this process we may create new independent Docker.
    Which means we're starting new applications in new thread.
</h5>

> docker build -t "your hub.docker username"/nodejs_portfolio-worker

<h5>And finally we may run our new docker thankful command</h5>

> docker run -p 5000:5000 -d  "your hub.docker username"/nodejs_portfolio-worker
>
<h5>Remember to insert .env file with mongodb_URL and amqp_URL variables containing private url to both cloud</h5>
<h1>Conclusion</h1>
<h5>
In the project above, we see several applications dependent on each other. Thanks to the rabbitMQ queue implementation, we can transfer necessary data between applications.
</h5>

<h5>
Actually, in accordance with the microservices design pattern, 
the path ./worker, along with the image and the container.
I recommend putting on several cloud-type solutions 
which will ensure reliable request support regardless of traffic volume.
</h5>

<h5>
    To understand deeper whole uses patterns pleas check official documentation of ours tools,
    and implementations
</h5>

> https://www.rabbitmq.com/documentation.html
>
> https://docs.docker.com/
>
> https://github.com/EthWorks/restless
>
> https://www.npmjs.com/package/amqp-connection-manager
>
> https://www.amqp.org/
> 
> https://docs.mongodb.com/

<h5>You may wonder to see how looks our root endpoint. I deploy project in my  VPS on the Arube Cloud. Is available for url below:</h5>

> http://212.237.0.26:49160/api/stories/all