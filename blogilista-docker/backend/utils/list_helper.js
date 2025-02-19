const countBy = require("lodash/countBy");
const maxBy = require("lodash/maxBy");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((likes, blog) => {
        return likes + blog.likes
    }, 0)
    return total;
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return undefined;
    const mostLiked = blogs.reduce((mostLiked, blog) => {
        if (blog.likes > mostLiked.likes) return blog;
        return mostLiked;
    }, blogs[0])
    return mostLiked;
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined;
    const authorBlogCount = countBy(blogs, 'author');
    const maximumBlogAuthor = maxBy(Object.keys(authorBlogCount), author => authorBlogCount[author]);

    return ({
        author: maximumBlogAuthor,
        blogs: authorBlogCount[maximumBlogAuthor]
    })

}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined;
    
    const authorLikes = blogs.reduce((ac, blog) => {
        ac[blog.author] = (ac[blog.author] || 0) + blog.likes;
        return ac;

    }, {});

    const mostLiked = Object.keys(authorLikes).reduce((mostLiked, author) => {
        if (authorLikes[author] > authorLikes[mostLiked]) return author;
        return mostLiked;
    }, Object.keys(authorLikes)[0]);

    return ({
        author: mostLiked,
        likes: authorLikes[mostLiked]
    })



    

}



module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes};