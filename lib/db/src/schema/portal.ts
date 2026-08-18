import { createInsertSchema } from "drizzle-zod";
import {
  date,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const portalSubscriptions = pgTable("portal_subscriptions", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  plan: text("plan").notNull(),
  billingCycle: text("billing_cycle").notNull(),
  status: text("status").notNull(),
  monthlyPrice: numeric("monthly_price", { precision: 10, scale: 2, mode: "number" }).notNull(),
  annualPrice: numeric("annual_price", { precision: 10, scale: 2, mode: "number" }).notNull(),
  depositAmount: numeric("deposit_amount", { precision: 10, scale: 2, mode: "number" }).notNull(),
  nextBillingDate: date("next_billing_date", { mode: "string" }).notNull(),
  renewalDate: date("renewal_date", { mode: "string" }).notNull(),
  location: text("location").notNull(),
  includedServices: text("included_services").array().notNull(),
  lastPaymentDate: date("last_payment_date", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const portalDocuments = pgTable("portal_documents", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  description: text("description").notNull(),
  issuedDate: date("issued_date", { mode: "string" }).notNull(),
  updatedDate: date("updated_date", { mode: "string" }).notNull(),
  downloadUrl: text("download_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPortalSubscriptionSchema = createInsertSchema(portalSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertPortalDocumentSchema = createInsertSchema(portalDocuments).omit({
  id: true,
  createdAt: true,
});

export type InsertPortalSubscription = z.infer<typeof insertPortalSubscriptionSchema>;
export type PortalSubscription = typeof portalSubscriptions.$inferSelect;
export type InsertPortalDocument = z.infer<typeof insertPortalDocumentSchema>;
export type PortalDocument = typeof portalDocuments.$inferSelect;