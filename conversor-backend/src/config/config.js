import dotenv from 'dotenv';

dotenv.config({silent: true});

export default class Config {
    
    static env = process.env.NODE_ENV;

    static server = {
        baseUrl: process.env.SERVER_BASE_URL,
        port: process.env.PORT,
    };

};