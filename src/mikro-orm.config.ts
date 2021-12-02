import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'user',
  password: 'mysecretpassword',
  dbName: 'postgres',
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
