/**
 * New Features for UniBridge GH based on comprehensive institution data
 * 
 * 1. Advanced Institution Filtering & Search
 * 2. Payment Channel Integration 
 * 3. Regional University Discovery
 * 4. International Accreditation Tracking
 * 5. Application Fee Comparison
 * 6. University Type Categorization
 * 7. Student Population Analytics
 * 8. Establishment Timeline
 * 9. Multi-Currency Support
 * 10. USSD Payment Integration
 */

// 1. ADVANCED FILTERING SYSTEM
export const ADVANCED_FILTERS = {
  categories: {
    'NATIONAL_PUBLIC': 'National Public Universities (15)',
    'TECHNICAL': 'Technical Universities (10)', 
    'PROFESSIONAL': 'Professional Universities (11)',
    'CHARTERED_PRIVATE': 'Chartered Private Universities (24)',
    'AFFILIATED_PRIVATE': 'Affiliated Private Colleges (40+)'
  },
  
  regions: [
    { name: 'Greater Accra', count: 12, universities: ['UG', 'GIMPA', 'GCTU', 'ATU', 'CENTRAL', 'ASHESI', 'LUG', 'ACITY', 'REGENT'] },
    { name: 'Ashanti', count: 8, universities: ['KNUST', 'KTU', 'AAMUSTED'] },
    { name: 'Central', count: 4, universities: ['UCC', 'UEW', 'CCTU'] },
    { name: 'Eastern', count: 3, universities: ['UESD', 'ASHESI', 'PUG'] },
    { name: 'Northern', count: 2, universities: ['UDS', 'TAMALE_TU'] },
    { name: 'Western', count: 2, universities: ['UMAT', 'TAKORADI_TU'] },
    { name: 'Volta', count: 2, universities: ['UHAS', 'HTU'] },
    { name: 'Upper East', count: 2, universities: ['CKT-UTAS', 'BOLGATANGA_TU'] },
    { name: 'Upper West', count: 2, universities: ['SDD-UBIDS', 'WA_TU'] },
    { name: 'Bono', count: 2, universities: ['UENR', 'SUNYANI_TU'] }
  ],

  student_population: [
    { range: '50,000+', label: 'Very Large', universities: ['KNUST'] },
    { range: '30,000-50,000', label: 'Large', universities: ['UG', 'UCC', 'UEW'] },
    { range: '10,000-30,000', label: 'Medium', universities: ['UDS', 'ATU', 'GIMPA', 'CENTRAL'] },
    { range: '5,000-10,000', label: 'Small', universities: ['UMAT', 'UHAS', 'VVU'] },
    { range: '<5,000', label: 'Boutique', universities: ['ASHESI', 'LUG', 'ACITY'] }
  ],

  application_fees: [
    { range: 'Free', count: 3, universities: ['LUG', 'AIT', 'WEBSTER'] },
    { range: 'GHS 100-200', count: 8, universities: ['UDS', 'UESD', 'CKT-UTAS', 'ATU', 'ASHESI', 'VVU'] },
    { range: 'GHS 200-250', count: 6, universities: ['UG', 'UCC', 'GIMPA', 'CENTRAL'] },
    { range: 'GHS 250+', count: 3, universities: ['KNUST', 'GCTU', 'ACITY'] }
  ]
};

// 2. PAYMENT CHANNEL INTEGRATION
export const PAYMENT_CHANNELS = {
  momo: {
    name: 'Mobile Money',
    providers: ['MTN', 'Vodafone', 'AirtelTigo'],
    ussd_codes: {
      'UG': '*887*37#',
      'KNUST': '*415*55#', 
      'UCC': '*887*9#',
      'UHAS': '*920*224*1#',
      'GCTU': '*924*200*3#',
      'CENTRAL': '*887*9#',
      'PUG': '*887*9#'
    },
    supported_universities: 15
  },
  
  banks: {
    all_banks: ['GCB', 'Ecobank', 'CAL Bank', 'Fidelity', 'Standard Chartered', 'Absa', 'NIB'],
    specialized: {
      'CBG': ['GIMPA', 'GCTU'],
      'Ecobank': ['UHAS', 'ACITY'],
      'Ghana_Post': ['KNUST', 'UCC']
    }
  },
  
  international: {
    providers: ['Visa', 'Mastercard', 'PayPal', 'Wire Transfer'],
    currencies: ['USD', 'EUR', 'GBP'],
    universities: ['ASHESI', 'LUG', 'ACITY', 'WEBSTER']
  }
};

// 3. INTERNATIONAL ACCREDITATION TRACKING
export const INTERNATIONAL_ACCREDITATIONS = {
  'WASC': {
    name: 'Western Association of Schools and Colleges',
    region: 'USA',
    universities: ['ASHESI'],
    prestige: 'High'
  },
  'UK_QAA': {
    name: 'UK Quality Assurance Agency',
    region: 'United Kingdom', 
    universities: ['LUG'],
    prestige: 'High'
  },
  'HLC': {
    name: 'Higher Learning Commission',
    region: 'USA',
    universities: ['WEBSTER'],
    prestige: 'High'
  }
};

// 4. UNIVERSITY ANALYTICS & INSIGHTS
export const UNIVERSITY_ANALYTICS = {
  total_institutions: 100,
  breakdown: {
    public: 60,
    private: 40,
    national_public: 15,
    technical: 10,
    professional: 11,
    chartered_private: 24,
    affiliated_private: 40
  },
  
  regional_distribution: {
    'Greater_Accra': 25,
    'Ashanti': 15,
    'Central': 8,
    'Eastern': 6,
    'Northern': 5,
    'Western': 5,
    'Volta': 4,
    'Upper_East': 3,
    'Upper_West': 3,
    'Bono': 3,
    'Others': 23
  },
  
  establishment_timeline: {
    'Before_1960': 5,  // UG, GIMPA, etc.
    '1960s': 8,       // UCC, KNUST, etc.
    '1970s': 6,       // VVU, etc.
    '1980s': 8,       // CENTRAL, etc.
    '1990s': 15,      // UEW, UDS, etc.
    '2000s': 25,      // ASHESI, UHAS, etc.
    '2010s': 20,      // UENR, UESD, etc.
    '2020s': 13       // Recent establishments
  }
};

