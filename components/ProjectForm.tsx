'use client'
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const ProjectForm = () => {
  
  // Record used for letting ts knows errors is an object with string keys
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            link: formData.get('link') as string,
            pitch,
        }

        await formSchema.parseAsync(formValues);
    
        const result = await createPitch(prevState, formData, pitch);

        if (result.status == 'SUCCESS'){
            toast('Success', {
                description: 'Your pitch has been submitted sucessfully!',
            })

            router.push(`/project/${result._id}`)
        }

        return result;
    } catch (error) {
        
        // z error
        if(error instanceof z.ZodError){
            const fieldError = error.flatten().fieldErrors;
            setErrors(fieldError as unknown as Record<string, string>);

            toast('Error', {
                description: 'Please check your input!',
            }) 

            return { ...prevState, error: 'Validation Failed', status:'ERROR' };
        }

        
        toast('Error', {
            description: 'Please check your input!',
        }) 

        // other types of error (caching)
        return {
            ...prevState,
            error: 'An expected error has occured!',
            status: 'ERROR'
        }
    }
  }
  
  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });
  
    return (
    <form action={ formAction } className='startup-form'>
        
        {/* title */}
        <div>
            <label htmlFor='title' className='startup-form_label'>Title</label>
            <Input 
                id="title"
                name="title"
                className='startup-form_input'
                placeholder='Project Title'
                required
            />

            { errors.title && 
                <p className='startup-form_error'>
                    {errors.title}
                </p> 
            }
        </div>
        
        {/* description */}
        <div>
            <label htmlFor='description' className='startup-form_label'>Description</label>
            <Textarea 
                id="description"
                name="description"
                className='startup-form_textarea'
                placeholder='Project Description'
                required
            />

            { errors.description &&   
                <p className='startup-form_error'>
                    {errors.description}
                </p> 
            }
        </div>
        
        {/* category */}
        <div>
            <label htmlFor='category' className='startup-form_label'>Category</label>
            <Input 
                id="category"
                name="category"
                className='startup-form_input'
                placeholder='Project Category (Tech, Lifestyle, etc)'
                required
            />

            { errors.category && 
                <p className='startup-form_error'>
                    {errors.category}
                </p> 
            }
        </div>
        
        {/* Link */}
        <div>
            <label htmlFor='link' className='startup-form_label'>Image URL</label>
            <Input 
                id="link"
                name="link"
                className='startup-form_input'
                placeholder='Insert Image URL'
                required
            />

            { errors.link && 
                <p className='startup-form_error'>
                    {errors.link}
                </p> 
            }
        </div>

        {/* Pitch */}
        <div data-color-mode='light'>
            <label htmlFor='pitch' className='startup-form_label'>Pitch Details</label>
            
            <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id="pitch"
                height={600}
                preview='edit'
                style={{ borderRadius: 20, overflow: "hidden" }}
                textareaProps={{
                    placeholder: 'Briefly describe your project - What problem does it solve? ',
                }}
                previewOptions={{
                    disallowedElements: ["style"],
                }}
            />

            { errors.pitch && 
                <p className='startup-form_error'>
                    {errors.pitch}
                </p> 
            }
        </div>

        {/* No submit if empty |  */}
        <Button 
            type='submit' 
            className='startup-form_btn text-white'
            disabled={isPending}
        >
            { isPending ? "Sending your pitch to live! " : "Submit Pitch" }
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default ProjectForm