import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// the string created by new Date() is not a valid date string
// so we need to convert it to a valid date string using the below function
export function formatDate(date:string){
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// function for json parse -> template
export function parseServerAction<T>(response: T){
  return JSON.parse(JSON.stringify(response));
}
