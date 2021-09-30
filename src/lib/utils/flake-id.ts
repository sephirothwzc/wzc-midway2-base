import FlakeId from 'flake-idgen';
import { Provide, Init } from '@midwayjs/decorator';
import { toString } from 'lodash';
import intformat from 'biguint-format';

@Provide()
export class SnowFlake {
  private flakeIdgen: FlakeId;

  @Init()
  init() {
    const a = Number(
      process.pid.toString().substring(process.pid.toString().length - 3)
    );
    this.flakeIdgen = new FlakeId({ id: 23 + a, epoch: 1300000000000 });
  }

  /**
   * 获取id
   */
  next() {
    return toString(intformat(this.flakeIdgen.next(), 'dec'));
  }
}
