import { pgTable, serial, text, timestamp, varchar, json } from "drizzle-orm/pg-core";

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: varchar("authorId", { length: 100 }).notNull(),
  subjectId: serial("subjectId").references(() => subjects.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  links: json("links").$type<string[]>().default("[]").notNull(),
  files: json("files").$type<string[]>().default("[]").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
