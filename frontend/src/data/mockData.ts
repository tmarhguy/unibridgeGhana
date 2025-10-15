// Mock data for static site deployment
export const mockUniversities = [
  {
    id: '1',
    name: 'University of Ghana',
    shortName: 'UG',
    type: 'PUBLIC',
    location: 'Legon, Greater Accra',
    established: 1948,
    studentPopulation: 45000,
    programs: ['Engineering', 'Medicine', 'Business', 'Arts', 'Science'],
    requirements: {
      wassce: 'Minimum 6 credits',
      english: 'Credit in English Language',
      mathematics: 'Credit in Core Mathematics'
    },
    applicationFee: 150,
    deadline: '2025-03-31',
    logo: '/images/universities/ug-logo.png'
  },
  {
    id: '2',
    name: 'Kwame Nkrumah University of Science and Technology',
    shortName: 'KNUST',
    type: 'PUBLIC',
    location: 'Kumasi, Ashanti',
    established: 1952,
    studentPopulation: 52000,
    programs: ['Engineering', 'Medicine', 'Architecture', 'Agriculture', 'Science'],
    requirements: {
      wassce: 'Minimum 6 credits',
      english: 'Credit in English Language',
      mathematics: 'Credit in Core Mathematics'
    },
    applicationFee: 150,
    deadline: '2025-03-31',
    logo: '/images/universities/knust-logo.png'
  },
  {
    id: '3',
    name: 'Ashesi University',
    shortName: 'Ashesi',
    type: 'PRIVATE',
    location: 'Berekuso, Eastern Region',
    established: 2002,
    studentPopulation: 1200,
    programs: ['Computer Science', 'Business Administration', 'Engineering'],
    requirements: {
      wassce: 'Minimum 6 credits',
      english: 'Credit in English Language',
      mathematics: 'Credit in Core Mathematics'
    },
    applicationFee: 200,
    deadline: '2025-02-28',
    logo: '/images/universities/ashesi-logo.png'
  }
]

export const mockApplications = [
  {
    id: '1',
    universityId: '1',
    universityName: 'University of Ghana',
    status: 'SUBMITTED',
    submittedAt: '2024-12-15T10:30:00Z',
    deadline: '2025-03-31',
    documents: ['Transcript', 'WASSCE Results', 'Passport Photo'],
    progress: 100
  },
  {
    id: '2',
    universityId: '2',
    universityName: 'KNUST',
    status: 'IN_PROGRESS',
    submittedAt: null,
    deadline: '2025-03-31',
    documents: ['Transcript', 'WASSCE Results'],
    progress: 75
  }
]

export const mockScholarships = [
  {
    id: '1',
    title: 'Ghana Education Trust Fund Scholarship',
    provider: 'GETFund',
    amount: 5000,
    type: 'MERIT_BASED',
    deadline: '2025-02-15',
    requirements: ['WASSCE: 6 credits minimum', 'Ghanaian citizen', 'Financial need'],
    description: 'Full scholarship for outstanding students pursuing STEM programs'
  },
  {
    id: '2',
    title: 'MasterCard Foundation Scholars Program',
    provider: 'MasterCard Foundation',
    amount: 15000,
    type: 'NEED_BASED',
    deadline: '2025-01-31',
    requirements: ['Financial need', 'Academic excellence', 'Leadership potential'],
    description: 'Comprehensive scholarship including tuition, accommodation, and stipend'
  }
]

export const mockNotifications = [
  {
    id: 1,
    type: "deadline",
    title: "Application Deadline Approaching",
    message: "Your KNUST application deadline is in 5 days",
    date: "2024-12-20",
    urgent: true,
    read: false
  },
  {
    id: 2,
    type: "interview",
    title: "Interview Scheduled",
    message: "Ashesi University has scheduled your interview for January 5th",
    date: "2024-12-18",
    urgent: false,
    read: false
  },
  {
    id: 3,
    type: "document",
    title: "Documents Received",
    message: "University of Ghana has received your transcripts",
    date: "2024-12-16",
    urgent: false,
    read: true
  }
]

export const mockUser = {
  id: '1',
  email: 'demo@unibridge.gh',
  firstName: 'Demo',
  lastName: 'User',
  phone: '+233000000000',
  role: 'STUDENT' as const,
  isActive: true,
  isVerified: true,
  createdAt: new Date().toISOString()
}

export const mockStudentProfile = {
  id: '1',
  phoneNumber: '+233000000000',
  nationality: 'Ghanaian',
  city: 'Accra',
  region: 'Greater Accra',
  highSchool: 'Demo High School',
  graduationYear: 2024
}
