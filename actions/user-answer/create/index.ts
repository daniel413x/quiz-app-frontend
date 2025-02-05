'use server';

import { revalidatePath } from 'next/cache';
import { createValidatedAction } from '@/actions/utils';
import axios from 'axios';
import {
  CATEGORIES_ROUTE, DOMAIN_ROUTE, USER_ANSWER_ROUTE,
} from '@/lib/data/routes';
import { headers } from 'next/headers';
import { CreateUserAnswerInputType } from './types';
import CreateUserAnswerSchema from './schema';

const handler = async (data: CreateUserAnswerInputType) => {
  const headersList = headers();
  const fullUrl = headersList.get('referer');

  if (!fullUrl) {
    return { error: 'Missing referer header' };
  }

  const url = new URL(fullUrl);

  const dynamicRoutes = url.pathname.split('/');
  const domainSlug = dynamicRoutes[1];
  const category = dynamicRoutes[3];
  const quizName = dynamicRoutes[4];
  const instanceId = dynamicRoutes[5];
  const qNum = dynamicRoutes[6];
  const { answerId } = data;
  if (!answerId) {
    return {
      error: 'Missing fields. Failed to create userAnswer.',
    };
  }
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/${DOMAIN_ROUTE}/${domainSlug}/${USER_ANSWER_ROUTE}/${instanceId}`,
      {
        answerId: data.answerId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    revalidatePath(`/${domainSlug}/${CATEGORIES_ROUTE}/${category}/${quizName}/${instanceId}/${qNum}`);
    return { data: res.data };
  } catch (e: any) {
    return {
      error: 'Could not create',
    };
  }
};

const createUserAnswer = createValidatedAction(CreateUserAnswerSchema, handler);

export default createUserAnswer;
