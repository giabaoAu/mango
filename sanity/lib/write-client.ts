import 'server-only'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for sanity Live Content API
  token,
})

if (!writeClient.config().token) {
    throw new Error('The writeClient is not configured with a token');
}