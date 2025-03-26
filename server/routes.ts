import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Get category by slug
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  // Get posts by category slug
  app.get("/api/categories/:slug/posts", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const posts = await storage.getPostsByCategory(category.id);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts for category" });
    }
  });
  
  // Get all posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  
  // Get featured posts
  app.get("/api/posts/featured", async (req, res) => {
    try {
      const featuredPosts = await storage.getFeaturedPosts();
      res.json(featuredPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured posts" });
    }
  });
  
  // Get post by slug
  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      // Get the category for the post
      const category = await storage.getCategoryById(post.categoryId);
      
      // Get tags for the post
      const tags = await storage.getTagsByPostId(post.id);
      
      res.json({
        ...post,
        category,
        tags
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });
  
  // Search posts
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const results = await storage.searchPosts(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search posts" });
    }
  });
  
  // Get latest cybersecurity news
  app.get("/api/news/cyber", async (req, res) => {
    try {
      console.log("Fetching cyber news, API key present:", !!process.env.NEWS_API_KEY);
      const news = await storage.getLatestCyberNews();
      console.log("News API response:", news.length > 0 ? `${news.length} articles found` : "No articles found");
      res.json(news);
    } catch (error) {
      console.error("Error fetching cyber news:", error);
      res.status(500).json({ message: "Falha ao buscar notícias de cibersegurança" });
    }
  });
  
  // Get all tags
  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tags" });
    }
  });
  
  // Get posts by tag slug
  app.get("/api/tags/:slug/posts", async (req, res) => {
    try {
      const { slug } = req.params;
      const tag = await storage.getTagBySlug(slug);
      
      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }
      
      // This would normally be a direct database query,
      // but for the in-memory storage we need to get all posts
      // and filter the ones that have the tag
      const allPosts = await storage.getAllPosts();
      const postResults = [];
      
      for (const post of allPosts) {
        const postTags = await storage.getTagsByPostId(post.id);
        if (postTags.some(t => t.id === tag.id)) {
          postResults.push(post);
        }
      }
      
      res.json(postResults);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts for tag" });
    }
  });
  
  // Subscribe to newsletter
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      
      if (existingSubscriber) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      
      // Create new subscriber
      const subscriber = await storage.createSubscriber(validatedData);
      
      res.status(201).json({ 
        message: "Successfully subscribed to newsletter",
        data: subscriber
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
