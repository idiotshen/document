import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/idiot',
    options: {}
  }

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608213886879_4021';

  // add your egg config in here
  config.middleware = ['errorHandler', 'auth'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.jwt = {
    secret: "123456",
  }

  config.auth = {
    ignore: '/auth'
  }

  config.crypto = {
		secret: 'Z#fOGf$te4^J28l1Z&$#fXCNifv!ZHQnEG'
	};

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
