import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { eq, desc } from "drizzle-orm";
import { users, contactSubmissions, bookCallSubmissions, type InsertUser, type User, type InsertContactSubmission, type ContactSubmission, type InsertBookCallSubmission, type BookCallSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

// Initialize database connection only if DATABASE_URL is provided
let db: ReturnType<typeof drizzle> | null = null;
if (process.env.DATABASE_URL) {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle({ client: sql });
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createBookCallSubmission(submission: InsertBookCallSubmission): Promise<BookCallSubmission>;
  getBookCallSubmissions(): Promise<BookCallSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private bookCallSubmissions: Map<number, BookCallSubmission>;
  private nextBookCallId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.bookCallSubmissions = new Map();
    this.nextBookCallId = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      company: submission.company || null,
      projectType: submission.projectType || null,
      budget: submission.budget || null,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createBookCallSubmission(submission: InsertBookCallSubmission): Promise<BookCallSubmission> {
    const id = this.nextBookCallId++;
    const bookCallSubmission: BookCallSubmission = {
      ...submission,
      id,
      additionalInfo: submission.additionalInfo || null,
      submittedAt: new Date(),
    };
    this.bookCallSubmissions.set(id, bookCallSubmission);
    return bookCallSubmission;
  }

  async getBookCallSubmissions(): Promise<BookCallSubmission[]> {
    return Array.from(this.bookCallSubmissions.values()).sort(
      (a, b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0)
    );
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  constructor() {
    if (!db) {
      throw new Error("Database connection not initialized. Ensure DATABASE_URL is set.");
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db!.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db!.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db!.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db!.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db!.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createBookCallSubmission(submission: InsertBookCallSubmission): Promise<BookCallSubmission> {
    const result = await db!.insert(bookCallSubmissions).values(submission).returning();
    return result[0];
  }

  async getBookCallSubmissions(): Promise<BookCallSubmission[]> {
    return await db!.select().from(bookCallSubmissions).orderBy(desc(bookCallSubmissions.submittedAt));
  }
}

// Use database storage in production, memory storage for development
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
