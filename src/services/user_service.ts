import { getConnection, getRepository, getManager, Entity } from 'typeorm';
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';

namespace UserService {
  export async function authenticateUser() {}

  export async function allUsers() {
    const entityManager = getConnection().manager;
    return entityManager.find(User);
  }

  export async function createUser({
    email,
    password,
    first_name,
    last_name,
    mother_last_name = '',
    allowed_requests_per_day = 10
  }) {
    const userRepository = getRepository(User);
    let existingUser = await this.findByEmail(email);
    if (existingUser === undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return userRepository.save({
        email: email,
        password: hashedPassword,
        first_name: first_name,
        last_name: last_name,
        mother_last_name: mother_last_name,
        allowed_requests_per_day: allowed_requests_per_day
      });
    } else {
      throw `The user with email ${email} already exists`;
    }
  }

  export async function findById(id) {
    return getRepository(User).findOne(id);
  }

  export function findByEmail(email) {
    return getManager()
      .createQueryBuilder(User, 'users')
      .where('users.email = :email', { email: email })
      .getOne();
  }

  export function deleteUser(id) {
    const usersRepository = getRepository(User);
    return usersRepository.delete(id);
  }

  export async function getWithPassword(id) {
    return getManager()
      .createQueryBuilder(User, 'users')
      .select('users.password')
      .where('users.id = :id', { id: id })
      .getOne();
  }

  export async function updateRequestsLimit(id, { limit }) {
    return getRepository(User)
      .createQueryBuilder('user')
      .update()
      .set({ allowed_requests_per_day: limit })
      .where('id = :id', { id: id })
      .execute();
  }
}

export default UserService;
