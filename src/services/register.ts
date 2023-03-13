import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) { }

  async execute(body: RegisterServiceRequest) {
    const userEmailAlreadyExists = await this.usersRepository.findByEmail(
      body.email,
    )

    if (userEmailAlreadyExists) {
      throw new Error('E-mail already exists.')
    }

    const password_hash = await hash(body.password, 6)

    await this.usersRepository.create({
      name: body.name,
      email: body.email,
      password_hash,
    })
  }
}
