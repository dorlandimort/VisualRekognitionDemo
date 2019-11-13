import VrRequestService from '../services/vr_request_service';

async function LimitRequest(ctx, next) {
  const currentUser = ctx.currentUser;
  const requestsCount = await VrRequestService.countFromUser(currentUser.id);
  if (requestsCount >= currentUser.allowed_requests_per_day) {
    ctx.status = 401;
    ctx.body = 'Max requests per day reached';
  } else await next();
}

export default LimitRequest;
