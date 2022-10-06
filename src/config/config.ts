import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster.ejo00yp.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337

const FIRE_TYPE = process.env.FIRE_TYPE || ""
const FIRE_PROJECT_ID = process.env.FIRE_PROJECT_ID || "" 
const FIRE_PRIVATE_KEY_ID = process.env.FIRE_PRIVATE_KEY_ID || ""
const FIRE_PRIVATE_KEY = process.env.FIRE_PRIVATE_KEY || ""
const FIRE_CLIENT_EMAIL = process.env.FIRE_CLIENT_EMAIL || ""
const FIRE_CLIENT_ID = process.env.FIRE_CLIENT_ID || ""
const FIRE_AUTH_URI = process.env.FIRE_AUTH_URI || ""
const FIRE_TOKEN_URI = process.env.FIRE_TOKEN_URI || ""
const FIRE_AUTH_PROVIDER = process.env.FIRE_AUTH_PROVIDER || ""
const FIRE_CLIENT_URL = process.env.FIRE_CLIENT_URL || ""

export const config = {
    mongo: {
        url: MONGO_URL
    }, 
    server: {
        port: SERVER_PORT
    },
    firebase: {
        "type": FIRE_TYPE,
        "project_id": FIRE_PROJECT_ID,
        "private_key_id":FIRE_PRIVATE_KEY_ID,
        "private_key":FIRE_PRIVATE_KEY,
        "client_email":FIRE_CLIENT_EMAIL,
        "client_id":FIRE_CLIENT_ID,
        "auth_uri":FIRE_AUTH_URI,
        "token_uri":FIRE_TOKEN_URI,
        "auth_provider_x509_cert_url":FIRE_AUTH_PROVIDER,
        "client_x509_cert_url":FIRE_CLIENT_URL
    }
}
