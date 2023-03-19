import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateservice } from '@/services/factories/make-authenticate-services'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const body = authenticateBodySchema.parse(req.body)

  try {
    const authenticateService = makeAuthenticateservice()

    await authenticateService.execute(body)
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: err.message })
    }

    throw err
  }

  return res.status(200).send()
}
