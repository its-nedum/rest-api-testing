const { create, get, getAll, update, destroy } = require('../services/post.service')

const createPost = async (req, res) => {
    const { title, content } = req.body;

    if (title && content) {
        try{
            const entries = {
                title,
                content
            };
    
            const result = await create(entries);
    
            if (!result) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Something went wrong, please try again'
                });
            }
    
            return res.status(201).json({
                status: 'success',
                message: 'Post created successfully',
                data: result
            });
        }catch(error){
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error
            });
        }
    }

    return res.status(400).json({ message: 'Bad request' });
};

const getPost = async (req, res) => {
    const { id } = req.params;

    if (id) {
        try{
            const result = await get(id);

            if (!result) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Something went wrong, please try again'
                });
            }
    
            return res.status(200).json({
                status: 'success',
                message: 'Post found',
                data: result
            });

        }catch(error){
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error
            });
        }
    }

    return res.status(400).json({ message: 'Bad request' })
};

const getAllPosts = async (req, res) => {
    try {
        const result = await getAll();

        if (!result) {
            return res.status(400).json({
                status: 'error',
                message: 'Something went wrong, please try again'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Posts found',
            data: result
        });

    }catch(error){
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error
        });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const entries = {};
    if (title) entries.title = title;
    if (content) entries.content = content;

    if (id) {
        try{
            const result = await update(id, entries);

            if (!result) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Something went wrong, please try again'
                });
            }
    
            return res.status(200).json({
                status: 'success',
                message: 'Post updated',
                data: result
            }); 
        }catch(error){
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error
            }); 
        }
    }

    return res.status(400).json({ message: 'Bad request' })
};

const destroyPost = async (req, res) => {
    const { id } = req.params;

    if (id) {
        try{
            const result = await destroy(id);

            if (result) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Unable to delete post, please try again'
                });
            }
    
            return res.status(200).json({
                status: 'success',
                message: 'Posts deleted',
                data: result
            }); 
        }catch(error){
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error
            }); 
        }
    }

    return res.status(400).json({ message: 'Bad request' })
};

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    destroyPost
}