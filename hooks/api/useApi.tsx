"use client";

import { useState } from "react";
/**
 * It support loading, error, data for any kinds of async function to make it simple, readable and easy to use.
 *
 * It can be used for: Firebase Query, Any API Query, andy async query to 3rd party API.
 *
 * @param options - defaultValue: T
 * @param options.defaultValue - default value for data
 * @returns The object containing loading, error, data, and query function.
 * - loading: boolean - true if loading, false otherwise
 * - error: string | undefined - error message if any, undefined otherwise
 * - data: T | undefined - the data returned from the query, undefined if not yet loaded
 * - empty: boolean - true if the query has submitted and the result data is empty, false otherwise
 * - query: function - function to execute the query
 *
 * * Note that: the return data of the callback will be set to data.
 */
export default function useApi<T>(options?: { defaultValue: T }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<T | undefined>(options?.defaultValue);
  const [empty, setEmpty] = useState(false);

  async function query<T>(callback: () => Promise<T>) {
    setLoading(true);
    setError(undefined);
    setEmpty(false);
    setData(undefined);

    //
    try {
      const re = await callback();
      // TODO: find proper typing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setData(re as any);
      setEmpty(!re);
      return re as T;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message as string);
      } else {
        /**
         *
         * @param options - defaultValue: T
         * @param options.defaultValue - default value for data
         * @returns The object containing loading, error, data, and query function.
         * - loading: boolean - true if loading, false otherwise
         * - error: string | undefined - error message if any, undefined otherwise
         */
        setError("useApi Error: " + err);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading: loading,
    error: error,
    data: data as T,
    empty: empty,
    query,
  };
}
