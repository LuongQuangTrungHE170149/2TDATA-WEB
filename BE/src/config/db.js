import mongoose from "mongoose"

export const connectDB = async (uri) => {
    try {
        // Nếu không truyền uri, lấy từ biến môi trường
        const mongoUri = uri || process.env.MONGODB_URI;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log(e)
    }
}