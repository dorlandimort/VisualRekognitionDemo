import * as jwt from 'jsonwebtoken';

namespace JWTService {
  export function sign(payload) {
    return jwt.sign(payload, process.env.VR_APP_SECRET, {
      expiresIn: '24h'
    });
  }
}

export default JWTService;
