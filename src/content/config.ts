// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `type` and `schema` for each collection
const bestiaryCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const downtimeCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    disabled: z.boolean().optional(),
  }),
});

const establishmentCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    columnStart: z.number(),
    columnEnd: z.number(),
    rowStart: z.number(),
    rowEnd: z.number(),
    icon: z.string(),
  }),
});

const magicItemCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    rarity: z.string(),
    type: z.string(),
  }),
});

const miscCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    columnStart: z.number(),
    columnEnd: z.number(),
    rowStart: z.number(),
    rowEnd: z.number(),
    icon: z.string(),
  }),
});

const shopCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    columnStart: z.number(),
    columnEnd: z.number(),
    rowStart: z.number(),
    rowEnd: z.number(),
    icon: z.string(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  bestiary: bestiaryCollection,
  downtime: downtimeCollection,
  establishments: establishmentCollection,
  magicItems: magicItemCollection,
  misc: miscCollection,
  shops: shopCollection,
};
