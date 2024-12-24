import React, { useState, useContext } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ApiContext from '../../../context/ApiContext';
import { ToastContainer, toast } from "react-toastify";
import { compressImage } from '../../../utils/compressImage.js';
import { Navigate } from 'react-router-dom';
import BlogManager from '../BlogManager.jsx';


const BlogForm = ({ updateBlogs, setIsTableView }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [Category, setCategory]= useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [Content, setContent] = useState('');
  const [selectedImage, setImage] = useState(null);
  const { fetchData, userToken } = useContext(ApiContext);
  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState([]);
  // const navigate = useNavigate();


  const handleImageChange = async (e) => {
    console.log(e);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressedFile = await compressImage(file);
        console.log(compressedFile);

        setImage(compressedFile);
      } catch (error) {
        console.error("Error compressing the image: ", error);
        toast.error("Failed to compress image. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
      }
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8000/blog/blogpost";
    const method = "POST";  // Make sure 'method' is just a string

    const body = {
      title,
      Content,
      image: selectedImage,
      author,
      publishedDate,
    };

    console.log("ye hai body", body)
    setLoading(true);

    try {
      // Ensure method and body are passed correctly
      const response = await fetch(endpoint, {
        method: method,  // This should be a string like 'POST'
        headers: {
          "Content-Type": "application/json",
          "auth-token": userToken,
        },
        body: JSON.stringify(body), // Ensure it's a stringified JSON
      });

      const data = await response.json();  // Parse the response as JSON
      setLoading(false);

      if (!data.success) {
        toast.error(`Error: ${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const newBlog = {
          title: title,
          Content: Content,
          image: selectedImage,
          author: author,
          publishedDate: publishedDate,
        }

        updateBlogs(newBlog); // Add the new blog to the table
        toast.success("Blog Posted Successfully", {
          position: "top-center",
          autoClose: 3000,
          theme: "light",
        });
       
        setTitle("");
        setAuthor("");
        setPublishedDate("");
        setContent("");
        setImage(null);
        setTimeout(() => {
          // setIsTableView(true);
          <Navigate to="/blog-manager" replace />;
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong, please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
    }
  };



  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-4 bg-white p-6 rounded shadow border-2">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title">Blog Title</label>
        <input
          type="text"
          // id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-DGXblack"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="author">Author</label>
        <input
          type="text"
          // id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-DGXblack"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="publishedDate">Published Date</label>
        <input
          type="date"
          // id="publishedDate"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-DGXblack"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="Content">Blog Content</label>
        <ReactQuill
          // value={content}
          onChange={(value) => setContent(value)}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          className="border rounded w-full focus:outline-none focus:ring focus:ring-DGXblack"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="category">Category</label>
        <select
          id="Category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-DGXblack"
          required
        >
          <option value="">Select Category</option>
          <option value="All">All</option>
          <option value="Collaboration in Technology">Collaboration in Technology</option>
          <option value="Fintech">Fintech</option>
          <option value="Startups">Startups</option>
          <option value="AI">AI</option>
          <option value="Security">Security</option>
          <option value="Enterprise">Enterprise</option>
          <option value="Growth">Growth</option>
          <option value="Apps">Apps</option>
          <option value="Work">Work</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Tech">Tech</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-DGXblack"

        />
        {selectedImage && (
          <div className="mt-2">
            <img src={selectedImage} alt="Selected" className="max-h-40" />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-DGXblue text-white py-2 rounded hover:bg-DGXblack-dark focus:outline-none focus:ring focus:ring-DGXblack"
      >
        Submit
      </button>
    </form>

  );
};

export default BlogForm;
