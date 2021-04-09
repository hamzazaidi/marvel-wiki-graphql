import { Avatar } from "@marvel-wiki/api-interfaces";

export const avatar = (thumbnail: Avatar): string => {
    if(thumbnail.path.includes('image_not_available')) {
        return null;
    }
    return `${thumbnail.path}.${thumbnail.extension}`;
}


export const getIdFromUri = (resourceURI: string) => {
    const url = new URL(resourceURI);
    const splitted = url.pathname.split('/');
    const id = splitted[splitted.length - 1];
    return id;
}
