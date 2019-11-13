import * as jwt from 'jsonwebtoken';
import UserService from '../services/user_service';

async function JWTAuthorize(ctx, next) {
  const token = ctx.get('authorization');
  if (token !== '') {
    try {
      let payload = jwt.verify(token, process.env.VR_APP_SECRET);
      let currentUser = await UserService.findById(payload.id);
      if (currentUser !== undefined) {
        ctx.currentUser = currentUser;
        await next();
      } else {
        ctx.status = 401;
        ctx.body = 'Invalid user';
      }
    } catch (error) {
      ctx.status = 401;
      ctx.body = 'Invalid token';
    }
  } else {
    ctx.status = 401;
    ctx.body = 'No token provided';
  }
}

export default JWTAuthorize;
