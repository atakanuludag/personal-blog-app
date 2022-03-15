import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const IpAddress = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()
    let ip: string = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    ip = ip.toString().replace('::ffff:', '')
    if (ip === '::1' || ip === '127.0.0.1' || ip === 'localhost')
      ip = '127.0.0.1'
    return ip.trim()
  },
)
