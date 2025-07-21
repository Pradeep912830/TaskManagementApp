// /src/atoms/task_atoms.js

import { atom } from 'jotai';

// Atom to store the list of tasks
export const tasksAtom = atom([]);

// Atom for filter state (null means "no filter")
export const filterAtom = atom({
  priority: null,    // Can be 'low', 'medium', 'high' or null
  status: null       // Can be 'completed', 'incomplete' or null
});
