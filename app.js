import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import FileUpload from 'express-fileupload'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import {OneImageUploadMV} from './imgUpload.js'

const app = express()

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(FileUpload({
    limits: {filesize: 500 * 1024 * 1024}
}))

app.use('/api/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.listen(process.env.PORT || 8082, (err) => {
    if (!err) {
        console.log('Server run as ' + process.env.PORT || 8082)
    } else {
        console.log(err)
    }
})

app.post('/api/image-uploads', async(req,res) => {
    try {
        var image = req.files?.image ? req.files?.image : false
        if (image) {
            var news_id = uuidv4();
            const result = await OneImageUploadMV(image, news_id, 0 , 'news')
            if (result) {
                res.status(200).json({status: true, path: result})
            }
        } else {
            res.status(204).json({ status: false, path : null})
        }
    } catch (err) {
        console.log("err => ", err)
        res.status(500).json({ status: false, path: null })
    }
})