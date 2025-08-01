/**
 * True Common Application System for Ghana
 * 
 * CORE CONCEPT:
 * - ONE common application with standard sections (personal, academic, essays)
 * - Each university adds SUPPLEMENT questions
 * - Students fill common app once, then answer supplements per school
 * - Submit to multiple universities with one common app + their specific supplements
 */

// 1. COMMON APPLICATION STRUCTURE
export const COMMON_APPLICATION_SECTIONS = {
  personal_information: {
    id: 'personal',
    title: 'Personal Information',
    description: 'Basic details used by all universities',
    fields: [
      {
        key: 'first_name',
        type: 'text',
        label: 'First Name',
        required: true,
        common: true
      },
      {
        key: 'last_name', 
        type: 'text',
        label: 'Last Name',
        required: true,
        common: true
      },
      {
        key: 'date_of_birth',
        type: 'date',
        label: 'Date of Birth',
        required: true,
        common: true
      },
      {
        key: 'phone',
        type: 'text',
        label: 'Phone Number',
        required: true,
        common: true
      },
      {
        key: 'address',
        type: 'longtext',
        label: 'Home Address',
        required: true,
        common: true
      },
      {
        key: 'region',
        type: 'select',
        label: 'Region of Origin',
        required: true,
        common: true,
        options: [
          'Greater Accra', 'Ashanti', 'Central', 'Eastern', 'Northern',
          'Western', 'Volta', 'Upper East', 'Upper West', 'Bono'
        ]
      }
    ]
  },

  academic_background: {
    id: 'academic',
    title: 'Academic Background',
    description: 'Educational history shared with all universities',
    fields: [
      {
        key: 'high_school_name',
        type: 'text',
        label: 'Secondary School Name',
        required: true,
        common: true
      },
      {
        key: 'graduation_year',
        type: 'number',
        label: 'Graduation Year',
        required: true,
        common: true
      },
      {
        key: 'wassce_results',
        type: 'wassce_grid',
        label: 'WASSCE Results',
        required: true,
        common: true,
        description: 'Enter your WASSCE grades - used by all universities for eligibility'
      },
      {
        key: 'additional_qualifications',
        type: 'longtext',
        label: 'Other Qualifications',
        required: false,
        common: true,
        placeholder: 'Any other certificates, awards, or qualifications'
      }
    ]
  },

  essays: {
    id: 'essays',
    title: 'Common Essays',
    description: 'Personal statements used by multiple universities',
    fields: [
      {
        key: 'personal_statement',
        type: 'longtext',
        label: 'Personal Statement',
        required: true,
        common: true,
        minLength: 250,
        maxLength: 2000,
        description: 'Tell us about yourself, your goals, and why you want to pursue higher education'
      },
      {
        key: 'why_ghana_university',
        type: 'longtext',
        label: 'Why Study in Ghana?',
        required: true,
        common: true,
        minLength: 150,
        maxLength: 1000,
        description: 'Why did you choose to study at a Ghanaian university?'
      }
    ]
  },

  extracurricular: {
    id: 'activities',
    title: 'Activities & Experience',
    description: 'Leadership, work, and volunteer experiences',
    fields: [
      {
        key: 'activities_list',
        type: 'activities_list',
        label: 'Activities and Leadership',
        required: false,
        common: true,
        maxEntries: 10,
        description: 'List up to 10 activities, jobs, or leadership experiences'
      },
      {
        key: 'honors_awards',
        type: 'longtext',
        label: 'Honors and Awards',
        required: false,
        common: true,
        maxLength: 1000
      }
    ]
  }
};

