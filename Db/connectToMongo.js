import mongoose from "mongoose"
const connectToMongo = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to the MongoDb :${error.messae}`)
    }
}

export default connectToMongo;