import { Provide } from '@midwayjs/decorator';
import { ServiceBase } from '../lib/base/service.base';
import { IAppUserModel } from '../lib/models/app-user.model';


@Provide()
export class AppUserService extends ServiceBase {
  get Model(): any {
    return this.app-userModel;
  }
  
  @inject()
  app-userModel: IAppUserModel;
}