// 2. UNIVERSITY-SPECIFIC SUPPLEMENTS
export const UNIVERSITY_SUPPLEMENTS = {
  UG: {
    institution: 'University of Ghana',
    supplement_title: 'University of Ghana Supplement',
    required: true,
    sections: [
      {
        id: 'ug_programs',
        title: 'Program Selection',
        fields: [
          {
            key: 'first_choice_program',
            type: 'select',
            label: 'First Choice Program',
            required: true,
            options: [
              'BSc Computer Science',
              'BA Economics', 
              'BSc Psychology',
              'BA English',
              'BSc Mathematics',
              'Medicine',
              'Law'
            ]
          },
          {
            key: 'second_choice_program',
            type: 'select',
            label: 'Second Choice Program',
            required: false,
            options: [
              'BSc Computer Science',
              'BA Economics',
              'BSc Psychology', 
              'BA English',
              'BSc Mathematics'
            ]
          }
        ]
      },
      {
        id: 'ug_essays',
        title: 'UG-Specific Essays',
        fields: [
          {
            key: 'why_ug',
            type: 'longtext',
            label: 'Why University of Ghana?',
            required: true,
            minLength: 300,
            maxLength: 1500,
            description: 'What specifically draws you to UG? How will you contribute to the UG community?'
          }
        ]
      }
    ],
    validation_rules: [
      {
        expr: 'second_choice_program != first_choice_program',
        error: 'Second choice must be different from first choice'
      }
    ],
    fees: {
      application_fee: 220,
      currency: 'GHS'
    }
  },

  KNUST: {
    institution: 'Kwame Nkrumah University of Science & Technology',
    supplement_title: 'KNUST Supplement',
    required: true,
    sections: [
      {
        id: 'knust_programs',
        title: 'Program Selection',
        fields: [
          {
            key: 'preferred_program',
            type: 'select',
            label: 'Preferred Program',
            required: true,
            options: [
              'BSc Computer Engineering',
              'BSc Electrical Engineering',
              'BSc Mechanical Engineering',
              'BSc Civil Engineering',
              'BSc Computer Science',
              'Medicine',
              'Pharmacy',
              'Architecture'
            ]
          },
          {
            key: 'technical_background',
            type: 'longtext',
            label: 'Technical Background & Interest',
            required: true,
            minLength: 200,
            maxLength: 1000,
            description: 'Describe your interest in science/technology and any relevant experience'
          }
        ]
      },
      {
        id: 'knust_essays',
        title: 'KNUST-Specific Essays',
        fields: [
          {
            key: 'innovation_essay',
            type: 'longtext',
            label: 'Innovation and Problem-Solving',
            required: true,
            minLength: 400,
            maxLength: 1500,
            description: 'Describe a problem you would like to solve using science and technology. How would you approach it?'
          }
        ]
      }
    ],
    validation_rules: [],
    fees: {
      application_fee: 290,
      currency: 'GHS'
    }
  },

  ASHESI: {
    institution: 'Ashesi University',
    supplement_title: 'Ashesi University Supplement',
    required: true,
    sections: [
      {
        id: 'ashesi_programs',
        title: 'Program Selection',
        fields: [
          {
            key: 'intended_major',
            type: 'select',
            label: 'Intended Major',
            required: true,
            options: [
              'Computer Science',
              'Business Administration',
              'Electrical & Electronic Engineering',
              'Mechanical Engineering',
              'Management Information Systems'
            ]
          }
        ]
      },
      {
        id: 'ashesi_values',
        title: 'Ashesi Values & Leadership',
        fields: [
          {
            key: 'leadership_example',
            type: 'longtext',
            label: 'Leadership Experience',
            required: true,
            minLength: 300,
            maxLength: 1200,
            description: 'Describe a specific leadership experience and what you learned from it'
          },
          {
            key: 'ethical_dilemma',
            type: 'longtext',
            label: 'Ethical Decision Making',
            required: true,
            minLength: 300,
            maxLength: 1200,
            description: 'Describe a time when you had to make a difficult ethical decision'
          }
        ]
      }
    ],
    validation_rules: [],
    fees: {
      application_fee: 150,
      currency: 'GHS'
    }
  },

  CENTRAL: {
    institution: 'Central University',
    supplement_title: 'Central University Supplement',
    required: true,
    sections: [
      {
        id: 'central_programs',
        title: 'Program Selection',
        fields: [
          {
            key: 'program_choice',
            type: 'select',
            label: 'Program Choice',
            required: true,
            options: [
              'BSc Computer Science',
              'BSc Information Technology',
              'BA Communication Studies',
              'BSc Nursing',
              'MBA',
              'BBA Business Administration'
            ]
          }
        ]
      },
      {
        id: 'central_motivation',
        title: 'Motivation & Goals',
        fields: [
          {
            key: 'career_goals',
            type: 'longtext',
            label: 'Career Goals',
            required: true,
            minLength: 250,
            maxLength: 1000,
            description: 'What are your career goals and how will Central University help you achieve them?'
          }
        ]
      }
    ],
    validation_rules: [],
    fees: {
      application_fee: 200,
      currency: 'GHS'
    }
  }
};

// 3. APPLICATION WORKFLOW
export const APPLICATION_WORKFLOW = {
  steps: [
    {
      id: 'common_app',
      title: 'Complete Common Application',
      description: 'Fill out personal info, academic background, and essays once',
      required: true,
      order: 1
    },
    {
      id: 'select_schools',
      title: 'Select Universities',
      description: 'Choose which universities you want to apply to',
      required: true,
      order: 2
    },
    {
      id: 'supplements',
      title: 'Complete Supplements',
      description: 'Answer each university\'s specific questions',
      required: true,
      order: 3
    },
    {
      id: 'review_submit',
      title: 'Review & Submit',
      description: 'Review applications and submit to selected universities',
      required: true,
      order: 4
    }
  ]
};

// 4. SUBMISSION MODEL
export const SUBMISSION_MODEL = {
  // Student submits to multiple universities with:
  // 1. Common application data (same for all)
  // 2. University-specific supplement answers
  // 3. Separate application fee per university
  // 4. Individual tracking per university

  structure: {
    common_application: {
      // Filled once, used by all universities
      personal_information: {},
      academic_background: {},
      essays: {},
      extracurricular: {}
    },
    
    university_applications: [
      {
        university_id: 'UG',
        supplement_answers: {
          // UG-specific questions
        },
        status: 'SUBMITTED',
        fee_paid: true,
        submitted_at: '2025-03-15T10:30:00Z',
        decision: null
      },
      {
        university_id: 'KNUST',
        supplement_answers: {
          // KNUST-specific questions
        },
        status: 'DRAFT',
        fee_paid: false,
        submitted_at: null,
        decision: null
      }
    ]
  }
};

// 5. BENEFITS OF TRUE COMMON APP MODEL
export const COMMON_APP_BENEFITS = {
  for_students: [
    'Fill personal info, academics, and main essays only ONCE',
    'Apply to multiple universities efficiently',
    'Compare university requirements side-by-side',
    'Track all applications in one dashboard',
    'Reduce redundant data entry by 70%+'
  ],

  for_universities: [
    'Get standardized core information from all applicants',
    'Focus supplements on what makes their school unique',
    'Easier to compare applicants on common criteria',
    'Reduced administrative burden',
    'Access to qualified students who might not have applied otherwise'
  ],

  for_system: [
    'Increased university application rates',
    'Better matching of students to appropriate schools', 
    'Standardized data for analysis and improvement',
    'Reduced barriers to higher education access'
  ]
};

export default {
  COMMON_APPLICATION_SECTIONS,
  UNIVERSITY_SUPPLEMENTS,
  APPLICATION_WORKFLOW,
  SUBMISSION_MODEL,
  COMMON_APP_BENEFITS
};
