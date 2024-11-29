'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

// Helper funtion to fetch latest data for given cache tags
export const RevalidateTagAction = async (tags: string[]) => {
  tags.forEach((tag) => revalidateTag(tag));
};

// Helper funtion to fetch latest data for given path name
export const RevalidatePathAction = async (path: string) => {
  revalidatePath(path, 'page');
};
