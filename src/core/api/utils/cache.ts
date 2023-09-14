export const infinity = 100000000; // Just a big number for rtk-query to never reload resources

/**
 * An individual cache item
 */
export type CacheItem<T, Id> = { type: T; id: Id };

/**
 * A list of cache items, including a LIST entity cache
 */
export type CacheList<T, Id> = (CacheItem<T, 'LIST'> | CacheItem<T, Id>)[];

/**
 * Inner function returned by `providesList` to be passed to the `provides` property of a query
 */
type InnerProvidesList<T> = <Results extends T[]>(
  results: Results | undefined,
  customMap?: (item: T) => any,
) => CacheList<string, number>;

/**
 * HOF to create an entity cache to provide a LIST,
 * depending on the results being in a common format.
 *
 * Will not provide individual items without a result.
 *
 * @example
 * ```ts
 * const results = [
 *   { id: 1, message: 'foo' },
 *   { id: 2, message: 'bar' }
 * ]
 * providesList('Todo')(results)
 * [
 *   { type: 'Todo', id: 'List'},
 *   { type: 'Todo', id: 1 },
 *   { type: 'Todo', id: 2 },
 * ]
 * ```
 */
export const providesList =
  <T extends AnyObject>(type: string): InnerProvidesList<T> =>
  (results, customMap = ({ id }) => ({ type, id } as const)) => {
    if (results) {
      return [{ type, id: 'LIST' }, ...results.map(customMap)];
    }
    return [{ type, id: 'LIST' }];
  };

/**
 * HOF to create an entity cache to invalidate a LIST.
 *
 * Invalidates regardless of result.
 *
 * @example
 * ```ts
 * invalidatesList('Todo')()
 * // [{ type: 'Todo', id: 'List' }]
 * ```
 */
export const invalidatesList =
  <T extends string>(type: T, ...ext: string[]) =>
  (): readonly [CacheItem<T, 'LIST'>, ...string[]] =>
    [{ type, id: 'LIST' }, ...ext] as const;

/**
 * HOF to create an entity cache for a single item using the query argument as the Id.
 *
 * @example
 * ```ts
 * cacheByIdArg('Todo')({ id: 5, message: 'walk the fish' }, undefined, 5)
 * // returns:
 * // [{ type: 'Todo', id: 5 }]
 * ```
 */
export const cacheByIdArg =
  <T extends string>(type: T) =>
  <Id, Result = undefined, Error = undefined>(
    result: Result,
    error: Error,
    id: Id,
  ): readonly [CacheItem<T, Id>] =>
    [{ type, id }] as const;
