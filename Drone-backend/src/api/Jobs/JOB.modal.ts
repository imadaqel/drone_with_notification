import mongoose, { Document, model, Model } from 'mongoose';
interface location {
    latitude:String
    longitude:String
}
interface Media {
  Picture:String
  video:String
}
export interface Ijob extends Document {
    userName:string
    phone:string
    location:location
    email:string
    Status?:string
    Picture:String
    video:String
    isApproved:string
}
const JOBSchema = new mongoose.Schema({
    userName: String,
    phone: String,
    location: {
      latitude: String,
      longitude: String,
      },
    email: String,
    Status:{
        type: String,
        enum: ['Served', 'Pending','Processing','canceled']
    },
    isApproved:{
      type: String,
      enum: ['Approved', 'Pending','Declined']
    },
    Picture:String,
    video:String,
  }, {timestamps: true});
export const JOB: Model<Ijob> = model<Ijob>("JOB",JOBSchema);
export default JOB;
/*
 media:{
      Picture:String,
      video:String
    },*/