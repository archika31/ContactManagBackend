const asyncHandler=require('express-async-handler')
const Contact=require('../models/contactModel')
//@desc get list of all contacts
//@route GET /api/contacts
//@access private
const getContacts=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts)
})
const getContact=asyncHandler(async(req,res)=>{

    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404)
        throw new Error('Contact not found')
    }

    res.status(200).json(contacts)
})
const createContact= asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
   const contact= await Contact.create({
    name,email,phone,user_id:req.user.id
   })
    res.status(201).json(contact)
 })
const updateContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404)
        throw new Error('Contact not found')
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id, req.body,{
            new:true
        }
)
  
    res.status(200).json(updatedContact)
 })
 const deleteContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.findById(req.params.id);
    if(!contacts){
        res.status(404)
        throw new Error('Contact not found')
    }
    
    // await Contact.deleteOne( {"_id": ObjectId(req.params.id)});
   // await Contact.deleteOne({"_id": { "$oid" : req.params.id }});
   // Contact.remove({"_id":"65ffad1d4e3f32854cf41f37"})
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contacts)
 })

module.exports={getContact,getContacts,createContact,updateContact,deleteContact};