import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterServiceReq {
  name: string
  email: string
  password: string
}

interface RegisterServiceRes {
  user: User
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {
    //
  }

  async execute(body: RegisterServiceReq): Promise<RegisterServiceRes> {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      body.email,
    )

    if (userEmailAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(body.password, 6)

    const user = await this.usersRepository.create({
      name: body.name,
      email: body.email,
      password_hash,
    })

    return { user }
  }
}
