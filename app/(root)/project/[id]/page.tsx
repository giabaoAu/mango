import { client } from '@/sanity/lib/client';
import { PROJECTS_QUERY, PROJECTS_QUERY_BY_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'

// We don't wanna use SanityLive here bc we want the page data to be fetched quickly so instead we can use Partial Pre-rendering (PPR) -> staic + dynamic

export const experimental_ppr = true;

const page = async ({ params } : { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const posts = await client.fetch(PROJECTS_QUERY_BY_ID, { id });

  if (!posts) return notFound();
    return (
    <>
        <h1>
            { posts.title }
        </h1>
    </>
  )
}

export default page