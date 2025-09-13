import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  projectType: text("project_type"),
  budget: text("budget"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Book Call Submissions Table
export const bookCallSubmissions = pgTable("book_call_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  selectedService: text("selected_service").notNull(),
  problems: text("problems").notNull(),
  additionalInfo: text("additional_info"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertBookCallSubmissionSchema = createInsertSchema(bookCallSubmissions).omit({
  id: true,
  submittedAt: true,
});
export type InsertBookCallSubmission = z.infer<typeof insertBookCallSubmissionSchema>;
export type BookCallSubmission = typeof bookCallSubmissions.$inferSelect;

// DXM Numbers Table for Vapi phone submissions
export const dxmNumbers = pgTable("DXM_Numbers", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDxmNumberSchema = createInsertSchema(dxmNumbers).omit({
  id: true,
  createdAt: true,
}).extend({
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, "Phone number must be in E.164 format (e.g., +44123456789)")
});
export type InsertDxmNumber = z.infer<typeof insertDxmNumberSchema>;
export type DxmNumber = typeof dxmNumbers.$inferSelect;
