export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  websiteType: string;
  estimatedBudget: string;
  projectDescription: string;
  preferredContact: 'email' | 'whatsapp' | 'phone' | 'video';
  privacyConsent: boolean;
  // Anti-spam honeypot
  _hp?: string;
  // Submission timestamp for bot timing check
  _loadedAt?: number;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  devMode?: boolean;
  enquiryId?: string;
  error?: string;
}
