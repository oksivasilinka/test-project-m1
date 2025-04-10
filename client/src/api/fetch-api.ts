export const fetchItem = async ({id}: {id: string} ) => {
    try {
        const response = await fetch(`${process.env.API_URL}/items/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch item: ${response.statusText}`);
        }

        return  await response.json();


    } catch (error) {
        console.error(error);
        throw error.message
    }
};
