import dotenv from 'dotenv'

import path from 'path'

dotenv.config({path: path.join(process.cwd(), ".env")})

const config = {
    port: process.env.PORT,
    connection_str: process.env.DATABASE_URL,
    jwt_secret_str:process.env.JWT_SECRET,
    openai_api_key: process.env.OPENAI_API_KEY,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
}

export default config