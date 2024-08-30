import { Request, Response } from "express"
import path from "path"

function urlToPath(url: string) {
    return __dirname + "/../../../../../../../docs/images/" + url
}

async function get(req: Request, res: Response) {
    const Fpath = urlToPath(req.params.url)
    return res.status(200).sendFile(path.join(Fpath))
}

export default get
