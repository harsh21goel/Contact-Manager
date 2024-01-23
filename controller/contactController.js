const asyncHandler=require("express-async-handler")
const contact =require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access Private
const getcontacts=asyncHandler(async(req,res)=>{
    const contacts=await contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})
 
//@desc Create new  contact
//@route POST /api/contacts
//@access private

const createcontact=asyncHandler(async(req,res)=>{
    // console.log("This request body is:",req.body)
    const {name,email,number}=req.body

    if(!name ||!email ||!number){
        res.status(400);
        throw new Error("All Feilds are mandatory")
    }
    const Contact =await contact.create({
        name,
        email,
        number,
        user_id:req.user.id
    })
    res.status(201).json(Contact)
})

//@desc Get contact
//@route GET  /api/contacts/:id
//@access private
const getcontact=asyncHandler(async(req,res)=>{
    const Contact =await contact.findById(req.params.id);
    if(!Contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(201).json(Contact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updatecontact=asyncHandler(async(req,res)=>{
    const Contact =await contact.findById(req.params.id);
    if(!Contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(Contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permisssion to Update other user contact")
    }
    const updatedcontact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(201).json(updatedcontact)
})

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
// const deletecontact=asyncHandler(async(req,res)=>{
//     const Contact =await contact.findById(req.params.id);
//     if(!Contact){
//         res.status(404);
//         throw new Error("Contact not found")
//     }
//     await Contact.remove();
//     res.status(201).json(Contact)

// })
const deleteContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;

    // Find the contact by ID
    const Contact = await contact.findById(contactId);

    if (!Contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(Contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permisssion to delete other user contact")
    }

    // Remove the specific contact
    await Contact.deleteOne({_id:req.params.id});

    res.status(201).json({ message: "Contact deleted successfully", deletedContact: Contact });
});


 


module.exports ={
    getcontacts,
    createcontact,
    getcontact,
    updatecontact,
    deleteContact,
}