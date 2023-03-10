import Posts from "../components/Posts"
import { useGetPosts } from "../hooks/useGetPosts"
import {useEffect} from 'react'

export default function Page(){
  const {posts, getPosts} = useGetPosts()

  useEffect(() => {
    getPosts()
  },[])

  return (
    <Posts posts={posts}/>
  )
}