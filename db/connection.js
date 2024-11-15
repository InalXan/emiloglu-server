import mongoose from "mongoose";

// MongoDB bağlantı URL'si
const DB_LINK = 'mongodb+srv://admin:3y3vaye1@emiloglu.s8xyxux.mongodb.net/?retryWrites=true&w=majority&appName=emiloglu';

const conn = async () => {
    try {
        await mongoose.connect(DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true, // TLS kullanımını etkinleştir
            tlsAllowInvalidCertificates: true, // Geçersiz TLS sertifikalarına izin verir
           });
        console.log("Database Connection Successfully");
    } catch (error) {
        console.log("Database Connection Error:", error);
    }
}

export default conn;

