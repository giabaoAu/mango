import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const NavBar = async () => {
  
  const session = await auth()
    return (
    <header className='px-5 py-1 bg-white shadow-sm font-work-sans'> 
        <nav className='flex justify-between items-center'>
            <Link href='/'>
                <Image src='/logo.png' alt='logo' width={144} height={30} />
            </Link>

            <div className='flex items-center gap-5 text-black'>
                { session && session?.user ? (
                    <>
                        <Link href="/project/create">
                            <span className='max-sm:hidden '>Create Project</span>
                            <BadgePlus className='size-6 sm:hidden text-green-500'/>
                        </Link>

                        <form action={async () => {
                            "use server";
                            await signOut( { redirectTo:"/" } );
                        }}>
                            <button type="submit">
                                <span className='max-sm:hidden '>Sign Out</span>
                                <LogOut className='size-6 sm:hidden text-green-500'/>
                            </button>
                        </form>

                        <Link href={`/user/${session?.id}`}>
                            <Avatar className='size-10'>
                                <AvatarImage 
                                  src={session?.user?.image || ''}
                                  alt={session?.user?.name || ''}
                                />

                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        </Link>
                    </>
                ) : (
                    <form action={ async ()=> {
                        "use server";
                        await signIn('github')
                    }}>
                        <button type="submit">
                            Sign In
                        </button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default NavBar