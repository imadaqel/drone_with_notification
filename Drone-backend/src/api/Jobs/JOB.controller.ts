import { Request, Response } from 'express';
import JOB, { Ijob } from './JOB.modal';
import multer from 'multer';
import async from 'async';
import path from 'path';
// import { Socket,io } from '../../utilites/socket';
import {io} from '../../app';

var FCM=require('fcm-node')
var admin=require("firebase-admin");
import responseHelper from '../../helpers/Responsehelper';
import bodyParser from 'body-parser';
const serverDir="http://172.22.2.172:3000/";

const SERVER_KEY="AAAAxhazGtA:APA91bHbAWHhBCExMJBdsT3JCwMOsqxowm1ICbU2-Jhoo616j_01tpzqJcaUEMmJKfZOO5PZH69O6vxR-YFLQwP9L9Re3HngnMkFfYvqIwLJkHTor6cZQqK7CXGD9rcghE8R0EWDq-Tm";

export const addJob = async (req: Request, res: Response) => {
  const { userName, email, phone, location, Status } = req.body;
  
  const newJOB = new JOB({
    userName,
    email,
    phone,
    location,
    Picture: "",
    video: "",
    Status: 'Pending',
    isApproved:'Pending',
    notificat:"Asdas"
  });
  try {
    const job = await newJOB.save();
    io.emit('welcome','New Job Has Been Added !!');
    return responseHelper.created(req, res, job,{ notify: 'New Job Has Been Added' });
  } catch (e) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error' });
  }
}
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await JOB.find({}).sort({ createdAt: -1 });
    console.log(jobs)
    if (!jobs) {
      return responseHelper.notFound(req, res, "there's no jobs");
    }
    return responseHelper.ok(req, res, jobs);
  } catch (err) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error' });
  }
}
export const getJob = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const jobs = await JOB.findById({_id:id});
    console.log(jobs)
    if (!jobs) {
      return responseHelper.notFound(req, res, "there's no jobs");
    }
    return responseHelper.ok(req, res, jobs);
  } catch (err) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error' });
  }
}
export const uploadImage= async (req: Request, res: Response) => {
  const {id} = req.params;
  const img = req.file;
  try {
    const job = await JOB.findOneAndUpdate({ _id: id }, {
      Picture:`${serverDir}${id}/${img?.filename}`
    }, { new: true });
    if (!job) {
        return responseHelper.notFound(req, res, 'Job Not Found');
    }
    return responseHelper.ok(req, res, job);
} catch (err) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error' });
}  
}
export const uploadVideo = async (req: Request, res: Response) => {
  const {id} = req.params;
  const video= req.file;
  try {
    const job = await JOB.findOneAndUpdate({ _id: id }, {
        video:`${serverDir}${id}/${video?.filename}`
    }, { new: true });
    if (!job) {
        return responseHelper.notFound(req, res, 'Job Not Found');
    }
    return responseHelper.ok(req, res, job);
} catch (err) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error' });
}
}
export const approveJob  =async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const job = await JOB.findOneAndUpdate({ _id: id }, {
      isApproved:'Approved'
    }, { new: true });
    if (!job) {
        return responseHelper.notFound(req, res, 'Job Not Found');
    }
    return responseHelper.ok(req, res, job,{ notify: 'Job verified' });
} catch (err) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error'});
}
}
export const declineJob  =async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const job = await JOB.findOneAndUpdate({ _id: id }, {
      isApproved:'Declined'
    }, { new: true });
    if (!job) {
        return responseHelper.notFound(req, res, 'Job Not Found');
    }
    return responseHelper.ok(req, res, job);
} catch (err) {
    return responseHelper.serverError(req, res, { message: 'Internal Server Error'});
}
}
export const approveedJobs = async (req: Request, res: Response) =>{
  try{
    const Approvedjobs = await JOB.find({isApproved:"Approved"});
    console.log(Approvedjobs)
    console.log("Approvedjobs")
    if(!Approvedjobs){
      return responseHelper.notFound(req, res, "no Approved jobs");
    }
    return responseHelper.ok(req, res,Approvedjobs);
  }
  catch(err){
    return responseHelper.serverError(req, res, { message: 'Internal Server Error' });
  }
}
export const notification = async (req: Request, res: Response,next:any) => {
  try {
     let fcm=new FCM(SERVER_KEY)
     let message={
       to:"/topics/" + req.body.topic,
       notification:{
        title :req.body.title,
        body:req.body.body,
        sound: "default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
       },
       data:req.body.data
     }
     fcm.send(message,(err:any,response:Response)=>{
       if(err){
         next(err);
       }
       else{
         res.json(response)
       }
     })
  } catch (error) {
    next(error)
  }
}
