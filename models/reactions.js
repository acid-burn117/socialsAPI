const { Schema, Types, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionText: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 4,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reactions = model("reactions", reactionSchema);

module.exports = Reactions;

const handleError = (err) => console.error(err);

Reactions.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Reactions.insertMany(
      [
        { reactionText: "Agreed!" },
        { reactionText: "Cheers to that!" },
        { reactionText: "100%" },
        { reactionText: "Yes!" },
        { reactionText: "Why?" },
        { reactionText: "Uh huh..." },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});