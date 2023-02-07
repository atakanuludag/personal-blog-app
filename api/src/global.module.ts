import { Module, Global } from '@nestjs/common'

import { QueryHelper } from '@/common/helpers/query.helper'

const globalSchema = []
const globalService = []
const globalClasses = [QueryHelper]

@Global()
@Module({
  imports: [...globalSchema],
  controllers: [],
  providers: [...globalService, ...globalClasses],
  exports: [...globalService, ...globalSchema, ...globalClasses],
})
export class GlobalModule {}
