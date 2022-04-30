const { Schema, Types, model } = require('mongoose');
const Reaction =require('./Reaction');
const { startSession } = require('./User');
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    
    },
    username:{
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const reactionSchema = new Schema({
  reactionid: { 
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
  },
  reactionBody:{ 
      type: String, 
      required: true, 
      maxlength:280,
  },
  username: {
      type: String, 
      required: true,
  },
  createdAt:{
      type: Date,
      default: Date.now(),
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);

module.exports = reactionSchema

const Thought = model('thought', thoughtSchema);

module.exports = Thought;