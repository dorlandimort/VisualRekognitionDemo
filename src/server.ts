require('dotenv').config();
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as logger from 'koa-logger';
import * as koaBody from 'koa-body';
import { postgresDB } from './databases/postgres_db';
import { visualRecognitionRouter } from './routes/visual_recognition_router';
import { productsRouter } from './routes/products_router';
import categoriesRouter from './routes/categories_router';
import usersRouter from './routes/users_router';
import picturesRouter from './routes/pictures_router';
const TextRecognitionRouter = require('./routes/text_reconition_router');

const app = new Koa();
app.use(koaBody({ multipart: true }));
app.use(logger());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.use(
  cors({
    domain: '*',
    allowedMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  })
);

const bootstrap = async () => {
  await postgresDB();
  /**
   * Setup routes
   */

  app.use(
    visualRecognitionRouter.routes(),
    visualRecognitionRouter.allowedMethods()
  );
  app.use(productsRouter.routes(), productsRouter.allowedMethods());
  app.use(categoriesRouter.routes(), categoriesRouter.allowedMethods());
  app.use(usersRouter.routes(), usersRouter.allowedMethods());
  app.use(picturesRouter.routes(), picturesRouter.allowedMethods());
  app.use(
    TextRecognitionRouter.routes(),
    TextRecognitionRouter.allowedMethods()
  );

  app.listen(3000);
};
bootstrap();
