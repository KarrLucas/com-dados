import Config from "./config/config.js";
import express from "express";
import loaders from "./loaders/index.js";
import os from 'os';
import cors from 'cors'

var ifaces = os.networkInterfaces();

process.env.TZ = 'America/Sao_Paulo';

async function startServer() {
    const app = express();
    
    app.set('trust proxy', true);

    app.use((req, res, next) => {
        req.header("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        app.use(cors());
        next();
    });

    await loaders({ expressApp: app });

    app.listen(Config.server.port, async () => {
        global.startTime = new Date();
        const ip = getIP();

        console.log(`🛡️  Server listening on port: ${Config.server.port} 🛡️`);
        console.log(`🛡️  ${ip} 🛡️`);
        console.log(`🛡️  Base URL: http://${ip.split(': ')[1]}:${Config.server.port} 🛡️`);
        console.log(`🛡️  Enviroment in use: ${process.env.NODE_ENV} 🛡️`);
        console.log(`🛡️  Server started at: ${global.startTime} 🛡️!`);
    }).on('error', error => {
        console.error(error);
        process.exit(1);
    });
}

function getIP() {
    var ip = '';
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }
            if (alias >= 1) {
                ip = `${ifname}: ${alias}, ${iface.address}`;
            } else {
                ip = `${ifname}: ${iface.address}`;
            }
            ++alias;
        });
    });
    
    return ip;
}

startServer();