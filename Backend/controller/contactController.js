const contactService = require("../service/contactService");
const asyncHandler = require("express-async-handler");
const authSchema = require("../config/validation");

/**
 * @postcontact
 */
const postContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const { error } = authSchema.validate(req.body);
        if (error) {
            return res.status(422).json({ message: error.details[0].message })
        }
        const contact = await contactService.createContact(req.body);
        res.status(201).json(contact)

    } catch (error) {
        console.error(error);
    }

})




/**
 * @putadata
 * 
 */
const putcontact = asyncHandler(async (req, res) => {
    try {
        const contactId = req.params.id;
        const updatedData = {
            ...req.body,
        }
        const contacts = await contactService.updateContact(contactId, updatedData);
        res.status(200).json(contacts)
    } catch (error) {
        throw new Error("error updating contactdata")
    }
})

/**
 * @deletecontact
 */
const DeleteContact = asyncHandler(async (req, res) => {
    try {
        const contactId = req.params.id;
        const contacts = await contactService.deleteContact(contactId);
        res.status(200).json(contacts)
    } catch (error) {
        throw new Error("error deleting contactdataaa")
    }
})

/**
 * @getcontact
 */

// const getAllContacts = asyncHandler(async (req, res) => {
//     try {
//         const contact = await contactService.getAllContact()
//         res.status(200).json(contact);
//     } catch (error) {
//         res.status(404).json({ error: error.message })
//     }
// })

// Adjust the path as necessary

// Search and pagination

const fetchContacts = asyncHandler(async (req, res) => {
    const { search = "", page = 1, limit = 10 } = req.query;
    try {
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const result = await contactService.getAllContactsAndsearchpagination(search, pageNum, limitNum);
        res.json({
            data: result.contacts,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            totalContacts: result.totalContacts

        })
    } catch (error) {
        console.error("error searching contacts:", error);
        res.status(500).json({ message: "internal server error" })
    }
});




module.exports = { postContact, fetchContacts, putcontact, DeleteContact }