'use server'

import { StreamClient } from '@stream-io/node-sdk'
import { currentUser } from '@clerk/nextjs/server'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.NEXT_PUBLIC_STREAM_API_SECRET

export const tokenProvider = async () => {
  const user = await currentUser()
  if (!user) throw new Error('User not found')
  if (!apiKey || !apiSecret) throw new Error('Stream API credentials missing')

  const client = new StreamClient(apiKey, apiSecret)

  const exp = Math.round(Date.now() / 1000) + 60 * 60
  const issued = Math.round(Date.now() / 1000) - 60

  return client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: exp,
    issued_at: issued,
  })
}
