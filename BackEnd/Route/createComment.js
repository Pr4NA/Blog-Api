const { Router } = require("express");
const createCommentRouter = Router();
const passport = require("../passport.config") ;
const prisma = require("../DB/db.config");

createCommentRouter.get("/:postId/createComment", (req, res) => {
  res.json({
    form: {
      title: "Create a new comment",
      fields: [
        { name: "body", type: "text", placeholder: "Enter your comment" },
      ],
    },
  });
});

createCommentRouter.post("/:postId/createComment",passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { body } = req.body;
  const { postId } = req.params;
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!body || !postId) {
    return res.status(400).json({ message: "Comment body and post ID are required." });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        body,
        user: {
          connect: { id: req.user.id },
        },
        post: {
          connect: { id: parseInt(postId, 10) },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment created successfully.",
      comment: newComment,
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = createCommentRouter;
