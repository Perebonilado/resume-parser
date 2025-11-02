import { z } from 'zod';

// Work Experience Schema
const WorkExperienceSchema = z.object({
  company: z.string().describe('Company name'),
  position: z.string().describe('Job title'),
  startDate: z.string().describe('Start date (e.g., "Jan 2020", "2020")'),
  endDate: z.string().describe('End date or "Present"'),
  description: z.array(z.string()).describe('Bullet points of responsibilities and achievements'),
});

// Education Schema
const EducationSchema = z.object({
  institution: z.string().describe('University or school name'),
  degree: z.string().describe('Degree type (e.g., "Bachelor of Science")'),
  field: z.string().describe('Major or field of study'),
  graduationDate: z.string().describe('Graduation date or expected date'),
});

// Main Resume Schema
export const ResumeSchema = z.object({
  fullName: z.string().describe('Candidate full name'),
  
  email: z.string().describe('Email address'),
  
  phone: z.string().optional().describe('Phone number'),
  
  location: z.string().optional().describe('City and state/country'),
  
  summary: z.string().optional().describe('Professional summary or objective (2-3 sentences)'),
  
  workExperience: z.array(WorkExperienceSchema).describe('Work history, most recent first'),
  
  education: z.array(EducationSchema).describe('Educational background, most recent first'),
  
  skills: z.array(z.string()).describe('List of technical and professional skills'),
});

export type Resume = z.infer<typeof ResumeSchema>;