const blogRouter = require("express").Router();
const blogController = require("../controllers/blogController");

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await blogController.getAllBlogs();
        response.json(blogs);
    } catch (e) {
        next(e);
    }
  })
  
blogRouter.post('/', async (request, response, next) => {
    try {
        const blogBody = request.body;
        blogBody.user = request.user.id;
        const result = await blogController.addBlog(blogBody);
        response.status(201).json(result);
    } catch (e) {
        next(e);
    }
    
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const result = await blogController.deleteBlog(id, request.user);
        response.status(204).end();
    } catch (e) {
        next(e);
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    try {
        // I wanted to change this so that the only thing possible to do is to like, since otherwise there is obvious security flaws in the system
        //const blogBody = request.body;
        //const result = await blogController.updateBlog(blogBody);
        const id = request.params.id;
        await blogController.likeBlog(id);
        response.status(204).end();

    } catch (e) {
        next(e)
    }
})


module.exports = blogRouter;