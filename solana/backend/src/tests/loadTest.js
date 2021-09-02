const WebSocket = require('ws');

const loadEnv = process.env.COUNT || 10;
const interval = process.env.INTERVAL || 5000; //ms
const load = loadEnv ? parseInt(loadEnv) : 10;
let connection = 1;
console.log({
    load,
    interval
})

const socketUrl = 'wss://stage.hypermine.in/whitelistws/';

function connect(connection){
    const client = new WebSocket(socketUrl);
    client.on('message', msg => {
        const d = JSON.parse(msg);
        if(d.op == "init") {
            const challenge = d.data["serviceEndpoint"] ? d.data["serviceEndpoint"].split('challenge')[1]: "";
            console.log(NOW() + ": connected for connection no. " + connection + " Challenge " + challenge);  
        }
        
        // else if(d.op == "end"){
        //     client.close();
        //     console.log(NOW() + ": connection " + connection + " closed.")
        // } else if(d.op === "reload"){
        //     client.close(4001, d.data.clientId);
        //     console.log(NOW() + ": connection " + connection + " closed.")
        // }
    });
    client.on('error', error => {
        console.log(NOW() + ": for connection no. " + connection +  ".error:" + error);  
    });
}

function NOW(){
    const now = new Date();
    return now.toISOString();
}

function run(){
    
    const timer = setInterval(()=>{
        console.log(NOW() + ": initiating conncurrent connection no. " + connection)
        connection = connection + 1;
        connect(connection)
        if(connection > load){
            clearInterval(timer);
        }
    }, interval)
}

run();





