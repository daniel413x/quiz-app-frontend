import { z } from 'zod';
import { ActionState } from '@/actions/utils';
import { UserAnswer } from '@/lib/data/types';
import CreateUserAnswerSchema from './schema';

export type CreateUserAnswerInputType = z.infer<typeof CreateUserAnswerSchema>;
export type CreateUserAnswerReturnType = ActionState<CreateUserAnswerInputType, UserAnswer>;
