import { envPathGenerator } from '../common/helper.function/env.path.generator';
import commonLoginConfig from '../config/common.login.config';
import databaseConfig from '../config/database.config';
import kakaoLoginConfig from '../config/kakao.login.config';

export const configModuleOptions = {
  envFilePath: [envPathGenerator()],
  load: [databaseConfig, kakaoLoginConfig, commonLoginConfig],
  isGlobal: true,
};
