import useSWR from 'swr';
import API from '../Api';

const revalidateOptions = {
    revalidateOnFocus: false,
    errorRetryCount: 3,
}

export default function useFetch<T = any>(url: string) {
    const { data, error, isValidating, mutate } = useSWR<T>(url, async url => {
        const { data } = await API.get<T>(`/${url}`);

        return data;
    }, revalidateOptions);

    return { data, error, isValidating, mutate };
}