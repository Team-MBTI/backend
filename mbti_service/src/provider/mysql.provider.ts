import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../config/database.config';

//todo : develop 과 main 에 대한 환경변수 별도로 설정
export const mysqlProvider = {
  inject: [databaseConfig.KEY],
  provide: 'DATA_SOURCE',
  useFactory: async (config: ConfigType<typeof databaseConfig>) => {
    console.log(config);
    const dataSource = new DataSource({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.db,
      entities: [__dirname + '/test/domain/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      synchronize: config.database.synchronize,
    });
    await dataSource.initialize();
    return addTransactionalDataSource(dataSource);
  },
};
