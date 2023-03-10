import { useState } from 'react'
import { POSTS_PATH, POST_PATH } from '../constants/apiPathConstants'

type MetaDataType = {
  "parsely-title": string,
  "parsely-link": string,
  "parsely-type": string,
  "parsely-pub-date": string,
  "parsely-image-url": string,
  "parsely-author": string[],
  "parsely-section": string,
  "parsely-tags": string,
  "parsely-metadata":string,
}

type CategoryType = {
  "term_id": number,
  "name": string,
  "slug": string,
  "term_group": number,
  "term_taxonomy_id": number,
  "taxonomy": string,
  "description": string,
  "parent": number,
  "count": number,
  "filter": string,
}

export type PostType = {
  id: number,
  date: string,
  slug: string,
  type: string,
  link: string,
  title: {
      rendered: string,
  },
  excerpt: {
      rendered: string,
      protected: boolean
  },
  author: number,
  jetpack_featured_media_url: string,
  parselyMeta: MetaDataType
}

export type SinglePostType = {
  id: number,
  date: string,
  date_gmt: string,
  guid: {
      rendered: string,
  },
  modified: string,
  modified_gmt: string,
  slug: string,
  status: string,
  type: string,
  link: string,
  title: {
      rendered: string,
  },
  content: {
      rendered: string,
      protected: false
  },
  excerpt: {
      rendered: string,
      protected: false
  },
  parselyMeta: MetaDataType,
  primary_category: CategoryType 
}

export const useGetPosts = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPostsExist, setIsPostsExists] = useState(false)
  const [posts, setPosts] = useState<PostType[] | null>(null)

  // single post
  const [post, setPost] = useState<SinglePostType | null>(null)
  const [isLoadingPost, setIsLoadingPost] = useState(false)
  const [isPostExist, setIsPostExists] = useState(false)

  const getPosts = async () => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${POSTS_PATH}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
  
      const json = await res.json()
  
      if(!res.ok){
        setIsLoading(false)
        setError(json.msg)
        setIsPostsExists(false)
      }
  
      if(res.ok){

        // set into transactions state
        if(json){

          if(json.length > 0){
            setPosts(json)
            setIsPostsExists(true)
          }else{
            setIsPostsExists(false)
          }

          // loading completed
          setIsLoading(false)
        }
        
      } 
    } catch (error) {
      // show error to user
      console.log('Error while fetching Transactions')
    }

  }

  const getSinglePost = async (postId: string | undefined | string[]) => {

    if(postId && typeof postId === 'string'){
      try {

        setIsLoadingPost(true)
        setError(null)
  
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${POST_PATH.replace(":postId", postId)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
    
        const json = await res.json()
    
        if(!res.ok){
          setIsLoadingPost(false)
          setError(json.msg)
          setIsPostExists(false)
        }
    
        if(res.ok){
  
          // set into transactions state
          if(json){
  
            if(json && json.id){
              setPost(json)
              setIsPostExists(true)
            }else{
              setIsPostExists(false)
            }
  
            // loading completed
            setIsLoadingPost(false)
          }
          
        } 
      } catch (error) {
        // show error to user
        console.log('Error while fetching Transactions')
      }
    }



  }


  return { isLoading, isPostsExist, error, posts, getPosts, getSinglePost, post, isPostExist}
}
