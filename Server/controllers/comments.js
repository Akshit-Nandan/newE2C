import Post from "../models/Post.js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).select("comments");

    if (!post)
      return res
        .status(400)
        .json({ status: "error", message: "Post does not exist." });

    const comments = await Comment.findById({ postId })
      .sort({ createdAt: -1 })
      .populate("studentId");

    if (!comments)
      return res
        .status(400)
        .json({ status: "error", message: "Comments does not exist." });

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      content: comment.content,
      postedBy: comment.commentedBy,
      picture: comment.studentId.personalDetails.picture,
      createdAt: comment.createdAt,
    }));

    res.status(200).json({ data: formattedComments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { content, username, userId, postId } = req.body;
    const post = await Post.findById(postId);

    if (!post)
      return res.status(400).json({
        status: "error",
        message: "This post doesn't exist!",
      });

    const newComment = new Comment({
      content,
      commentedBy: username,
      studentId: userId,
      postId,
    });

    await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    await newComment.save();

    const comment = await Comment.findById(newComment._id).populate(
      "studentId"
    );

    const formattedComments = {
      _id: comment._id,
      content: comment.content,
      postedBy: comment.commentedBy,
      picture: comment.studentId.personalDetails.picture,
      createdAt: comment.createdAt,
    };

    res.status(201).json({ data: formattedComments });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      $or: [{ user: req.user._id }, { postUserId: req.user._id }],
    });

    await Post.findOneAndUpdate(
      { _id: comment.postId },
      {
        $pull: { comments: req.params.id },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Comment Deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
