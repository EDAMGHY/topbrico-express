import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as CustomError from '@/errors';
import { getPagination, responseObject } from '@/lib';
import { Note } from '@/models';
import { IFilterExpress, INote, ISortExpress, Request } from '@/types';

/**
 * Create a new note
 *
 * @param req : Request
 * @param res : Response
 * @route POST /api/v1/notes
 * @access Authenticated
 */
export const createNote = async (req: Request, res: Response) => {
  const { name, content } = req.body as Omit<INote, 'user'>;
  const userId = req.user?.userId;

  const note = await Note.create({
    name,
    content,
    user: userId,
  });

  await note.save();

  res.status(StatusCodes.CREATED).json(
    responseObject('Note Created Successfully...', {
      note,
    }),
  );
};

/**
 * Get all notes
 *
 * @param req : Request
 * @param res : Response
 * @route GET /api/v1/notes
 * @access Authenticated
 */
export const getNotes = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const {
    name,
    content,
    sort = 'createdAt',
    order = 'desc',
    perPage = 10,
    page = 1,
  } = req.query as {
    name: string;
    content: string;
    sort: string;
    order: 'asc' | 'desc';
    perPage: string;
    page: string;
  };

  // Filter setup
  const filters: IFilterExpress[] = [];

  // Add other filters as needed
  if (name) filters.push({ name: { $regex: `.*${name}.*`, $options: 'i' } });
  if (content)
    filters.push({
      content: { $regex: `.*${content}.*`, $options: 'i' },
    });

  //handle Error if no filters are provided
  // "message": "$and/$or/$nor must be a nonempty array",
  let obj = {};
  if (filters.length > 0) {
    obj = { $and: filters };
  }

  // Sorting setup
  const key = sort.toString();
  const value = order;
  const sorting: ISortExpress = { [key]: value };

  const length = await Note.countDocuments({ ...obj, user: userId });

  const { limit, skip, total } = getPagination(+page, +perPage, length);

  // fetch notes
  const notes = await Note.find({ ...obj, user: userId })
    .sort(sorting)
    .skip(skip)
    .limit(limit);

  res.status(StatusCodes.OK).json(
    responseObject('Notes Fetched Successfully...', {
      length,
      total,
      current: +page,
      notes,
    }),
  );
};

/**
 * Get a single note
 * @param req : Request
 * @param res : Response
 * @route GET /api/v1/notes/:id
 * @access Authenticated
 */
export const getNote = async (req: Request, res: Response) => {
  const noteId = req.params?.id;
  const userId = req.user?.userId;

  const note = await Note.findOne({ user: userId, _id: noteId });

  if (!note) {
    throw new CustomError.NotFoundError(
      `No note found with the id of ${noteId}`,
    );
  }

  res.status(StatusCodes.OK).json(
    responseObject(`Note with ID: ${noteId} Fetched Successfully...`, {
      note,
    }),
  );
};

/**
 * Edit a note
 *
 * @param req : Request
 * @param res : Response
 * @route PUT /api/v1/notes/:id
 * @access Authenticated
 */
export const editNote = async (req: Request, res: Response) => {
  const noteId = req.params?.id;
  const userId = req.user?.userId;
  const { name, content } = req.body as Omit<INote, 'user'>;

  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    throw new CustomError.NotFoundError(
      `No note found with the id of ${noteId}`,
    );
  }

  if (name) note.name = name;
  if (content) note.content = content;

  await note.save();

  res.status(StatusCodes.OK).json(
    responseObject('Note Edited Successfully...', {
      note,
    }),
  );
};

/**
 * Delete a note
 *
 * @param req : Request
 * @param res : Response
 * @route DELETE /api/v1/notes/:id
 * @access Authenticated - PERMISSION : DELETE_NOTE
 */
export const deleteNote = async (req: Request, res: Response) => {
  const noteId = req.params?.id;
  const userId = req.user?.userId;

  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    throw new CustomError.NotFoundError(
      `No note found with the id of ${noteId}`,
    );
  }

  await note.deleteOne();

  res
    .status(StatusCodes.OK)
    .json(
      responseObject(`Note with the ID: [${noteId}] Deleted Successfully...`),
    );
};
