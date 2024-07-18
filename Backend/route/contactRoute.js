const express = require("express");
const { postContact,fetchContacts,putcontact,DeleteContact} = require("../controller/contactController")
const router = express.Router();


router.route('/contact').post(postContact);

router.route('/contact').get(fetchContacts);
router.route('/contact/:id').put(putcontact);
router.route('/contact/:id').delete(DeleteContact);
module.exports = router;