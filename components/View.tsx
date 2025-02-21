import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { PROJECTS_QUERY_VIEW } from '@/sanity/lib/queries'

// TODO: Increase view whenever someone visits the project page
const View = async ({ id } : { id: string }) => {
    // useCdn: false -> fetch the data from the server dynamically (sanity live api)
    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(PROJECTS_QUERY_VIEW, { id })

    return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>

        <p className='view-text'>
            <span className='font-black'>{ totalViews } view(s)</span>
        </p>
    </div>
  )
}

export default View