// "use client"

import ModalBackdrop from "@/components/modal-backdrop"
import { getNewsItem } from "@/lib/news"
// import { notFound, useRouter } from "next/navigation"
import { notFound } from "next/navigation"

export default async function InterceptedImagePage({params}) {

  // const router = useRouter()

    const newsItemSlug = params.slug
    const newsItem = await getNewsItem(newsItemSlug)
    
    if(!newsItem){
      notFound()
    } 

return (
    <>
      <ModalBackdrop /> 
      {/* <div className="modal-backdrop" onClick={router.back} /> */}
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>  
    </>
  )
}
