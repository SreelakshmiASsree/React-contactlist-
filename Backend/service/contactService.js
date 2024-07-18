const contactmodel = require("../Model/contactlistmodel");


const createContact = async (data) => {
    const { salutation, firstName, lastName, email, phone, place } = data;
    return await contactmodel.create({
        salutation,
        firstName,
        lastName,
        email,
        phone,
        place
    })
}





const updateContact = async (contactId, updatedData) => {
    try {
        const contact = await contactmodel.findByIdAndUpdate(contactId, updatedData, { new: true });
        if (!contact) {
            throw new Error("contact not found")
        }
        return contact;
    } catch (error) {
        console.error("error updating contact");
        throw error;
    }
}

const deleteContact = async (contactId) => {
    try {
        const contactDelete = await contactmodel.findByIdAndDelete(contactId);
        if (!contactDelete) {
            throw new Error("CONTACT NOT DELETE");
        }
        return contactDelete;

    } catch (error) {
        throw new Error("Error in delete contact")
    }

}


// const getAllContact = async () => {
//     const contact = await contactmodel.find().sort({ createdAt: -1 });
//     return contact;
// }

// Adjust the path as necessary

const getAllContactsAndsearchpagination = async (search = '', page = 1, limit = 10) => {
    try {
        const matchStage = {
            $match: {
                $or: [
                    { firstName: { $regex: search, $options: 'i' } },
                    { lastName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            }
        };

        const sortStage = {
            $sort: { createdAt: -1 }
        };

        const paginationStages = [
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ];

        const pipeline = [matchStage, sortStage, ...paginationStages];
        const contacts = await contactmodel.aggregate(pipeline);
        const totalContacts = await contactmodel.countDocuments(matchStage.$match)
        return {
            contacts,
            currentPage: page,
            totalPages: Math.ceil(totalContacts / limit),
            totalContacts
        }

    } catch (error) {
        console.error("Error fetching employee:", error);
        throw error;
    }
}





module.exports = { createContact, getAllContactsAndsearchpagination, updateContact, deleteContact };