// Enums
export const statsEnum = ['planning', 'active', 'completed'];
export const taskStatsEnum = ['started', 'pending', 'in progress', 'completed'];
export const prioritiesEnum = ['low', 'medium', 'high'];

// Functions
export const responseObject = <T>(
  message: string,
  data: T = null,
  status = true,
  ...rest
) => ({
  success: status,
  message,
  data,
  ...rest,
});

/**
 *
 * @param page number
 * @param perPage number
 * @param length  number
 * @returns limit, skip, total
 */
export const getPagination = (
  page: number,
  perPage: number,
  length: number,
): { limit: number; skip: number; total: number } => {
  const limit = +perPage;
  const skip = +perPage * (+page - 1);
  const totalPages = Math.ceil(length / limit) || 0;

  return { limit, skip, total: totalPages };
};
