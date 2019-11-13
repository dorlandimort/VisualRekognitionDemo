async function ValidateVrParams(ctx, next) {
  if (ctx.request.files.image) {
    await next();
  } else {
    console.log('no hubo problemas on vr params');
    ctx.status = 400;
    ctx.body = 'No image param provided';
  }
}

export default ValidateVrParams;
