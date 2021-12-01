import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'user',
  password: 'password',
  dbName: 'test',
  migrations: {
    path: 'src/migrations/',
    tableName: 'migrations',
    transactional: true,
  },
  entities: ['dist/entities/*.js'],
  entitiesTs: ['src/entities/*.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
};

export default config;
