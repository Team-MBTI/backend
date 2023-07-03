import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { UserEntity } from '../core/user/infrastructure/entity/user.entity';
import { SessionEntity } from '../core/auth/infrastructure/data.access/entity/session.entity';
import { QuestionEntity } from '../core/test/infrastructure/entity/question.entity';
import { TestEntity } from '../core/test/infrastructure/entity/test.entity';
import { TestResultEntity } from '../core/test.result/infrastructure/entity/test.result.entity';
import { DestinationEntity } from '../core/test.result/infrastructure/entity/destination.entity';

export const mysqlProvider = {
  inject: [databaseConfig.KEY],
  provide: 'DATA_SOURCE',
  useFactory: async (config: ConfigType<typeof databaseConfig>) => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.db,
      entities: [
        UserEntity,
        SessionEntity,
        QuestionEntity,
        TestEntity,
        TestResultEntity,
        DestinationEntity,
      ],
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      synchronize: config.database.synchronize,
    });
    await dataSource.initialize();
    return addTransactionalDataSource(dataSource);
  },
};
