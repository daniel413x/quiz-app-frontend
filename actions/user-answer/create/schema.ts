import { z } from 'zod';

const CreateBoardSchema = z.object({
  answerId: z.string({
    required_error: 'answerId is required',
    invalid_type_error: 'answerId is required',
  }),
});

export default CreateBoardSchema;
