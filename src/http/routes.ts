import { FastifyInstance } from 'fastify'
import { authenticate } from './controller/authenticate'
import { register } from './controller/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
