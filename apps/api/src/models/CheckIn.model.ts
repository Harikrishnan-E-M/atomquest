import { Schema, model, type InferSchemaType } from 'mongoose';

const checkInSchema = new Schema(
  {
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', required: true, index: true },
    employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    quarter: { type: String, required: true, enum: ['goal-setting', 'q1', 'q2', 'q3', 'q4'] },
    achievement: { type: Number, required: true, default: 0 },
    progress: { type: Number, required: true, default: 0 },
    comment: { type: String, default: '' },
    status: { type: String, enum: ['Not Started', 'On Track', 'Completed'], default: 'Not Started' },
  },
  { timestamps: true },
);

checkInSchema.index({ goalId: 1, quarter: 1 }, { unique: true });

export type CheckInDocument = InferSchemaType<typeof checkInSchema>;
export const CheckInModel = model('CheckIn', checkInSchema);
