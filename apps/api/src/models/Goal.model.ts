import { Schema, model, type InferSchemaType } from 'mongoose';

const quarterCheckinSchema = new Schema(
  {
    quarter: { type: String, required: true },
    achievement: { type: Schema.Types.Mixed, default: null },
    progress: { type: Number, default: 0 },
    comment: { type: String, default: '' },
    status: { type: String, enum: ['Not Started', 'On Track', 'Completed'], default: 'Not Started' },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const goalSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thrustArea: { type: String, required: true },
    uomType: { type: String, required: true, enum: ['number', 'percentage', 'currency', 'text'] },
    target: { type: Schema.Types.Mixed, required: true },
    weightage: { type: Number, required: true, min: 10 },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected', 'locked'], default: 'draft' },
    locked: { type: Boolean, default: false },
    submitted: { type: Boolean, default: false },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    managerComment: { type: String, default: '' },
    quarterData: { type: [quarterCheckinSchema], default: [] },
  },
  { timestamps: true },
);

goalSchema.index({ employeeId: 1, status: 1 });

export type GoalDocument = InferSchemaType<typeof goalSchema>;
export const GoalModel = model('Goal', goalSchema);
