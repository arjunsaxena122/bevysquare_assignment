import mongoose from "mongoose"

const connectDB = async () =>{
    try {

        const connectionInstance = await mongoose.connect(`${process.env.NEXT_MONGO_URI}`)

        console.log("DB connection successfully done:",connectionInstance.connection.host)
        
    } catch (error) {
        console.log("ERROR: DB connection faild",error.message)
        process.exit(1)
    }
}

export default connectDB