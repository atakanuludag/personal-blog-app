let nodeEnv = 'dev';

if(typeof process.env.NODE_ENV !== "undefined") nodeEnv = process.env.NODE_ENV.trim();

const mongoDbConnectionString = {
    dev: "mongodb://localhost:27017/personal-blog?authSource=admin&ssl=false",
    live: ""
}

const getMongoDbConnectionString = (): string => 
    nodeEnv === "dev" ? mongoDbConnectionString.dev : mongoDbConnectionString.live;

export const Config = {
    apiPort: 5051,
    apiPrefix: 'api',
    jwtSecretKey: '123456',
    jwtExpiresIn: '365 days',
    mongoDbConnectionString: getMongoDbConnectionString()
}

console.log("MongoDb Connection String: ", getMongoDbConnectionString());