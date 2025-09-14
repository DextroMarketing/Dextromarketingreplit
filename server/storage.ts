import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq, desc } from "drizzle-orm";
import { users, contactSubmissions, bookCallSubmissions, dxmNumbers, type InsertUser, type User, type InsertContactSubmission, type ContactSubmission, type InsertBookCallSubmission, type BookCallSubmission, type InsertDxmNumber, type DxmNumber } from "@shared/schema";
import { randomUUID } from "crypto";

// DATABASE_URL should be set as an environment variable
// Do not set credentials in code - this is a security risk

// Initialize database connection with node-postgres (pg)
let db: ReturnType<typeof drizzle> | null = null;
if (process.env.DATABASE_URL) {
  try {
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 1,
      statement_timeout: 10000,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 20000
    });
    db = drizzle(pool);
    console.log('Database connection initialized successfully with node-postgres (pg)');
  } catch (error) {
    console.error('Database connection failed:', error);
    db = null;
  }
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createBookCallSubmission(submission: InsertBookCallSubmission): Promise<BookCallSubmission>;
  getBookCallSubmissions(): Promise<BookCallSubmission[]>;
  createDxmNumber(submission: InsertDxmNumber): Promise<DxmNumber>;
  getDxmNumbers(): Promise<DxmNumber[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private bookCallSubmissions: Map<number, BookCallSubmission>;
  private dxmNumbers: Map<number, DxmNumber>;
  private nextBookCallId: number;
  private nextDxmNumberId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.bookCallSubmissions = new Map();
    this.dxmNumbers = new Map();
    this.nextBookCallId = 1;
    this.nextDxmNumberId = 1;
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

  async createDxmNumber(submission: InsertDxmNumber): Promise<DxmNumber> {
    const id = this.nextDxmNumberId++;
    const dxmNumber: DxmNumber = {
      ...submission,
      id,
      createdAt: new Date(),
    };
    this.dxmNumbers.set(id, dxmNumber);
    return dxmNumber;
  }

  async getDxmNumbers(): Promise<DxmNumber[]> {
    return Array.from(this.dxmNumbers.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
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

  async createDxmNumber(submission: InsertDxmNumber): Promise<DxmNumber> {
    const result = await db!.insert(dxmNumbers).values(submission).returning();
    return result[0];
  }

  async getDxmNumbers(): Promise<DxmNumber[]> {
    return await db!.select().from(dxmNumbers).orderBy(desc(dxmNumbers.createdAt));
  }
}



// Use database storage in production, memory storage for development
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
