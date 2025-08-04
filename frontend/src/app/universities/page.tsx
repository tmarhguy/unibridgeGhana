'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CommonAppLayout from '@/components/layout/CommonAppLayout';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar,
  Star,
  Filter,
  ExternalLink,
  GraduationCap,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Phone,
  Globe
} from 'lucide-react';

// Comprehensive university data based on literature.md
const UNIVERSITIES = [
  {
    id: 1,
    short_code: "UG",
    name: "University of Ghana",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 220.00,
    student_population: 38000,
    established: 1948,
    website: "https://ug.edu.gh",
    admissions_portal: "https://admissions.ug.edu.gh",
    payment_channels: ["MoMo", "Banks", "USSD"],
    featured: true,
    description: "Ghana's premier university and the oldest university in Ghana.",
    logo: "/logos/ug.png"
  },
  {
    id: 2,
    short_code: "KNUST",
    name: "Kwame Nkrumah University of Science & Technology",
    city: "Kumasi",
    region: "Ashanti", 
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 290.00,
    student_population: 60000,
    established: 1952,
    website: "https://knust.edu.gh",
    admissions_portal: "https://apps.knust.edu.gh/admissions",
    payment_channels: ["MoMo", "Banks", "Ghana Post"],
    featured: true,
    description: "Leading technology university in West Africa.",
    logo: "/logos/knust.png"
  },
  {
    id: 3,
    short_code: "UCC",
    name: "University of Cape Coast",
    city: "Cape Coast",
    region: "Central",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 220.00,
    student_population: 45000,
    established: 1962,
    website: "https://ucc.edu.gh",
    admissions_portal: "https://apply.ucc.edu.gh",
    payment_channels: ["MoMo", "Banks", "USSD"],
    featured: true,
    description: "Excellence in education and research.",
    logo: "/logos/ucc.png"
  },
  {
    id: 4,
    short_code: "UEW",
    name: "University of Education Winneba",
    city: "Winneba",
    region: "Central",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 255.00,
    student_population: 35000,
    established: 1992,
    website: "https://uew.edu.gh",
    payment_channels: ["MoMo", "Banks"],
    description: "Leading teacher education university in Ghana.",
    logo: "/logos/uew.png"
  },
  {
    id: 5,
    short_code: "UDS",
    name: "University for Development Studies",
    city: "Tamale",
    region: "Northern",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 200.00,
    student_population: 25000,
    established: 1992,
    website: "https://uds.edu.gh",
    payment_channels: ["MoMo", "Banks"],
    description: "Development-focused university serving Northern Ghana.",
    logo: "/logos/uds.png"
  },
  {
    id: 6,
    short_code: "UMAT",
    name: "University of Mines & Technology",
    city: "Tarkwa",
    region: "Western",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 230.00,
    student_population: 8000,
    established: 2004,
    website: "https://umat.edu.gh",
    payment_channels: ["Banks", "MoMo"],
    description: "Specialized mining and technology university.",
    logo: "/logos/umat.png"
  },
  {
    id: 7,
    short_code: "UHAS",
    name: "University of Health & Allied Sciences",
    city: "Ho",
    region: "Volta",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 230.00,
    student_population: 6000,
    established: 2011,
    website: "https://uhas.edu.gh",
    payment_channels: ["MoMo", "Ecobank"],
    description: "Specialized health sciences university.",
    logo: "/logos/uhas.png"
  },
  {
    id: 8,
    short_code: "UENR",
    name: "University of Energy & Natural Resources",
    city: "Sunyani",
    region: "Bono",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 220.00,
    student_population: 5000,
    established: 2011,
    website: "https://uenr.edu.gh",
    payment_channels: ["Banks", "MoMo"],
    description: "Energy and natural resources focused university.",
    logo: "/logos/uenr.png"
  },
  {
    id: 9,
    short_code: "UESD",
    name: "University of Environment & Sustainable Development",
    city: "Somanya",
    region: "Eastern",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 200.00,
    student_population: 3000,
    established: 2016,
    website: "https://uesd.edu.gh",
    payment_channels: ["Banks", "MoMo"],
    description: "Environmental sustainability and development focus.",
    logo: "/logos/uesd.png"
  },
  {
    id: 10,
    short_code: "CKT-UTAS",
    name: "CK Tedam University for Technology & Applied Sciences",
    city: "Navrongo",
    region: "Upper East",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    application_fee: 180.00,
    student_population: 2500,
    established: 2019,
    website: "https://cktutas.edu.gh",
    payment_channels: ["Banks", "MoMo"],
    description: "Technology and applied sciences university.",
    logo: "/logos/cktutas.png"
  },
  {
    id: 11,
    short_code: "GIMPA",
    name: "Ghana Institute of Management & Public Administration",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "PROFESSIONAL",
    status: "ACTIVE",
    application_fee: 200.00,
    student_population: 18000,
    established: 1961,
    website: "https://gimpa.edu.gh",
    admissions_portal: "https://apply.gimpa.edu.gh",
    payment_channels: ["MoMo", "CBG"],
    featured: true,
    description: "Premier management and public administration institute.",
    logo: "/logos/gimpa.png"
  },
  {
    id: 12,
    short_code: "GCTU",
    name: "Ghana Communication Technology University",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "PROFESSIONAL",
    status: "ACTIVE",
    application_fee: 250.00,
    student_population: 8000,
    established: 2005,
    website: "https://gctu.edu.gh",
    admissions_portal: "https://apply.gctu.edu.gh",
    payment_channels: ["MoMo", "CBG", "Visa"],
    description: "Communication technology specialized university.",
    logo: "/logos/gctu.png"
  },
  {
    id: 13,
    short_code: "ATU",
    name: "Accra Technical University",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    application_fee: 150.00,
    student_population: 15000,
    established: 1949,
    website: "https://atu.edu.gh",
    payment_channels: ["Banks", "MoMo"],
    description: "Technical and vocational education excellence.",
    logo: "/logos/atu.png"
  },
  {
    id: 14,
    short_code: "KTU",
    name: "Kumasi Technical University",
    city: "Kumasi",
    region: "Ashanti",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    application_fee: 150.00,
    student_population: 12000,
    established: 1954,
    website: "https://ktu.edu.gh",
    payment_channels: ["Banks", "MoMo"],
    description: "Leading technical university in Ashanti region.",
    logo: "/logos/ktu.png"
  },
  {
    id: 15,
    short_code: "ASHESI",
    name: "Ashesi University",
    city: "Berekuso",
    region: "Eastern",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    application_fee: 150.00,
    application_fee_usd: 25.00,
    student_population: 1500,
    established: 2002,
    website: "https://ashesi.edu.gh",
    admissions_portal: "https://ashesi.dreamapply.com",
    payment_channels: ["Online", "International"],
    featured: true,
    description: "Liberal arts education with African perspective.",
    logo: "/logos/ashesi.png",
    international_accreditation: ["WASC"]
  },
  {
    id: 16,
    short_code: "CENTRAL",
    name: "Central University",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    application_fee: 200.00,
    student_population: 12000,
    established: 1988,
    website: "https://central.edu.gh",
    admissions_portal: "https://central.edu.gh/online",
    payment_channels: ["MoMo", "Banks", "USSD"],
    featured: true,
    description: "Quality private education with Christian values.",
    logo: "/logos/central.png"
  },
  {
    id: 17,
    short_code: "VVU",
    name: "Valley View University",
    city: "Oyibi",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    application_fee: 150.00,
    student_population: 8000,
    established: 1979,
    website: "https://vvu.edu.gh",
    payment_channels: ["Bank Draft", "Cash"],
    description: "Seventh-day Adventist university.",
    logo: "/logos/vvu.png"
  },
  {
    id: 18,
    short_code: "LUG",
    name: "Lancaster University Ghana",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    application_fee: 0.00,
    registration_fee_usd: 900.00,
    student_population: 1000,
    established: 2018,
    website: "https://lancaster.edu.gh",
    payment_channels: ["Online", "International"],
    featured: true,
    description: "UK quality education in Ghana.",
    logo: "/logos/lancaster.png",
    international_accreditation: ["UK QAA"]
  },
  {
    id: 19,
    short_code: "ACITY",
    name: "Academic City University College",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    application_fee_usd: 30.00,
    application_fee: 330.00,
    student_population: 800,
    established: 2016,
    website: "https://acity.edu.gh",
    admissions_portal: "https://acity.edu.gh/admissions",
    payment_channels: ["MoMo", "Wire", "Ecobank"],
    description: "Research-intensive university college.",
    logo: "/logos/acity.png"
  },
  {
    id: 20,
    short_code: "REGENT",
    name: "Regent University College",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    application_fee: 100.00,
    student_population: 5000,
    established: 2003,
    website: "https://regent.edu.gh",
    payment_channels: ["Bank Slip", "Campus"],
    description: "Science and technology focused university college.",
    logo: "/logos/regent.png"
  }
];

