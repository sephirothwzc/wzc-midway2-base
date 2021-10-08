import { Provide } from '@midwayjs/decorator';
import ServiceGenericBase from '../lib/base/service-generic.base';
import { AppOrderEntity } from '../lib/model/app-order.entity';

@Provide()
export class AppOrderService extends ServiceGenericBase<AppOrderEntity> {
  get Entity() {
    return AppOrderEntity;
  }
}
