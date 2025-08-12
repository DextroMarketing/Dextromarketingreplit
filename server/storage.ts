import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type BookCallSubmission, type InsertBookCallSubmission } from "@shared/schema";
import { randomUUID } from "crypto";

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

export const storage = new MemStorage();
