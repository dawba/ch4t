import { ID } from '../types/types.ts';

export const getIdFromLocalStorage = () => {
  const id = localStorage.getItem('currentUserId');

  if (!id) {
    return null;
  }

  return id.replace(/"/g, '') as unknown as ID;
};
