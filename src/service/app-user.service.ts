import { Provide } from '@midwayjs/decorator';
import ServiceGenericBase from '../lib/base/service-generic.base';
import { AppUser } from '../lib/model/app-user.entity';

@Provide()
export class AppUserService extends ServiceGenericBase<AppUser> {
  get Entity() {
    return AppUser;
  }
}
