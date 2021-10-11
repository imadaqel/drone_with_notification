import express, { Request, Response } from 'express';
import { connectDb } from "./db"
import { config } from './config/config';
import bodyParser from 'body-parser';
import { Routes } from './routes';
import cors from 'cors';
// import http from 'http'
// import {io,Socket} from './utilites/socket'
// import { createServer } from "http";
// import { Server, Socket } from "socket.io";
// import ioserver, { Socket } from 'socket.io';
// import ioclient from 'socket.io-client';
const app = require('express')();
const http = require('http').createServer(app);
// app.use(app.router);
import * as functions from 'firebase-functions';
export const onMessageCreate=functions.database.ref("/room/{roomId}/messages/{messageId}")
.onCreate((snapshot,context)=>{
const roomId=context.params.roomId;
const messageId=context.params.messageId;
console.log("messageId"+messageId,roomId)

const messageData=snapshot.val()
})
export const io= require("socket.io")(8900,{
    cors:{
        origins:"http://localhost:3000",
    }
})
io.on("connection",(socket:any)=>{
    console.log("a user connected")
    io.emit('welcome','this is socket serverrrrrrr.');
})
// const io = require("socket.io")(http, {
// 	cors: {
// 		origins: [
// 			"http://localhost:3001",
// 			],
// 	},
// })
// io.use((socket:any, next:any) => {
//     const token = socket.handshake.auth.token;
//     console.log('token', token);
//     next();
// });
//     io.on('connection', (socket:any) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//       socket.emit('my message', 'Hello there from node Hello again.');
//     io.emit('my message', 'Hellonnnnn.');
//   });

  const approuter = new Routes();
          connectDb()
            .then(async () => {
                console.log(`Connected to Db on port ${config.db.port}!`)
            });
        app.use(cors({
            origin: "*",
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
            methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
            credentials: true
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        if (process.env.NODE_ENV === 'production') {
        }
        approuter.routes(app)
         
        http.listen(config.server.port, () => {
            console.log(`Express is running on port ${config.server.port}`);
        });
    // }
// }
// export default new App().app;
export default app;
