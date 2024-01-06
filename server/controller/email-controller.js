import Email from "../model/email.js";

export const saveSentEmails = (req, res) => {
    try {
       const email = new Email(req.body);
       email.save(); // to save the data in the database

      res.status(200).json('email saved successfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getEmails = async (req, res) => {
    try {
        let emails;  // we have taken a variable
        if(req.params.type === 'bin') { // we check if the request sent is param with type === bin 
            emails = await Email.find({ bin: true }); // whoevers bin is true it will go to bin state
        } else if (req.params.type === 'all mails') {
            emails = await Email.find({}); // {} empty bz we want all the mails to be present in it
        } else if (req.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false }); // find whose starred is true
        } else {
            emails = await Email.find({ type: req.params.type }); // get the emails (find is a mongodb function)
        }
        res.status(200).json(emails); // if successful show data(emails)
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const moveEmailsToBin = async (req, res) => {
    try {
        // when we tap on delete it sends all the id, so now we use ($IN: as include) to req.body and ($SET) to set/change the model(schema) of the data
        await Email.updateMany({ _id: { $in: req.body }}, {$set: { bin: true, starred: false, type: ''}});
        res.status(200).json('emails deleted successfully'); // if successful show data(emails)
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const toggleStarredEmails = async (req, res) => {
    try {
        await Email.updateOne({ _id: req.body.id}, {$set: {starred: req.body.value }}) // updateOne as we star one at a time, we get the id and value and we have to set the value to starred if it is(!starred)
        res.status(200).json('emails updated/starred successfully'); 
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const deleteEmails = async (req, res) => {
    try {
        await Email.deleteMany({_id: {$in: req.body }}); // deletemany(mongodb function), delete those whose id is req from frontend
        res.status(200).json('emails deleted successfully'); 
    } catch (error) {
        res.status(500).json(error.message);
    }
}
