import type { SchemaTypeDefinition } from "sanity";

import { aboutPage } from "./aboutPage";
import { post } from "./post";

export const schemaTypes: SchemaTypeDefinition[] = [post, aboutPage];

/** Documents there should only ever be one of. */
export const singletonTypes = new Set(["aboutPage"]);
