import express from 'express'
import {addJob,getJobs,uploadImage,uploadVideo,approveJob,declineJob,getJob,approveedJobs,notification}from "./JOB.controller"
import multer from 'multer';
import path from 'path';
import { execPath } from 'process';
var fs = require('fs');
const dirimg ='C:\\Users\\tsabra\\Desktop\\drone-backend\\droneback-end\\Media\\Images';
const dirvideo ='C:\\Users\\tsabra\\Desktop\\drone-backend\\droneback-end\\Media\\videos';
const Imgstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync(`${dirimg}/${req.params.id}`)){
                fs.mkdirSync(`${dirimg}/${req.params.id}`);
        }
        cb(null,`${dirimg}/${req.params.id}`);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const Videostorage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fs.existsSync(`${dirvideo}/${req.params.id}`)){
            fs.mkdirSync(`${dirvideo}/${req.params.id}`);
         }
    cb(null,`${dirvideo}/${req.params.id}`);
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const uploadeImg = multer({storage:Imgstorage})
const uploadeVideo = multer({storage: Videostorage})
var app = express()
const router = express.Router();

router.patch('/uploade/Image/:id',uploadeImg.single('image'),uploadImage);
router.patch('/uploade/Video/:id',uploadeVideo.single('video'),uploadVideo);
router.get('/approved',approveedJobs)
router.post('/',addJob);
router.get('/:id',getJob);
router.patch('/approve/:id',approveJob);
router.patch('/decline/:id',declineJob);
router.get('/',getJobs);
router.post('/fcm',notification)
export default router
