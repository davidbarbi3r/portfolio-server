import Logging from "../library/Logging";
import firebaseAdmin from "firebase-admin"
import {Request, Response, NextFunction} from "express"

const extractFirebaseInfo = (req: Request, res: Response, next: NextFunction) => {
    Logging.info("Validating Firebase token...")

    // message received is "bearer 0xkf145461231efhkdqsdoiug... so we just have the second part"
    let token = req.headers.authorization?.split(" ")[1]

    //si token existe
    if (token){
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then(result => {
                if (result) {
                    // Add info to response
                    res.locals.firebase = result
                    res.locals.fire_token = token
                    next()
                } else {
                    Logging.warn("Token invalid, unauthorized")

                    return res.status(401).json({
                        message: "unauthorized"
                    })
                }
            })
            .catch((error) => {
                Logging.error(error)

                return res.status(401).json({
                    error,
                    message: "unauthorized"
                })
            })
    }
    else {
        return res.status(401).json({
            message: "unauthorized"
        })
    }
}

export default extractFirebaseInfo