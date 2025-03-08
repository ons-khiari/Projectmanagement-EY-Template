export type ClientType = "individual" | "company" | "government" | "non-profit";

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  industry?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  logo?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const clients: Client[] = [
  {
    id: "c1",
    name: "Acme Corporation",
    type: "company",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, New York, NY 10001",
    website: "www.acmecorp.com",
    industry: "Technology",
    contactPerson: "John Smith",
    contactEmail: "john.smith@acmecorp.com",
    contactPhone: "+1 (555) 123-4568",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Global technology company specializing in software solutions",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    id: "c2",
    name: "Jane Doe Consulting",
    type: "individual",
    email: "jane.doe@consulting.com",
    phone: "+1 (555) 987-6543",
    address: "456 Consultant St, San Francisco, CA 94105",
    website: "www.janedoeconsulting.com",
    industry: "Consulting",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Independent consultant specializing in business strategy",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "c3",
    name: "Global Enterprises Ltd",
    type: "company",
    email: "info@globalenterprises.com",
    phone: "+1 (555) 789-0123",
    address: "789 Corporate Blvd, Chicago, IL 60601",
    website: "www.globalenterprises.com",
    industry: "Manufacturing",
    contactPerson: "Robert Johnson",
    contactEmail: "r.johnson@globalenterprises.com",
    contactPhone: "+1 (555) 789-0124",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Manufacturing company with global operations",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-07-10"),
  },
  {
    id: "c4",
    name: "City of Metropolis",
    type: "government",
    email: "info@metropolis.gov",
    phone: "+1 (555) 456-7890",
    address: "1 City Hall Plaza, Metropolis, NY 10002",
    website: "www.metropolis.gov",
    contactPerson: "Mayor James Wilson",
    contactEmail: "mayor@metropolis.gov",
    contactPhone: "+1 (555) 456-7891",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Municipal government client for city infrastructure projects",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2023-04-15"),
  },
  {
    id: "c5",
    name: "GreenEarth Foundation",
    type: "non-profit",
    email: "contact@greenearth.org",
    phone: "+1 (555) 234-5678",
    address: "567 Charity Lane, Seattle, WA 98101",
    website: "www.greenearth.org",
    industry: "Environmental",
    contactPerson: "Sarah Green",
    contactEmail: "s.green@greenearth.org",
    contactPhone: "+1 (555) 234-5679",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Non-profit organization focused on environmental conservation",
    createdAt: new Date("2023-02-25"),
    updatedAt: new Date("2023-06-05"),
  },
  {
    id: "c6",
    name: "TechStart Inc",
    type: "company",
    email: "hello@techstart.io",
    phone: "+1 (555) 345-6789",
    address: "890 Innovation Way, Austin, TX 78701",
    website: "www.techstart.io",
    industry: "Technology",
    contactPerson: "Michael Chen",
    contactEmail: "m.chen@techstart.io",
    contactPhone: "+1 (555) 345-6790",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Startup developing innovative mobile applications",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-07-20"),
  },
  {
    id: "c7",
    name: "Dr. Emily Williams",
    type: "individual",
    email: "dr.williams@healthcare.com",
    phone: "+1 (555) 567-8901",
    address: "123 Medical Drive, Boston, MA 02115",
    industry: "Healthcare",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Healthcare consultant specializing in hospital operations",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-05-25"),
  },
  {
    id: "c8",
    name: "FinancePro Services",
    type: "company",
    email: "info@financepro.com",
    phone: "+1 (555) 678-9012",
    address: "456 Finance Street, Charlotte, NC 28202",
    website: "www.financepro.com",
    industry: "Financial Services",
    contactPerson: "David Thompson",
    contactEmail: "d.thompson@financepro.com",
    contactPhone: "+1 (555) 678-9013",
    logo: "/placeholder.svg?height=40&width=40",
    notes: "Financial services firm providing accounting and tax solutions",
    createdAt: new Date("2023-01-30"),
    updatedAt: new Date("2023-06-15"),
  },
];
