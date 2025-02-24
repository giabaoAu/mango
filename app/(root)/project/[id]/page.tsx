import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, PROJECTS_QUERY_BY_ID } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

// The pitch inside posts is in markdown format so we need to parse it as html after fetching it
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import ProjectCard, { ProjectCardType } from '@/components/ui/ProjectCard';
const md = markdownit();

// We don't wanna use SanityLive here bc we want the page data to be fetched quickly so instead we can use Partial Pre-rendering (PPR) -> staic + dynamic

export const experimental_ppr = true;

const page = async ({ params } : { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  
  // parallel fetching
  const [posts, { select: editorPosts } ] = await Promise.all([
    client.fetch(PROJECTS_QUERY_BY_ID, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'project-of-the-week' }),
  ]);
  
  const parsedContent = md.render(posts?.pitch || '');
  
  if (!posts) return notFound();
    return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <p className='tag'>{formatDate(posts?._createdAt)}</p>
            <h1 className='heading'>{ posts.title }</h1>
            <p className='sub-heading !max-w-5xl'>{posts.description}</p>
        </section>
        
        <section className='section_container'>
            <img 
                src={posts.image}
                alt="thumbnail"
                className='w-full h-auto rounded-xl'
            />

            <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                <div className='flex-between gap-5'>
                    <Link 
                        href={`/user/${posts.author?._id}`}
                        className='flex gap-2 items-center mb-3'
                    >
                        <Image
                            src={posts.author.image}
                            alt="avatar"
                            width={64}
                            height={64}
                            className='rounded-full drop-shadow-lg' 
                        />
                        <div>
                            <p className='text-20-medium'>{posts.author.name}</p>
                            <p className='text-16-medium'>@{posts.author.username}</p>
                        </div>
                    </Link>

                    <p className='category-tag'>{posts.category}</p>
                </div>

                <h3 className='text-30-bold'>Project Details</h3>
                { parsedContent ? (
                    <article 
                        className='prose max-w-4xl font-work-sans break-all'
                        dangerouslySetInnerHTML={{ __html: parsedContent}}      // We need to tell React this is safe
                    />
                ) : (
                    <p className='no-result'>
                        No content found
                    </p>
                )}
            </div>

            <hr className='divider'/>

            { editorPosts?.length > 0 && (
                <div className='max-w-4xl mx-auto'>
                    <p className='text-30-semibold'>Editor Picks</p>
                    <ul className='mt-7 card_grid-sm'>
                        { editorPosts.map((post: ProjectCardType, index : number) => (
                            <ProjectCard key={index} post={post} />    
                    ))}
                    </ul>
                </div>
            )}

            <Suspense fallback={<Skeleton className='view_skeleton' />}>
                <View id={id}/>
            </Suspense>
        </section>
    </>
  )
}

export default page