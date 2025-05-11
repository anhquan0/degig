import { Skills } from "./skills";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Job {
  title: string;
  description: string;
  reward: number;
  deadline: string;
  skills: {
    skills: string;
    subskills: string[];
  }[];
  poc: string;
  applicationLink?: string;
}

export interface Contract {
  txhash: string;
  partyA: string;
  partyB: string;
  content: string;
  submission: string;
  inprogress: boolean;
  indispute: boolean;
  amount: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiResponseInterface {
  statusCode: number;
  message?: string;
  data?: any;
  pagination?: Pagination;
}

export interface JobInterface {
  id: string;
  publishedAt?: string | null;
  expriedAt?: string | null;
  walletAddress: string;
  title: string;
  description?: string | null;
  reward: number;
  poc: string;
  isPublished: boolean;
  isActive: boolean;
  isArchived: boolean;
  isFeatured: boolean;
  isDraft: boolean;
  isPrivate: boolean;
  applicationLink?: string | null;
  skills?: Skills;
}
