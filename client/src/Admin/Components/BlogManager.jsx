import React, { useState, useEffect, useContext} from 'react';
import BlogForm from './BlogComponents/BlogForm';
import BlogTable from './BlogComponents/BlogTable';
import ApiContext from '../../context/ApiContext';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useContext(ApiContext);
  const [isTableView, setIsTableView] = useState(true);

  // Fetch blog data when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('//localhost:8000/blog/getBlog', {
          method: 'POST', // Use POST instead of GET
          headers: {
            'Content-Type': 'application/json', // Specify content type
          },
          body: JSON.stringify({}), // Send an empty body or required parameters
        });

        const result = await response.json(); 
        if (result.success) {
          setBlogs(result.data); // Set blog data
        } else {
          setError(result.message); // Handle API error
        }
      } catch (err) {
        setError('Failed to fetch blogs. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlogs(); // Call the fetch function
  }, []);



  // Show loading or error message
  if (loading) {
    return <div>Loading blogs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const updateBlogs = (newBlog) => {
    // Add the new blog to the existing blogs array
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Manager</h1>

      {/* Toggle Button (Add New Blog / Go to Table) */}
      <div className="mb-4">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="bg-DGXblue text-white px-4 py-2 rounded-lg"
        >
          {isTableView ? 'Add New Blog' : 'Go to Table'}
        </button>
      </div>

      {/* Conditional Rendering */}
      {isTableView ? (
        <BlogTable blogs={blogs} />
      ) : (
        <BlogForm updateBlogs={updateBlogs} setIsTableView={setIsTableView} />
      )}
    </div>
  );
};

export default BlogManager;
