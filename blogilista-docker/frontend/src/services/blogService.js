import axios from "axios";

class BlogService {
  constructor(user, pseudoLiker, pseudoCreate) {
    this.user = user;
    this.config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    this.baseURL = "http://localhost:8080/api/blogs";
    if (pseudoLiker) {
      this.likeBlog = pseudoLiker;
    }
    if (pseudoCreate) {
      this.createBlog = pseudoCreate;
    }
  }

  async getBlogs() {
    try {
      const res = await axios.get(this.baseURL, this.config);
      return res.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  async createBlog(blog) {
    try {
      const res = await axios.post(this.baseURL, blog, this.config);
      return res.data;
    } catch (e) {
      console.log(e);
      return {
        error: "Creating the blog failed",
      };
    }
  }
  // I changed this a little bit, since if there is only the option to like it makes no sense
  // to post the full object, also patched backend so that it can only like...
  // PUT is maybe not the right protocol now but I leave it as is if in the future
  // we implement a secure way to update blogs
  async likeBlog(blog) {
    try {
      const res = await axios.put(
        `${this.baseURL}/${blog.id}`,
        {},
        this.config
      );
      return res.data;
    } catch (e) {
      console.log(e);
      return {
        error: "Liking blog failed",
      };
    }
  }

  async removeBlog(id) {
    try {
      const res = await axios.delete(`${this.baseURL}/${id}`, this.config);
      return res.data;
    } catch (e) {
      console.log(e);
      return {
        error: "Error deleting blog",
      };
    }
  }
}

export default BlogService;
