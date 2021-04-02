import { Avatar } from "@marvel-wiki/api-interfaces";

export const avatar = (thumbnail: Avatar): string =>
`${thumbnail.path}.${thumbnail.extension}`;