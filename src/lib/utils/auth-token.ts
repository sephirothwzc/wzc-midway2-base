import { Context } from 'egg';
import { Provide, Inject, Plugin, Config } from '@midwayjs/decorator';
import { promisify } from 'util';
import { toNumber, toString } from 'lodash';

/**
 * 登陆用户
 */
export interface IAuth {
  id: string;
  // type: string;
  /**
   * 用户名
   */
  userName?: string;
  /**
   * 用户昵称
   */
  nickName?: string;
  phone?: string;
  /**
   * 过期时间
   */
  exp?: number; // 60 s
  /**
   * token
   */
  token?: string;
}

export interface AuthSign {
  id: string;
  userName?: string;
  nickName?: string;
  openid?: string;
  phone?: string;
  exp?: number | string;
}

@Provide()
export class AuthToken {
  @Inject()
  private ctx: Context;

  @Plugin()
  private jwt: any;

  @Config('jwt')
  private configJwt: any;

  private auth: IAuth;

  get Auth() {
    return this.auth;
  }

  /**
   * 下发令牌
   * @param param
   */
  async sign(param: AuthSign, options?: { expiresIn?: any }) {
    if (!options?.expiresIn && !param?.exp) {
      param.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
    }
    return this.jwt.sign(param, this.configJwt.secret, options) as string;
  }

  /**
   * token校验
   */
  async signToken() {
    const { token } = this.ctx.request.header;
    if (!token) {
      return this.ctx.throw(401, '请登陆后操作');
    }
    this.auth = await this.signByToken(toString(token));
    return this.auth;
  }

  /**
   * 校验获取数据
   * @param token
   */
  private async signByToken(token: string): Promise<IAuth> {
    const jwtVerify = promisify(this.jwt.verify);
    return await jwtVerify(token, this.configJwt.secret)
      .then(async (decoded: AuthSign) => {
        const auth = await this.ctx.requestContext.getAsync<IAuth>('Auth');
        auth.token = token;
        auth.id = decoded.id;
        auth.nickName = decoded.nickName;
        auth.phone = decoded.phone;
        auth.userName = decoded.userName;
        auth.exp = toNumber(decoded.exp);
        return auth;
      })
      .catch(() => {
        return this.ctx.throw(403, '非法用户');
      });
  }
}
