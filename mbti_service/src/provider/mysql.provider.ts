import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';

//todo : develop 과 main 에 대한 환경변수 별도로 설정
export const mysqlProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'MBTI_develop',
      entities: [],
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
      synchronize: true,
    });
    await dataSource.initialize();
    return addTransactionalDataSource(dataSource);
  },
};
