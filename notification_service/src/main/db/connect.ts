import mongoose from "mongoose"


type urlType = string 

export const connectDB = async (url: urlType) => {
    await mongoose.connect(url)
}