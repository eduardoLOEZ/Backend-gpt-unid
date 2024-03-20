import mongoose from 'mongoose';

const UserResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  responses: [{ type: String }]
});

const UserResponse = mongoose.model('UserResponse', UserResponseSchema);

export default UserResponse;
