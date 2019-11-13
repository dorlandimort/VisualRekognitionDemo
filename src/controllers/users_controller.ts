import { BaseContext } from 'koa';
import UserService from '../services/user_service';
import * as bcrypt from 'bcrypt';
import JWTService from '../services/jwt_service';

namespace UsersController {
  export async function authenticate(ctx: BaseContext) {
    let user = await UserService.findByEmail(ctx.request.body.email);
    if (user !== undefined) {
      let { password } = await UserService.getWithPassword(user.id);
      let validPassword = await bcrypt.compare(
        ctx.request.body.password,
        password
      );

      if (validPassword) {
        let payload = { email: user.email, id: user.id };
        ctx.body = {
          token: JWTService.sign(payload)
        };
        return;
      }
    }
    ctx.status = 401;
    ctx.body = 'Invalid authentication data';
  }

  export async function index(ctx: BaseContext) {
    ctx.body = await UserService.allUsers();
  }

  export async function create(ctx: BaseContext) {
    try {
      ctx.body = await UserService.createUser(ctx.request.body);
    } catch (error) {
      ctx.status = 403;
      ctx.body = error;
    } finally {
    }
  }

  export async function show(ctx: BaseContext) {
    ctx.body = await UserService.findById(ctx.params.id);
  }

  export async function destroy(ctx: BaseContext) {
    ctx.body = await UserService.deleteUser(ctx.params.id);
  }

  export async function updateRequestsLimit(ctx: BaseContext) {
    await UserService.updateRequestsLimit(ctx.params.id, ctx.request.body);
    ctx.body = 'Limit updated successfully';
  }
}

export default UsersController;
