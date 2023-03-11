import useSWR from 'swr';

export const apiUrl = process.env.NEXT_PUBLIC_RESOURCE_URL;
import { useAuth } from '../contexts/auth';

export default function useResource() {

    const { tokens, logout } = useAuth();

    const { data, error, mutate } = useSWR([apiUrl, tokens], fetchResource);

    async function fetchResource(url) {

        if (!tokens) {
            return;
        }

        try {
            const response = await fetch(apiUrl, config());

            const responseJSON = await response.json();

            return responseJSON;

        } catch (err) {
            handleError(err);
        }
    }

    async function createResource(info) {

        try {
            const options = config();
            options.method = "POST",
            options.body = JSON.stringify(info);
            console.log(options.body)
            await fetch(apiUrl, options);
            mutate(); // mutate causes complete collection to be refetched
        } catch (err) {
            handleError(err);
        }
    }

    async function deleteResource(id) {

        try {
            const url = apiUrl + id;
            const options = config();
            options.method = "DELETE";
            await fetch(url, options);
            mutate(); // mutate causes complete collection to be refetched
        } catch (err) {
            handleError(err);
        }
    }

    async function updateResource(resource) {
        try {

          const response = await fetch(`/api/resources/${resource.id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch resource with id ${resource.id}`);
          }
          const existingResource = await response.json();
      
          const updatedResource = { ...existingResource, ...resource };

          const updateResponse = await fetch(`/api/resources/${resource.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedResource)
          });
          if (!updateResponse.ok) {
            throw new Error(`Failed to update resource with id ${resource.id}`);
          }
      
          return updatedResource;
        } catch (error) {
          console.error(error);
        }
      }


    function config() {

        return {
            headers: {
                'Authorization': 'Bearer ' + tokens.access,
                'Content-Type': 'application/json',
            }
        };
    }

    function handleError(err) {
        console.error(err);
        logout();
    }

    return {
        resources: data,
        error,
        loading: tokens && !error && !data,
        createResource,
        deleteResource,
        updateResource,
    };
}
