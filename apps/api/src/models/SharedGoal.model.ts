import { Schema, model, type InferSchemaType } from 'mongoose';

const sharedGoalSchema = new Schema(
  {
    primaryOwner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', required: true, index: true },
    linkedEmployees: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    syncEnabled: { type: Boolean, default: true },
    title: { type: String, required: true },
    target: { type: Schema.Types.Mixed, required: true },
    weightage: { type: Number, required: true, min: 10 },
  },
  { timestamps: true },
);

export type SharedGoalDocument = InferSchemaType<typeof sharedGoalSchema>;
export const SharedGoalModel = model('SharedGoal', sharedGoalSchema);
