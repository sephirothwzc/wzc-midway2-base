import { Provide } from '@midwayjs/decorator';
import ServiceGenericBase from '../lib/base/service-generic.base';
import { AppUserEntity } from '../lib/model/app-user.entity';

@Provide()
export class AppUserService extends ServiceGenericBase<AppUserEntity> {
  get Entity() {
    return AppUserEntity;
  }
}
