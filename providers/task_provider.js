import { atom } from 'jotai';

export const tasksAtom = atom([]);

export const filterAtom = atom({
  priority: null,
  status: null
});