// 5. ENHANCED SEARCH CAPABILITIES
export const SEARCH_FEATURES = {
  smart_search: {
    aliases: {
      'UG': ['University of Ghana', 'Legon', 'UG Legon'],
      'KNUST': ['KNUST', 'Tech', 'UST', 'Kwame Nkrumah'],
      'UCC': ['Cape Coast', 'UCC', 'University of Cape Coast'],
      'ASHESI': ['Ashesi', 'Berekuso']
    },
    
    program_search: {
      'Computer Science': ['UG', 'KNUST', 'ASHESI', 'GCTU', 'ACITY'],
      'Medicine': ['UG', 'KNUST', 'UCC', 'UHAS'],
      'Engineering': ['KNUST', 'UG', 'UMAT', 'ATU', 'KTU'],
      'Business': ['UG', 'GIMPA', 'ASHESI', 'CENTRAL', 'UPSA'],
      'Education': ['UEW', 'UCC', 'UG', 'UDS']
    },
    
    location_search: {
      'Accra': ['UG', 'GIMPA', 'GCTU', 'ATU', 'CENTRAL', 'LUG', 'ACITY', 'REGENT'],
      'Kumasi': ['KNUST', 'KTU', 'AAMUSTED'],
      'Cape Coast': ['UCC', 'CCTU'],
      'Ho': ['UHAS', 'HTU']
    }
  }
};

// 6. APPLICATION DEADLINE MANAGEMENT
export const APPLICATION_DEADLINES = {
  academic_year: '2025/2026',
  cycles: {
    early_admission: {
      deadline: '2024-12-15',
      universities: ['ASHESI', 'LUG', 'ACITY'],
      benefits: ['Priority consideration', 'Scholarship eligibility']
    },
    
    regular_admission: {
      deadline: '2025-03-31',
      universities: 'ALL_PUBLIC',
      note: 'Most public universities follow this timeline'
    },
    
    late_admission: {
      deadline: '2025-06-30', 
      universities: 'SELECTED_PRIVATE',
      additional_fee: 50.00
    }
  }
};

// 7. ELIGIBILITY CHECKER
export const ELIGIBILITY_RULES = {
  wassce_requirements: {
    public_universities: {
      aggregate_max: 36,
      core_subjects: ['Core Maths', 'English', 'Integrated Science', 'Social Studies'],
      min_grade: 'C6',
      elective_subjects: 3
    },
    
    private_universities: {
      aggregate_max: 'Flexible',
      core_subjects: ['Core Maths', 'English'],
      min_grade: 'D7',
      note: 'More flexible admission criteria'
    },
    
    technical_universities: {
      aggregate_max: 42,
      core_subjects: ['Core Maths', 'English', 'Integrated Science'],
      technical_subjects: ['Physics', 'Chemistry', 'Elective Maths'],
      min_grade: 'C6'
    }
  }
};

// 8. FINANCIAL AID & SCHOLARSHIPS
export const FINANCIAL_AID = {
  government_scholarships: {
    'GETFUND': {
      coverage: 'Full tuition',
      eligibility: 'Need-based',
      universities: 'ALL_PUBLIC'
    },
    'District_Assembly_Scholarship': {
      coverage: 'Partial tuition',
      eligibility: 'District resident',
      universities: 'ALL'
    }
  },
  
  university_scholarships: {
    'ASHESI': ['Full Merit Scholarship', 'Partial Merit Scholarship', 'Need-based Aid'],
    'LUG': ['Lancaster Scholarship', 'Ghana Excellence Award'],
    'ACITY': ['Academic Excellence Scholarship', 'Need-based Waiver'],
    'KNUST': ['Chancellor\'s Scholarship', 'Faculty Scholarship'],
    'UG': ['Commonwealth Scholarship', 'Vice-Chancellor\'s Award']
  }
};

// 9. MULTI-LANGUAGE SUPPORT
export const LANGUAGE_SUPPORT = {
  primary: 'English',
  local_languages: {
    'Twi': 'For Ashanti region universities',
    'Ga': 'For Greater Accra universities', 
    'Ewe': 'For Volta region universities',
    'Dagbani': 'For Northern region universities'
  },
  
  international_languages: {
    'French': 'For international students',
    'Arabic': 'For Islamic University College',
    'Portuguese': 'For ECOWAS students'
  }
};

// 10. REAL-TIME STATISTICS
export const REAL_TIME_STATS = {
  application_season: '2025/2026',
  
  current_metrics: {
    total_applications: 0,
    applications_by_category: {
      'NATIONAL_PUBLIC': 0,
      'TECHNICAL': 0,
      'PROFESSIONAL': 0,
      'CHARTERED_PRIVATE': 0
    },
    
    most_popular_universities: [],
    average_applications_per_student: 0,
    completion_rates: {
      profile: 0,
      applications: 0,
      submissions: 0
    }
  }
};

export default {
  ADVANCED_FILTERS,
  PAYMENT_CHANNELS,
  INTERNATIONAL_ACCREDITATIONS,
  UNIVERSITY_ANALYTICS,
  SEARCH_FEATURES,
  APPLICATION_DEADLINES,
  ELIGIBILITY_RULES,
  FINANCIAL_AID,
  LANGUAGE_SUPPORT,
  REAL_TIME_STATS
};
