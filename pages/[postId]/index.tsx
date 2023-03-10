import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGetPosts } from '../../hooks/useGetPosts'

export default function Page(){
  const router = useRouter()
  const {getSinglePost, post, isPostExist} = useGetPosts()
  const { postId } = router.query

  useEffect(() => {
    getSinglePost(postId)
  },[])

  console.log('path : ', postId)

  return (
    <>
    <div className="container mx-auto flex flex-wrap py-6">

    {
        post && (
            <>
                 <section className="w-full md:w-2/3 flex flex-col items-center px-3">

                    <article className="flex flex-col shadow my-4">
                        <div  className="hover:opacity-75 px-6">
                            <img className="object-cover" src={post.parselyMeta['parsely-image-url']} />
                        </div>
                        <div className="bg-white flex flex-col justify-start p-6">
                            <a href="#" className="text-blue-700 text-sm font-bold uppercase pb-4" dangerouslySetInnerHTML={{__html: post.primary_category.name}} />
                            <a href="#" className="text-3xl font-bold hover:text-gray-700 pb-4" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                            <p className="text-sm pb-8">
                                By <a href="#" className="font-semibold hover:text-gray-800">{post.parselyMeta['parsely-author'][0]}</a>, Published on {new Date(post.date).toDateString()}
                            </p>

                            <p className="pb-3" dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                        </div>
                    </article>

                    <div className="w-full flex pt-6">
                        <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                            <p className="text-lg text-blue-800 font-bold flex items-center"><i className="fas fa-arrow-left pr-1"></i> Previous</p>
                            <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                        </a>
                        <a href="#" className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                            <p className="text-lg text-blue-800 font-bold flex items-center justify-end">Next <i className="fas fa-arrow-right pl-1"></i></p>
                            <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                        </a>
                    </div>

                    <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                        <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                            <img src="https://source.unsplash.com/collection/1346951/150x150?sig=1" className="rounded-full shadow h-32 w-32" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center md:justify-start">
                            <p className="font-semibold text-2xl">David</p>
                            <p className="pt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel neque non libero suscipit suscipit eu eu urna.</p>
                            <div className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
                                <a className="" href="#">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a className="pl-4" href="#">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a className="pl-4" href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="pl-4" href="#">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    </section>

                    <aside className="w-full md:w-1/3 flex flex-col items-center px-3">

                    <div className="w-full bg-white shadow flex flex-col my-4 p-6">
                        <p className="text-xl font-semibold pb-5">Source from Tech Crunch</p>
                        <p className="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In hac habitasse platea dictumst.</p>
                        <a href={post.link} target={"_blank"} className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4">
                        Go to Actual Post
                        </a>
                    </div>

                    </aside>
            </>
        )
    }



</div>
</>
)
}