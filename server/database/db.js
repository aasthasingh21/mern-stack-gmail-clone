
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // for security purposes

dotenv.config(); 

const connection = () => {
    const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.p1aee3r.mongodb.net/?retryWrites=true&w=majority`;
    try {   // since db is on cloud so for exception handeling we make use of try-catch error
        mongoose.connect(DB_URI, {useNewUrlParser: true});
        console.log(`database connected successfully`);
    } catch (error) {
        console.log(`error while connecting the database`, error.message);
    }
}

export default connection;
