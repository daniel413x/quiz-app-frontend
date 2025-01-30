'use server';

import { revalidatePath } from 'next/cache';
import { QUIZ_INSTANCE_ROUTE } from '@/lib/data/routes';
import { createValidatedAction } from '@/actions/utils/create-validated-action';
import { v4 as uuid } from 'uuid';
import { CreateInstanceInputType } from './types';
import CreateInstanceSchema from './schema';

const handler = async (data: CreateInstanceInputType) => {
  console.log('www');
  const { id } = data;
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  console.log(id);
  let instance;
  // try {
  //   const id = uuid();
  //   const transaction: PrismaPromise<any>[] = [
  //     prismadb.Instance.create({
  //       data: {
  //         id,
  //         orgId,
  //         title,
  //         imageId,
  //         imageThumbUrl,
  //         imageFullUrl,
  //         imageLinkHTML,
  //         imageUserName,
  //       },
  //     }),
  //     createAuditLog(
  //       id,
  //       ENTITY_TYPE.Instance,
  //       title,
  //       ACTION.CREATE,
  //       orgId!,
  //       user!,
  //     ),
  //   ];
  //   // handle free user restriction counting
  //   if (!isPro) {
  //     const orgLimit = await prismadb.orgLimit.findUnique({
  //       where: {
  //         orgId,
  //       },
  //     });
  //     if (orgLimit) {
  //       transaction.push(prismadb.orgLimit.update({
  //         where: { orgId },
  //         data: { count: orgLimit.count + 1 },
  //       }));
  //     } else {
  //       transaction.push(prismadb.orgLimit.create({
  //         data: { orgId, count: 1 },
  //       }));
  //     }
  //   }
  //   Instance = (await prismadb.$transaction(transaction))[0];
  // } catch (e: any) {
  //   return {
  //     error: 'Could not create',
  //   };
  // }
  // revalidatePath(`/${QUIZ_INSTANCE_ROUTE}/${Instance.id}`);
  return { data: instance };
};

const createInstance = createValidatedAction(CreateInstanceSchema, handler);

export default createInstance;
