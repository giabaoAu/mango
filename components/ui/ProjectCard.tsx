import { cn, formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'
import { Author, Project } from '@/sanity/types'
import { Skeleton } from './skeleton'

export type ProjectCardType = Omit<Project, "author"> & { author?: Author }

const ProjectCard = ({ post } : { post:ProjectCardType }) => {
  // Destructure the post object for esaier access
  const { _createdAt, views, author, title, category, _id, image, description } = post;

  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_dates'>
                { formatDate(_createdAt) } 
            </p>

            <div className='flex gap-1.5'>
              <EyeIcon className='size-6 text-primary'/>
                <span className='text-16-medium'>{ views }</span>
            </div>
        </div>

        <div className='flex-between mt-5 gap-5'>
          <div className='flex-1'>
            <Link href={`/user/${author?._id}`}>
              <p className='text-16-medium line-clamp-1'>
                {author?.username}
              </p>
            </Link>
            <Link href={`/project/${_id}`}>
              <p className='text-26-semibold line-clamp-1'>
                {title}
              </p>
            </Link>
          </div>

          <Link href={`/user/${author?._id}`}>
              <Image src={author?.image!} alt={author?.name!} width={48} height={48} className='rounded-full'/>
          </Link>
        </div>

        <Link href={`/project/${_id}`}>
          <p className='startup-card_desc'>
            {description}
          </p>

          <img src={image} alt="project image" className='startup-card_img' />
        </Link>

        <div className='flex-between mt-5 gap-3'>
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className='text-16-medium'>{ category }</p>
          </Link>

          <Button className="startup-card_btn" asChild>
            <Link href={`/project/${_id}`}>Details</Link>
          </Button>
        </div>
    </li>
  )
}

export const ProjectCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)}>
        <Skeleton 
          className='startup-card_skeleton'
        />
      </li>
    ))}
  
  </>
);

export default ProjectCard