const CATEGORIES = {
  'ALL': 'All Universities',
  'NATIONAL_PUBLIC': 'National Public',
  'TECHNICAL': 'Technical',
  'PROFESSIONAL': 'Professional',
  'CHARTERED_PRIVATE': 'Private'
};

const REGIONS = [
  'All Regions',
  'Greater Accra',
  'Ashanti', 
  'Central',
  'Eastern',
  'Northern',
  'Western',
  'Volta',
  'Upper East',
  'Upper West',
  'Bono'
];

export default function UniversitiesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [showFilters, setShowFilters] = useState(false);

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           uni.short_code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'ALL' || uni.category === selectedCategory;
      const matchesRegion = selectedRegion === 'All Regions' || uni.region === selectedRegion;
      
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [searchQuery, selectedCategory, selectedRegion]);

  const featuredUniversities = UNIVERSITIES.filter(uni => uni.featured);

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'NATIONAL_PUBLIC': return 'bg-blue-100 text-blue-800';
      case 'TECHNICAL': return 'bg-green-100 text-green-800';
      case 'PROFESSIONAL': return 'bg-purple-100 text-purple-800';
      case 'CHARTERED_PRIVATE': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  return (
    <CommonAppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-blue-600">UniBridge GH</span>
                <p className="text-sm text-gray-600">Universities</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/dashboard')}
              className="border-blue-200 hover:bg-blue-50"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your University
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and apply to {UNIVERSITIES.length}+ accredited tertiary institutions across Ghana.
            From traditional universities to technical and professional institutions.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search universities, cities, or codes..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                {Object.entries(CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                {REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                {Object.entries(CATEGORIES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-12 px-4 border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                {REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Featured Universities */}
        {searchQuery === '' && selectedCategory === 'ALL' && selectedRegion === 'All Regions' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-6 w-6 text-blue-500 mr-2" />
              Featured Universities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredUniversities.map((university) => (
                <Card key={university.id} className="hover:shadow-lg transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-blue-600">{university.short_code}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {university.name}
                        </h3>
                      </div>
                      <Star className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{university.city}, {university.region}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{university.student_population.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Est. {university.established}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>
                          {university.application_fee === 0 
                            ? "Free Application" 
                            : formatCurrency(university.application_fee)
                          }
                          {university.application_fee_usd && (
                            <span className="text-sm ml-1">/ ${university.application_fee_usd}</span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(university.category)}`}>
                        {CATEGORIES[university.category as keyof typeof CATEGORIES] || university.category}
                      </span>
                      <Button 
                        onClick={() => router.push(`/apply/${university.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery || selectedCategory !== 'ALL' || selectedRegion !== 'All Regions' 
              ? `Search Results (${filteredUniversities.length})`
              : `All Universities (${UNIVERSITIES.length})`
            }
          </h2>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((university) => (
            <Card key={university.id} className="hover:shadow-lg transition-all duration-300 hover:border-blue-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-600">{university.short_code}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {university.name}
                    </h3>
                  </div>
                  {university.status === 'ACTIVE' && (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {university.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{university.city}, {university.region}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{university.student_population.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Est. {university.established}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>
                      {university.application_fee === 0 
                        ? "Free Application" 
                        : formatCurrency(university.application_fee)
                      }
                      {university.application_fee_usd && (
                        <span className="text-xs ml-1">/ ${university.application_fee_usd}</span>
                      )}
                    </span>
                  </div>
                  {university.international_accreditation && (
                    <div className="flex items-center text-gray-600 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>{university.international_accreditation.join(', ')} Accredited</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(university.category)}`}>
                      {CATEGORIES[university.category as keyof typeof CATEGORIES] || university.category}
                    </span>
                    {university.admissions_portal && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(university.admissions_portal, '_blank')}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => router.push(`/apply/${university.id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Apply Now
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => router.push(`/universities/${university.id}`)}
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters to find more results.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedRegion('All Regions');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
    </CommonAppLayout>
  );
}
