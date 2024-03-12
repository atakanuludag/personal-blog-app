import { randomBytes, scrypt } from 'crypto'

export class PasswordHelper {
  constructor() {}

  public async passwordHash(password: string): Promise<string> {
    return new Promise((resolve) => {
      const salt = randomBytes(16).toString('hex')
      scrypt(password, salt, 64, (err, derivedKey) => {
        const hash = salt + ':' + derivedKey.toString('hex')
        resolve(hash)
      })
    })
  }

  public async verifyPasswordHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':')
      scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        if (key == derivedKey.toString('hex')) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}
