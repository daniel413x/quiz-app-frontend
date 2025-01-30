import { z } from 'zod';

const CreateInstanceSchema = z.object({
  id: z.string({
    required_error: 'Id is required',
    invalid_type_error: 'Id is required',
  }),
});

export default CreateInstanceSchema;
