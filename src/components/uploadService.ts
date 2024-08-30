import path from "path"
import fs from "fs"
import multer from "multer"
import { randomUUID } from "crypto"

const ensureDirExists = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../../../../../../../docs/images")
        ensureDirExists(uploadPath)
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().split("T")[0]
        cb(null, date + "-" + randomUUID())
    },
})

const upload = multer({ storage: storage })

export default upload
