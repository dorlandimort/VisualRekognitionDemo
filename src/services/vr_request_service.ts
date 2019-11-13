import { getConnection, getRepository, getManager, Entity } from 'typeorm';
import { VrRequest } from '../models/vr_request';
import * as moment from 'moment';

namespace VrRequestService {
  export async function createVrRequest(userId) {
    const vrRequestRepository = getRepository(VrRequest);
    return vrRequestRepository.save({
      userId: userId,
      date_requested: moment().format('YYYY-MM-DD')
    });
  }

  export async function countFromUser(userId) {
    const vrRequestRepository = getRepository(VrRequest);
    return vrRequestRepository
      .createQueryBuilder('vr_request')
      .where('vr_request.userId = :userId', { userId: userId })
      .andWhere('vr_request.date_requested = :today', {
        today: moment().format('YYYY-MM-DD')
      })
      .getCount();
  }
}

export default VrRequestService;
