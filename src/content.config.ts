import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
  }),
});

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/workshops' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    order: z.number(),
    shortDescription: z.string(),
    price: z.number().optional(),
    duration: z.string().optional(),
    materialsIncluded: z.boolean().default(true),
    availability: z.string().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    status: z.enum(['active', 'upcoming', 'archived']).default('active'),
    featured: z.boolean().default(false),
    bookingType: z.enum(['inquiry', 'calcom']).default('inquiry'),
    calcomEventSlug: z.string().optional(),
  }),
});

export const collections = { journal, workshops };
