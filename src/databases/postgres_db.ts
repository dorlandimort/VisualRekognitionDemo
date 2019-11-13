import { createConnection } from 'typeorm';
import { postgresTables } from './postgrestables';

export const postgresDB = async () => {
  return await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'toor',
    database: 'vr_demo_test',
    ssl: true,
    entities: postgresTables,
    logging: ['query', 'error'],
    synchronize: true
  }).then(connection => {
    console.log('Database connection established');
  });
};
