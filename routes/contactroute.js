const express=require("express")
const router=express.Router()
const { getcontacts,
    createcontact,
    getcontact,
    updatecontact,
    deleteContact}= require("../controller/contactController")
const validateToken = require("../middleware/validaToken")




router.use(validateToken)
router.route("/").get(getcontacts).post(createcontact)

router.route("/:id").get(getcontact).put(updatecontact).delete(deleteContact)



module.exports=router