import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
  type: 'postgresql',
  host: 'satao.db.elephantsql.com',
  port: 5432,
  user: 'biizqzfz',
  password: 'QAIrUp3nLcrc43imXAhVNKWw3YB0poed',
  dbName: 'biizqzfz',
  migrations: {
    path: 'src/migrations/',
    tableName: 'migrations',
    transactional: true,
  },
  entities: ['dist/entities/*.js'],
  entitiesTs: ['../../entities/*.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
};

export default config;
