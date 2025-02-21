import { defineQuery } from "next-sanity";

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