import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import Pagination from './components/Pagination';
import Posts from './components/Posts';

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ postDel, setPostDel ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const {data: {posts} } = await axios.get('https://dummyjson.com/posts?limit=150&skip=0');
      setPosts(posts)
      setLoading(false);
    }
    fetchPosts();
  },[])

    //* Get current posts 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //* Change page
  const paginate = (number) => setCurrentPage(number)

  //* Delete post 
  const deleteHandler = async(id) => {
    setPostDel(true);
    const res = await axios.delete(`https://dummyjson.com/posts/${id}`, {
      method: 'DELETE',
    })
    // Deleting a post will not delete it into the server.
  //  It will simulate a DELETE request and will return deleted post with "isDeleted" & "deletedOn" keys
    setPosts(posts.filter( post =>  post.id !== id));
    setPostDel(false)
  }


  return (
    <div className="container mt-5 text-center">
      <h1 className="text-primary mb-4 fw-bold"> My Blog </h1>
      <Posts posts={ currentPosts } loading={ loading } deleteHandler={deleteHandler} postDel={postDel}/>
      <Pagination 
        postsPerPage={ postsPerPage } 
        totalPosts={ posts.length } 
        paginate={paginate}
      /> 
    </div>
  )
}

export default App
