import React from 'react'

const Posts = ({posts, loading, deleteHandler, postDel}) => {

   if(loading) return <h2>Loading...</h2>

   
   return (
      <ul className='list-group mb-4'>
         {
            posts && posts.length && posts.map((post, i) => {
               return (
                     <li key={i} className="list-group-item">
                        {post.title} 
                        {
                           postDel ?
                           <span className='text-danger float-end fw-bold'>deleting...</span> :
                           <span className="text-danger float-end fw-bold cursor-pointer" onClick={() => deleteHandler(post.id)}>delete</span>
                        }
                     </li>
               )
            })
         }
      </ul>
   )
}

export default Posts