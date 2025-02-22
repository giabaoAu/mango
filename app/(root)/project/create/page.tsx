import { auth } from '@/auth';
import ProjectForm from '@/components/ProjectForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  
  const session = await auth();
  if(!session){
    redirect('/');
  }
  
    return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <h1 className='heading'>Submit your project</h1>
        </section>

        <ProjectForm />
    </>
  )
}

export default page