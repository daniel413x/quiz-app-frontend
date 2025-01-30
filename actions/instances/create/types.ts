import { z } from 'zod';
import { ActionState } from '@/actions/utils/create-validated-action';
import { QuizInstance } from '@/lib/data/types';
import CreateInstanceSchema from './schema';

export type CreateInstanceInputType = z.infer<typeof CreateInstanceSchema>;
export type CreateInstanceReturnType = ActionState<CreateInstanceInputType, QuizInstance>;
