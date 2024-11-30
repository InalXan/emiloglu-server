import mongoose from "mongoose";

// MongoDB bağlantı URL'si
const DB_LINK = 'mongodb+srv://Tunar:cKzYb2c0nQi3ajnH@cluster0.dxaqzlk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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

