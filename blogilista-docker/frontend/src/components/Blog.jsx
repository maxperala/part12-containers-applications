import { useState } from "react"
import PropTypes from "prop-types";
import BlogService from "../services/blogService";

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const Blog = ({blog, bs, showNotification, updateBlogs, index}) => {

    const [visible, setVisible] = useState(false);
    const likeBlog = async () => {
        const resp = await bs.likeBlog(blog);
        if (resp.error) {
            showNotification(resp.error);
            return;
        }
        await updateBlogs();

    }

    const deleteBlog = async () => {
        if (!window.confirm(`Remove ${blog.title} by ${blog.author ? blog.author : "Unknown Author"}`)) return;
        const resp = await bs.removeBlog(blog.id);
        if (resp.error) {
            showNotification(resp.error);
            return;
        }
        await updateBlogs();
        showNotification("Blog removed");
    }

    if (visible) {
        return (
            <div style={blogStyle} id={`blog-div-${index}`}>
                
                <p>{blog.title} by {blog.author ? blog.author : "Unknown Author" }</p>
                
                <p>{blog.url}</p>
                
                <div id={`like-div-${index}`}>
                    likes: {blog.likes} <button id={`likebtn-${index}`} onClick={likeBlog}>like</button>
                </div>
                <p>Submitted by: {blog.user.name}</p>
                {bs.user.id === blog.user.id ? <button onClick={deleteBlog} id={`delete-btn-${index}`}>Delete</button> : null}
                <button onClick={() => setVisible(false)}>hide</button>
            </div>
        )
    }
    
    return (
        <div style={blogStyle}>
            <p>{blog.title} by {blog.author ? blog.author : "Unknown Author"}</p>
            <button onClick={() => setVisible(true)} id={`show-btn-${index}`}>view</button>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    bs: PropTypes.instanceOf(BlogService).isRequired,
    showNotification: PropTypes.func.isRequired,
    updateBlogs: PropTypes.func.isRequired
}




export default Blog;