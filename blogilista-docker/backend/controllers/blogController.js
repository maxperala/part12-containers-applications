const Blog = require("../models/blog");
const User = require("../models/user");
const {AuthenticationError} = require("../utils/appErrors");

const getAllBlogs = async () => {
    const blogs = await Blog.find({}).populate('user');
    return blogs;
}



const addBlog = async (content) => {
    const blog = new Blog(content);
    const result = await blog.save();
    const user = await User.findById(content.user);
    user.blogs = [...user.blogs, blog._id];
    
    await user.save();
    
    return result;
    
}

const deleteBlog = async (id, userObj) => {
    const result = await Blog.findById(id);
    if (result.user.toString() !== userObj.id) throw new AuthenticationError();
    const user = await User.findById(result.user.toString());
    user.blogs = user.blogs.filter((blogId) => blogId.toString() != id.toString());
    await Blog.findByIdAndDelete(id);
    await user.save();
    return result;

}

const updateBlog = async (blog) => {
    const result = await Blog.findById(blog.id, blog, {new: true, runValidators: true});
    return result;
}

const likeBlog = async (id) => {
    const blog = await Blog.findById(id);
    blog.likes = blog.likes + 1;
    await blog.save();
    return blog;
}

module.exports = {addBlog, getAllBlogs, deleteBlog, updateBlog, likeBlog};