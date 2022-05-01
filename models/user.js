const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      maxlength: 12,
      minlength: 4,
    },
    lastAccessed: { type: Date, default: Date.now },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thoughts" }],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Users = model("users", userSchema);
module.exports = Users;

const handleError = (err) => console.error(err);

Users.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Users.insertMany(
      [
        {
          username: "theboss",
          thoughts: [
            "62521e72766e700455dffc2c",
            "62521e72766e700455dffc2e",
            "62521e72766e700455dffc30",
            "62521e72766e700455dffc32",
          ],
        },
        {
          username: "dbmaster",
          thoughts: ["62521e72766e700455dffc28", "62521e72766e700455dffc2a"],
        },
        {
          username: "quickfingers",
          thoughts: ["62521e72766e700455dffc26"],
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