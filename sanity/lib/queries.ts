import { defineQuery } from "next-sanity";

// All projects
export const PROJECTS_QUERY = defineQuery(`*[_type=="project" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  image,
  pitch
}`)

// Projects of that user
export const PROJECTS_BY_AUTHOR_QUERY = defineQuery(`*[_type=="project" && author._ref == $id] | order(_createdAt desc){
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  image,
  pitch
}`)

// [0] is used to get the matching project with the given id
export const PROJECTS_QUERY_BY_ID = defineQuery(`*[_type=="project" && _id == $id][0]{
    _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
  views,
  description,
  category,
  image,
  pitch
}`)

export const PROJECTS_QUERY_VIEW = defineQuery(`
  *[_type=="project" && _id == $id][0]{
    _id, views
  }`)

// id = github_id
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type=="author" && id ==  $id ][0]{
  _id,
  id,
  name,
  username,
  bio,
  email,
  image  
}`)

// id = user._id
export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type=="author" && _id ==  $id ][0]{
  _id,
  id,
  name,
  username,
  bio,
  email,
  image  
}`)