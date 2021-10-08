/**
 * 这里加入这段是因为 egg 默认的安全策略，在 post 请求的时候如果不传递 token 会返回 403
 * 由于大部分新手用户不太了解这个机制，所以在本地和单测环境做了默认处理
 * 请注意，线上环境依旧会有该错误，需要手动开启
 * 如果想了解更多细节，请访问 https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范
 */
export const security = {
  csrf: false,
};

export const sequelize = {
  options: {
    port: 53306,
    host: 'rm-8vb5a7c204kxc3g93wo.mysql.zhangbei.rds.aliyuncs.com',
    database: 'member_dev',
    username: 'root_develop',
    password: 'eegDed-gbdacu3-ntuplw',
    encrypt: false,
    dialect: 'mysql',
    define: {
      timestamps: true,
      paranoid: true,
      charset: 'utf8',
      underscored: true,
    },
    timezone: '+08:00',
    logging: console.log,
  },
  sync: false, // 本地的时候，可以通过sync: true直接createTable
};
