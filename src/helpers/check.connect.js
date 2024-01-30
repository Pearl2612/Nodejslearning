//file kiem tra xem bao nhieu connect
"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

//dem so luong ket noi
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
};

//Thong bao khi qua tai connect
const checkoverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length; //kiem tra cpu core la bao nhieu
        const menoryUsage = process.memoryUsage().rss; //su dung bao nhieu bo nho
        // example max number of connections based on cpu core
        const maxConnections = numCores * 5;

        console.log(`Active connections: ${numConnection}`);
        console.log(`Memory usage: ${menoryUsage / 1024 / 1024} MB`);

        if (numConnection > maxConnections) {
            console.log(`Connection overload detected!`);
			//notification.ping("Connection overload detected!");
        }
    }, _SECONDS); // Monitor every 5 seconds
};

module.exports = {
    countConnect,
    checkoverload,																							
};
