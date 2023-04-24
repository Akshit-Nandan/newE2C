import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { content, postedBy } = req.body;
    const newPost = new Post({
      content,
      postedBy,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();
    res.status(201).json({
      status: "success",
      data: post,
      message: "Post created!",
    });
  } catch (error) {
    res.status(409).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
        status: "error",
        message: error.message,
      });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ postedBy: userId }).sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
        status: "error",
        message: error.message,
      });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) post.likes.delete(userId);
    else post.likes.set(userId, true);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({
        status: "error",
        message: error.message,
      });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(id, { content }, { new: true });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
        status: "error",
        message: error.message,
      });
  }
};
