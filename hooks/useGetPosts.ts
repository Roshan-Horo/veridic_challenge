import { useState } from 'react'
import { POSTS_PATH, POST_PATH } from '../constants/apiPathConstants'

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
  parselyMeta: {
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
}

export const useGetPosts = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPostsExist, setIsPostsExists] = useState(false)
  const [posts, setPosts] = useState<PostType[] | null>(null)
  const [post, setPost] = useState(null)

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

  const getSinglePost = async (postId: number) => {

    try {

      setIsLoading(true)
      setError(null)

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}${POST_PATH.replace("postId", postId.toString())}`, {
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


  return { isLoading, isPostsExist, error, posts, getPosts, getSinglePost}
}
