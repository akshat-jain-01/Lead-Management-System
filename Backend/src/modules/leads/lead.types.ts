import mongoose, { Document } from "mongoose";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Lost";

export type LeadSource =
  | "Website"
  | "Instagram"
  | "Referral";

export interface ILead extends Document {

  name: string;

  email: string;

  status: LeadStatus;

  source: LeadSource;

  createdBy: mongoose.Types.ObjectId;

}

export interface CreateLeadInput {

  name: string;

  email: string;

  status: LeadStatus;

  source: LeadSource;

  createdBy?: mongoose.Types.ObjectId;

}


export interface LeadQuery {

  status?: LeadStatus;

  source?: LeadSource;

  search?: string;

  page?: string;

  limit?: string;

}