const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/lending_platform', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully');
    }catch(err){
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;