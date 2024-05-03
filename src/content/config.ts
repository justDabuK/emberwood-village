import { z, defineCollection } from "astro:content";
import { possiblePrerequisites } from "../scripts/spellPrerequisites.ts";
import { Spell, SpellSchool } from "../scripts/spellUtils.ts";

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

const shopSchema = z.object({
  title: z.string(),
  description: z.string(),
  columnStart: z.number(),
  columnEnd: z.number(),
  rowStart: z.number(),
  rowEnd: z.number(),
  icon: z.string(),
});

const establishmentCollection = defineCollection({
  type: "content",
  schema: shopSchema,
});

const miscCollection = defineCollection({
  type: "content",
  schema: shopSchema,
});

const shopCollection = defineCollection({
  type: "content",
  schema: shopSchema,
});

const magicItemCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    rarity: z.string(),
    type: z.string(),
  }),
});

const spellCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.nativeEnum(Spell),
    level: z.number(),
    school: z.nativeEnum(SpellSchool),
    castingTime: z.string(),
    range: z.string(),
    components: z.string(),
    duration: z.string(),
    disabled: z.boolean().optional(),
    ritual: z.boolean().optional(),
    prerequisites: z.array(z.nativeEnum(possiblePrerequisites)).optional(),
    effect: z
      .object({
        1: z.string().optional(),
        2: z.string().optional(),
        3: z.string().optional(),
        4: z.string().optional(),
        5: z.string().optional(),
        6: z.string().optional(),
        7: z.string().optional(),
        8: z.string().optional(),
        9: z.string().optional(),
        10: z.string().optional(),
        11: z.string().optional(),
        12: z.string().optional(),
        13: z.string().optional(),
        14: z.string().optional(),
        15: z.string().optional(),
        16: z.string().optional(),
        17: z.string().optional(),
        18: z.string().optional(),
        19: z.string().optional(),
        20: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  bestiary: bestiaryCollection,
  downtime: downtimeCollection,
  establishments: establishmentCollection,
  magicItems: magicItemCollection,
  misc: miscCollection,
  shops: shopCollection,
  spells: spellCollection,
};
