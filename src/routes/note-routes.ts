import { Router } from 'express';

import {
  createNote,
  deleteNote,
  editNote,
  getNote,
  getNotes,
} from '@/controllers';
import { authenticate } from '@/middleware';

const router = Router();

router.route('/').post(authenticate, createNote).get(authenticate, getNotes);

router.get('/:id', authenticate, getNote);

router.put('/:id', authenticate, editNote);

router.delete('/:id', authenticate, deleteNote);

export default router;
