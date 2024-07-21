import Post from "../model/post.js";

export default {
  async getAll(_req, res) {
    const posts = await Post.find();
    res.status(200).json({ posts });
  },
  async getOne(req, res) {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post });
  },
  async crate(req, res) {
    const post = await Post.create(req.body);
    res.status(200).json({ post });
  },
  async update(req, res) {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ post });
  },
  async delete(req, res) {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ post });
  },
};
