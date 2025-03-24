import {connectDB} from './utils/db'
import {app} from './app'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
})

//create server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDB();
})
