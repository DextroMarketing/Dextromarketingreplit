import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSubmissionSchema, insertBookCallSubmissionSchema, insertDxmNumberSchema } from "@shared/schema";
import { storage } from "./storage";
import { analyseText, generateContent, analyseBusinessScenario } from "./ai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Debug endpoint to check environment variables
  app.get('/api/debug-env', (req, res) => {
    res.json({
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPrefix: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'undefined'
    });
  });
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Here you could integrate with email service like Nodemailer
      // For now, we'll just return success
      console.log("New contact submission:", submission);
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        submissionId: submission.id 
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get contact submissions (for admin purposes)
  app.get("/api/contact/submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // AI Text Analysis
  app.post("/api/ai/analyse-text", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== "string" || text.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "Text content is required for analysis" 
        });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          success: false, 
          error: "OpenAI API key not configured. Please add your API key to enable AI features." 
        });
      }

      const analysis = await analyseText(text);
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to analyse text" 
      });
    }
  });

  // AI Content Generation
  app.post("/api/ai/generate-content", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "Prompt is required for content generation" 
        });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          success: false, 
          error: "OpenAI API key not configured. Please add your API key to enable AI features." 
        });
      }

      const content = await generateContent(prompt);
      res.json(content);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to generate content" 
      });
    }
  });

  // AI Business Analysis
  app.post("/api/ai/analyse-business", async (req, res) => {
    try {
      const { description } = req.body;
      
      if (!description || typeof description !== "string" || description.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: "Business description is required for analysis" 
        });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ 
          success: false, 
          error: "OpenAI API key not configured. Please add your API key to enable AI features." 
        });
      }

      const analysis = await analyseBusinessScenario(description);
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to analyse business scenario" 
      });
    }
  });

  // Book Call submission endpoint
  app.post("/api/book-call", async (req, res) => {
    try {
      const validatedData = insertBookCallSubmissionSchema.parse(req.body);
      const submission = await storage.createBookCallSubmission(validatedData);
      
      // Here you could integrate with email service like Nodemailer
      // For now, we'll just return success
      console.log("New book call submission:", submission);
      
      res.json({ 
        success: true, 
        message: "Call booking submitted successfully",
        submissionId: submission.id 
      });
    } catch (error) {
      console.error("Book call submission error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get book call submissions (for admin purposes)
  app.get("/api/book-call/submissions", async (req, res) => {
    try {
      const submissions = await storage.getBookCallSubmissions();
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error fetching book call submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // DXM Numbers submission endpoint for Vapi phone numbers
  app.post("/api/dxm-number", async (req, res) => {
    try {
      const validatedData = insertDxmNumberSchema.parse(req.body);
      const submission = await storage.createDxmNumber(validatedData);
      
      console.log("New DXM number submission:", submission);
      
      res.json({ 
        success: true, 
        message: "Phone number saved successfully",
        submissionId: submission.id 
      });
    } catch (error) {
      console.error("DXM number submission error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid phone number data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get DXM numbers (for admin purposes)
  app.get("/api/dxm-number/submissions", async (req, res) => {
    try {
      const submissions = await storage.getDxmNumbers();
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error fetching DXM number submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
