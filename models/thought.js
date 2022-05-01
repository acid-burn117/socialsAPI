const { Schema, Types, model } = require("mongoose");

const thoughtsSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 4,
    },
    createdAt: { type: Date, default: Date.now },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reactions" }],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;

const handleError = (err) => console.error(err);

Thoughts.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thoughts.insertMany(
      [
        {
          thoughtText: "This application is horrible!",
          reactions: [
            "62522e8eed7fda4f2d05fdf4",
            "62522e8eed7fda4f2d05fdf6",
            "62522e8eed7fda4f2d05fdf8",
          ],
        },
        {
          thoughtText: "why is the cake so dry",
          reactions: ["62522e8eed7fda4f2d05fdfa"],
        },
        { thoughtText: "I've had better lamb off a NYC street truck" },
        {
          thoughtText: "Does anyone have hope for the Mets?",
          reactions: ["62522e8eed7fda4f2d05fdfe"],
        },
        { thoughtText: "Why do the Knicks always do this to me" },
        {
          thoughtText: "Truth is steelers have been just as bad as the Cowboys lately",
          reactions: ["62522e8eed7fda4f2d05fdfc"],
        },
        {
          thoughtText:
            "I love writing things here",
        },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});