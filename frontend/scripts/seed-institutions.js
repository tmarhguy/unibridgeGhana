/**
 * Comprehensive Ghana Universities & Tertiary Institutions Seed Data
 * Based on GTEC accredited institutions as of July 2025
 * Source: literature.md lines 1091+
 */

const INSTITUTIONS_DATA = [
  // NATIONAL PUBLIC UNIVERSITIES (15)
  {
    short_code: "UG",
    name: "University of Ghana",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@ug.edu.gh",
    website: "https://admissions.ug.edu.gh",
    admissions_portal: "https://admissions.ug.edu.gh/undergraduate/how-to-apply",
    application_fee: 220.00,
    payment_channels: {
      ussd: ["*887*37#"],
      banks: ["All Banks", "Ghana Post"],
      momo: true,
      online: true
    },
    established: 1948,
    student_population: 38000,
    accreditation: "GTEC",
    eligibility_rules: {
      aggregate_max: 24,
      core_subjects: ["Core Maths", "English", "Integrated Science"],
      min_credits: 6
    }
  },
  {
    short_code: "KNUST",
    name: "Kwame Nkrumah University of Science & Technology",
    city: "Kumasi",
    region: "Ashanti",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@knust.edu.gh",
    website: "https://knust.edu.gh",
    admissions_portal: "https://apps.knust.edu.gh/admissions",
    application_fee: 290.00,
    payment_channels: {
      ussd: ["*415*55#"],
      banks: ["All Banks", "Ghana Post"],
      momo: true,
      online: true
    },
    established: 1952,
    student_population: 60000,
    accreditation: "GTEC",
    eligibility_rules: {
      aggregate_max: 24,
      core_subjects: ["Core Maths", "English", "Integrated Science"],
      min_credits: 6
    }
  },
  {
    short_code: "UCC",
    name: "University of Cape Coast",
    city: "Cape Coast",
    region: "Central",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@ucc.edu.gh",
    website: "https://ucc.edu.gh",
    admissions_portal: "https://apply.ucc.edu.gh",
    application_fee: 220.00,
    payment_channels: {
      ussd: ["*887*9#"],
      banks: ["All Banks", "Ghana Post"],
      momo: true,
      online: true
    },
    established: 1962,
    student_population: 45000,
    accreditation: "GTEC",
    eligibility_rules: {
      aggregate_max: 30,
      core_subjects: ["Core Maths", "English", "Integrated Science"],
      min_credits: 6
    }
  },
  {
    short_code: "UEW",
    name: "University of Education Winneba",
    city: "Winneba",
    region: "Central",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@uew.edu.gh",
    website: "https://uew.edu.gh",
    admissions_portal: "https://uew.edu.gh/admissions",
    application_fee: 255.00,
    payment_channels: {
      ussd: ["*887*37#"],
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1992,
    student_population: 35000,
    accreditation: "GTEC"
  },
  {
    short_code: "UDS",
    name: "University for Development Studies",
    city: "Tamale",
    region: "Northern",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@uds.edu.gh",
    website: "https://uds.edu.gh",
    admissions_portal: "https://uds.edu.gh/admissions",
    application_fee: 200.00,
    payment_channels: {
      ussd: ["*887*37#"],
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1992,
    student_population: 25000,
    accreditation: "GTEC"
  },
  {
    short_code: "UMAT",
    name: "University of Mines & Technology",
    city: "Tarkwa",
    region: "Western",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@umat.edu.gh",
    website: "https://umat.edu.gh",
    admissions_portal: "https://umat.edu.gh/admissions",
    application_fee: 230.00,
    payment_channels: {
      banks: ["All Banks", "Ghana Post"],
      momo: true,
      online: true
    },
    established: 2004,
    student_population: 8000,
    accreditation: "GTEC"
  },
  {
    short_code: "UHAS",
    name: "University of Health & Allied Sciences",
    city: "Ho",
    region: "Volta",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@uhas.edu.gh",
    website: "https://uhas.edu.gh",
    admissions_portal: "https://admissions.uhas.edu.gh",
    application_fee: 230.00,
    payment_channels: {
      ussd: ["*920*224*1#"],
      banks: ["Ecobank"],
      momo: true,
      online: true
    },
    established: 2011,
    student_population: 6000,
    accreditation: "GTEC"
  },
  {
    short_code: "UENR",
    name: "University of Energy & Natural Resources",
    city: "Sunyani",
    region: "Bono",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@uenr.edu.gh",
    website: "https://uenr.edu.gh",
    admissions_portal: "https://uenr.edu.gh/admissions",
    application_fee: 220.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 2011,
    student_population: 5000,
    accreditation: "GTEC"
  },
  {
    short_code: "UESD",
    name: "University of Environment & Sustainable Development",
    city: "Somanya",
    region: "Eastern",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@uesd.edu.gh",
    website: "https://uesd.edu.gh",
    admissions_portal: "https://uesd.edu.gh/admissions",
    application_fee: 200.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 2016,
    student_population: 3000,
    accreditation: "GTEC"
  },
  {
    short_code: "CKT-UTAS",
    name: "CK Tedam University for Technology & Applied Sciences",
    city: "Navrongo",
    region: "Upper East",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@cktutas.edu.gh",
    website: "https://cktutas.edu.gh",
    admissions_portal: "https://cktutas.edu.gh/admissions",
    application_fee: 180.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 2019,
    student_population: 2500,
    accreditation: "GTEC"
  },
  {
    short_code: "SDD-UBIDS",
    name: "Simon Diedong Dombo University for Business & Integrated Development Studies",
    city: "Wa",
    region: "Upper West",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@ubids.edu.gh",
    website: "https://ubids.edu.gh",
    application_fee: 180.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 2019,
    student_population: 2000,
    accreditation: "GTEC"
  },
  {
    short_code: "AAMUSTED",
    name: "Akenten Appiah-Menkah University of Skills Training & Entrepreneurial Development",
    city: "Kumasi",
    region: "Ashanti",
    type: "PUBLIC",
    category: "NATIONAL_PUBLIC",
    status: "ACTIVE",
    contact_email: "admissions@aamusted.edu.gh",
    website: "https://aamusted.edu.gh",
    application_fee: 200.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 2016,
    student_population: 4000,
    accreditation: "GTEC"
  },
  {
    short_code: "UPSA",
    name: "University of Professional Studies Accra",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "PROFESSIONAL",
    status: "ACTIVE",
    contact_email: "admissions@upsa.edu.gh",
    website: "https://upsa.edu.gh",
    application_fee: 200.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1965,
    student_population: 18000,
    accreditation: "GTEC"
  },
  {
    short_code: "GIMPA",
    name: "Ghana Institute of Management & Public Administration",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "PROFESSIONAL",
    status: "ACTIVE",
    contact_email: "admissions@gimpa.edu.gh",
    website: "https://gimpa.edu.gh",
    admissions_portal: "https://apply.gimpa.edu.gh",
    application_fee: 200.00,
    payment_channels: {
      momo: true,
      banks: ["CBG"],
      online: true
    },
    established: 1961,
    student_population: 18000,
    accreditation: "GTEC"
  },
  {
    short_code: "GCTU",
    name: "Ghana Communication Technology University",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "PROFESSIONAL",
    status: "ACTIVE",
    contact_email: "admissions@gctu.edu.gh",
    website: "https://gctu.edu.gh",
    admissions_portal: "https://apply.gctu.edu.gh",
    application_fee: 250.00,
    payment_channels: {
      ussd: ["*924*200*3#"],
      banks: ["CBG"],
      momo: true,
      online: true
    },
    established: 2005,
    student_population: 8000,
    accreditation: "GTEC"
  },

  // TECHNICAL UNIVERSITIES (10)
  {
    short_code: "ATU",
    name: "Accra Technical University",
    city: "Accra",
    region: "Greater Accra",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    contact_email: "admissions@atu.edu.gh",
    website: "https://atu.edu.gh",
    admissions_portal: "https://atu.edu.gh/admissions",
    application_fee: 150.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1949,
    student_population: 15000,
    accreditation: "GTEC"
  },
  {
    short_code: "KTU",
    name: "Kumasi Technical University",
    city: "Kumasi",
    region: "Ashanti",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    contact_email: "admissions@ktu.edu.gh",
    website: "https://ktu.edu.gh",
    admissions_portal: "https://ktu.edu.gh/admissions",
    application_fee: 150.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1954,
    student_population: 12000,
    accreditation: "GTEC"
  },
  {
    short_code: "CCTU",
    name: "Cape Coast Technical University",
    city: "Cape Coast",
    region: "Central",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    contact_email: "admissions@cctu.edu.gh",
    website: "https://cctu.edu.gh",
    application_fee: 150.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1968,
    student_population: 8000,
    accreditation: "GTEC"
  },
  {
    short_code: "HTU",
    name: "Ho Technical University",
    city: "Ho",
    region: "Volta",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    contact_email: "admissions@htu.edu.gh",
    website: "https://htu.edu.gh",
    application_fee: 150.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1968,
    student_population: 6000,
    accreditation: "GTEC"
  },
  {
    short_code: "KofTU",
    name: "Koforidua Technical University",
    city: "Koforidua",
    region: "Eastern",
    type: "PUBLIC",
    category: "TECHNICAL",
    status: "ACTIVE",
    contact_email: "admissions@koftu.edu.gh",
    website: "https://koftu.edu.gh",
    application_fee: 150.00,
    payment_channels: {
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1997,
    student_population: 5500,
    accreditation: "GTEC"
  },

  // CHARTERED PRIVATE UNIVERSITIES (Top 10)
  {
    short_code: "ASHESI",
    name: "Ashesi University",
    city: "Berekuso",
    region: "Eastern",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@ashesi.edu.gh",
    website: "https://ashesi.edu.gh",
    admissions_portal: "https://ashesi.dreamapply.com",
    application_fee: 150.00,
    application_fee_usd: 25.00,
    payment_channels: {
      online: true,
      international: true
    },
    established: 2002,
    student_population: 1500,
    accreditation: "GTEC",
    international_accreditation: ["WASC"],
    eligibility_rules: {
      min_wassce_credits: 6,
      core_subjects: ["Core Maths", "English"],
      min_grade: "C6"
    }
  },
  {
    short_code: "CENTRAL",
    name: "Central University",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@central.edu.gh",
    website: "https://central.edu.gh",
    admissions_portal: "https://central.edu.gh/online",
    application_fee: 200.00,
    payment_channels: {
      ussd: ["*887*9#"],
      banks: ["All Banks"],
      momo: true,
      online: true
    },
    established: 1988,
    student_population: 12000,
    accreditation: "GTEC"
  },
  {
    short_code: "VVU",
    name: "Valley View University",
    city: "Oyibi",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@vvu.edu.gh",
    website: "https://vvu.edu.gh",
    application_fee: 150.00,
    payment_channels: {
      banks: ["Bank Draft", "Cash"],
      momo: false,
      online: false
    },
    established: 1979,
    student_population: 8000,
    accreditation: "GTEC"
  },
  {
    short_code: "REGENT",
    name: "Regent University College",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@regent.edu.gh",
    website: "https://regent.edu.gh",
    application_fee: 100.00,
    payment_channels: {
      banks: ["Bank Slip"],
      campus: true,
      momo: false
    },
    established: 2003,
    student_population: 5000,
    accreditation: "GTEC"
  },
  {
    short_code: "PUG",
    name: "Presbyterian University Ghana",
    city: "Abetifi",
    region: "Eastern",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@presbyuniversity.edu.gh",
    website: "https://presbyuniversity.edu.gh",
    application_fee: 150.00,
    payment_channels: {
      ussd: ["*887*9#"],
      banks: ["Bank Draft"],
      momo: true,
      online: true
    },
    established: 2003,
    student_population: 6000,
    accreditation: "GTEC"
  },
  {
    short_code: "PENTVARS",
    name: "Pentecost University",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE", 
    status: "ACTIVE",
    contact_email: "admissions@pentvars.edu.gh",
    website: "https://pentvars.edu.gh",
    admissions_portal: "https://pentvars.edu.gh/online-app",
    application_fee: 120.00,
    payment_channels: {
      banks: ["Banker's Draft"],
      online: true,
      momo: true
    },
    established: 2005,
    student_population: 7000,
    accreditation: "GTEC"
  },
  {
    short_code: "LUG",
    name: "Lancaster University Ghana",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@lancaster.edu.gh",
    website: "https://lancaster.edu.gh",
    application_fee: 0.00, // No application fee
    registration_fee_usd: 900.00,
    payment_channels: {
      usd: true,
      ghs: true,
      online: true
    },
    established: 2018,
    student_population: 1000,
    accreditation: "GTEC",
    international_accreditation: ["UK QAA"]
  },
  {
    short_code: "ACITY",
    name: "Academic City University College",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@acity.edu.gh",
    website: "https://acity.edu.gh",
    admissions_portal: "https://acity.edu.gh/admissions",
    application_fee_usd: 30.00,
    application_fee: 330.00, // Approx GHS equivalent
    payment_channels: {
      momo: true,
      wire: true,
      banks: ["Ecobank"],
      online: true
    },
    established: 2016,
    student_population: 800,
    accreditation: "GTEC"
  },
  {
    short_code: "AIT",
    name: "Accra Institute of Technology",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@ait.edu.gh",
    website: "https://ait.edu.gh",
    admissions_portal: "https://admissions.ait.edu.gh",
    application_fee: 0.00, // Fee waived till Dec 3
    payment_channels: {
      banks: ["GCB"],
      voucher: true,
      momo: true
    },
    established: 2006,
    student_population: 2500,
    accreditation: "GTEC"
  },
  {
    short_code: "WEBSTER",
    name: "Webster University Ghana",
    city: "Accra",
    region: "Greater Accra",
    type: "PRIVATE",
    category: "CHARTERED_PRIVATE",
    status: "ACTIVE",
    contact_email: "admissions@webster.edu.gh",
    website: "https://webster.edu",
    admissions_portal: "https://commonapp.org/explore/webster-university",
    application_fee: 0.00, // Free first-year application
    payment_channels: {
      online: true,
      international: true
    },
    established: 2019,
    student_population: 500,
    accreditation: "GTEC",
    international_accreditation: ["HLC"]
  }
];

// Helper function to generate regions data
const GHANA_REGIONS = [
  "Greater Accra", "Ashanti", "Northern", "Eastern", "Western", 
  "Central", "Volta", "Upper East", "Upper West", "Brong Ahafo",
  "Bono", "Bono East", "Ahafo", "Oti", "Savannah", "North East"
];

// Institution types and categories
const INSTITUTION_TYPES = {
  PUBLIC: "Public",
  PRIVATE: "Private"
};

const INSTITUTION_CATEGORIES = {
  NATIONAL_PUBLIC: "National Public University",
  TECHNICAL: "Technical University", 
  PROFESSIONAL: "Professional/Specialized University",
  CHARTERED_PRIVATE: "Chartered Private University",
  AFFILIATED_PRIVATE: "Affiliated Private University College"
};

module.exports = {
  INSTITUTIONS_DATA,
  GHANA_REGIONS,
  INSTITUTION_TYPES,
  INSTITUTION_CATEGORIES
};
