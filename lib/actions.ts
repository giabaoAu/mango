'use server';

import { auth } from "@/auth";
import { parseServerAction } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from 'slugify';

// pitch is not part of FormData as it in markdown format
export const createPitch = async ( state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if(!session) return ({
        error: 'Please SignIn first!',
        status: 'ERROR'
    });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch'),
    );

    const slug = slugify(title as string, {
        lower: true, 
        strict: true,
    });

    try {
        const project = {
            title, 
            description,
            category, 
            image: link, 
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        };
      const result = await writeClient.create({ _type: 'project', ...project });
      return parseServerAction({
        ...result, 
        error: '',
        status: 'SUCCESS',
      })
    } catch (error) {
        console.log(error);
        
        return parseServerAction({
            error: JSON.stringify(error),
            status: 'ERROR'
        })
    }
}