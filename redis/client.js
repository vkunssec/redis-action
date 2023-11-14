const redis = require("redis");

(async () => {
    // Creates a new Redis client
    // If REDIS_HOST is not set, the default host is localhost
    // If REDIS_PORT is not set, the default port is 6379
    const redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });
    
    redisClient.on("error", function(err) {
        console.log("Error: " + err);
    });
    
    console.log('open connection');
    await redisClient.connect();
    
    console.log('set value');
    // Sets the key "octocat" to a value of "Mona the octocat"
    await redisClient.set("octocat", "Mona the Octocat", redis.print);
    
    console.log('set hash values');
    // Sets a key to "octocat", field to "species", and "value" to "Cat and Octopus"
    await redisClient.hSet("species", "octocat", "Cat and Octopus", redis.print);
    // Sets a key to "octocat", field to "species", and "value" to "Dinosaur and Octopus"
    await redisClient.hSet("species", "dinotocat", "Dinosaur and Octopus", redis.print);
    // Sets a key to "octocat", field to "species", and "value" to "Cat and Robot"
    await redisClient.hSet("species", "robotocat", "Cat and Robot", redis.print);
    // Gets all fields in "species" key
    
    console.log('hash keys')
    const replies = await redisClient.hKeys("species");
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });

    console.log('close connection');
    redisClient.quit();
})();
