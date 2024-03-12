export interface IEnv {
  MONGODB_URI: string
  MONGODB_DB_NAME: string
  MONGODB_DB_USER: string
  MONGODB_DB_PASS: string
  UPLOAD_FOLDER_PATH: string
  API_PREFIX: string
  API_SWAGGER_URL: string
  API_PORT: string
  JWT_SECRET_KEY: string
  JWT_EXPIRES_IN: string
}
