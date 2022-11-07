import sharp from 'sharp'
import fs from 'fs'


function DeleteFile(imagepath) {
    if (fs.existsSync(imagepath)) {
        fs.unlinkSync(imagepath, (error) => {
            if (error) {
                console.log('file deleted Error :' + error)
            } else {
                console.log('FILE deleted')
            }
        })
    } else {
        console.log('Dosnt the file')
    }
}

const OneImageUploadMV = (image, id, img_nmb, folder_name) => {
    var pwd = process.cwd()
    console.log('pwd => ', pwd);
    return new Promise((resolve) => {

        if (!fs.existsSync(pwd + "/uploads/" + folder_name + "/" + id + "/")) {
            if (!fs.existsSync(pwd + "/uploads/" + folder_name )) {
                fs.mkdirSync(pwd + "/uploads/" + folder_name)
                fs.mkdirSync(pwd + "/uploads/" + folder_name + "/" + id + "/")
            } else {
                fs.mkdirSync(pwd + "/uploads/" + folder_name + "/" + id + "/")
            }

        }

        const timePath = Date.now()
        const pathMV = pwd + "/uploads/" + folder_name + "/" + id + "/" + img_nmb + '-' + timePath
        image.mv(pathMV, (error) => {

            if (error) {

                resolve(false)

            } else {

                console.log('pathMV')
                console.log(pathMV)
                sharp(pathMV)
                    .resize({ width: 1000 })
                    .jpeg({ quality: 100 })
                    .withMetadata()
                    .toFile(pathMV + '-1000.jpg', (error) => {
                        sharp(pathMV)
                            .resize({ width: 700 })
                            .jpeg({ quality: 100 })
                            .withMetadata()
                            .toFile(pathMV + '-700.jpg', (error) => {
                                sharp(pathMV)
                                    .resize({ width: 300 })
                                    .jpeg({ quality: 100 })
                                    .withMetadata()
                                    .toFile(pathMV + '-300.jpg', (error) => {
                                        // ---------------------
                                        sharp(pathMV)
                                            .resize({ width: 1000 })
                                            .jpeg({ quality: 100 })
                                            .withMetadata()
                                            .toFile(pathMV + '-1000.webp', (error) => {
                                                sharp(pathMV)
                                                    .resize({ width: 700 })
                                                    .jpeg({ quality: 100 })
                                                    .withMetadata()
                                                    .toFile(pathMV + '-700.webp', (error) => {
                                                        sharp(pathMV)
                                                            .resize({ width: 300 })
                                                            .jpeg({ quality: 100 })
                                                            .withMetadata()
                                                            .toFile(pathMV + '-300.webp', (error) => {
                                                                console.log('pathMV')
                                                                console.log(pathMV)
                                                                DeleteFile(pathMV)
                                                                resolve('/uploads/' + folder_name + '/' + id + '/' + img_nmb + '-' + timePath)
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            }
        })
    })
}


const DeleteImage = (image_path) => {

    var pwd = process.cwd()
    DeleteFile(pwd + image_path + '-1000.jpg')
    DeleteFile(pwd + image_path + '-700.jpg')
    DeleteFile(pwd + image_path + '-300.jpg')
    
    DeleteFile(pwd + image_path + '-1000.webp')
    DeleteFile(pwd + image_path + '-700.webp')
    DeleteFile(pwd + image_path + '-300.webp')

    console.log('DELETE image')
    console.log(pwd + image_path + '-1000.jpg')
    

}


const DeleteFolder = (folderPath) => {
    var pwd = process.cwd()
    folderPath = pwd + '/media_srvr' +folderPath
    console.log(folderPath)
    if (fs.existsSync(folderPath)) {
        fs.rm(folderPath, { recursive: true }, async (error) => {
            if (error) {
                console.log('file deleted Error :' + error)
            } else {
                console.log('FILE deleted')
            }
        })
    } else {
        console.log('Dosnt the file')
    }
}

const DeleteVideo = (video_path) => {

    var pwd = process.cwd()
    DeleteFile(pwd + video_path + '.mp4')
    DeleteFile(pwd + video_path + '-144.mp4')
    DeleteFile(pwd + video_path + '-240.mp4')
    DeleteFile(pwd + video_path + '-360.mp4')
    DeleteFile(pwd + video_path + '-4100.mp4')
    DeleteFile(pwd + video_path + '-720.mp4')

    console.log(pwd + video_path + '-144.mp4')
    console.log('DELETE video')
    

}

const FileUpload = (file,folder_name)=>{
    var pwd = process.cwd()

    return new Promise((resolve) => {

        if (!fs.existsSync(pwd + "/uploads/" + folder_name)) {

            fs.mkdirSync(pwd + "/uploads/" + folder_name)

        }

        const timePath = Date.now()
        const pathMV = pwd + "/uploads/" + folder_name +'/' + timePath + file.name
        const path = "/uploads/" + folder_name + '/' + timePath + file.name

        file.mv(pathMV,(error)=>{
            if(error){
                console.log('File upload error:' + error)
                 DeleteFile(pathMV)
                resolve(false)
            }
            else{
                console.log('File upload sucsesfully')
                resolve(path)
            }
        })
        
    })

}


export {

    DeleteImage,
    DeleteFolder,
    OneImageUploadMV,
    DeleteVideo,
    FileUpload,

}