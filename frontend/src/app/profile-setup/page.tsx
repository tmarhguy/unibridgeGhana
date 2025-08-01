"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, User, Calendar, MapPin, Phone } from "lucide-react"

export default function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    // Personal Information
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    nationality: "Ghanaian",
    
    // Address
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    
    // Educational Background
    currentSchool: "",
    programType: "", // SHS, A-Level, etc.
    expectedGraduation: "",
    
    // Emergency Contact
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
  })
  
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // TODO: Implement actual profile creation
      console.log("Profile creation:", profileData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (error) {
      console.error("Profile creation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-unibridge-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={profileData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  type="text"
                  value={profileData.nationality}
                  onChange={(e) => handleInputChange("nationality", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-unibridge-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Address Information</h2>
              <p className="text-gray-600">Where can we reach you?</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  type="text"
                  placeholder="House number and street name"
                  value={profileData.streetAddress}
                  onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City/Town</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Accra"
                    value={profileData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <select
                    id="region"
                    value={profileData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Select region</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    <option value="Western">Western</option>
                    <option value="Central">Central</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Volta">Volta</option>
                    <option value="Northern">Northern</option>
                    <option value="Upper East">Upper East</option>
                    <option value="Upper West">Upper West</option>
                    <option value="Brong-Ahafo">Brong-Ahafo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                <Input
                  id="postalCode"
                  type="text"
                  placeholder="GA-123-4567"
                  value={profileData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Calendar className="h-12 w-12 text-unibridge-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Educational Background</h2>
              <p className="text-gray-600">Tell us about your current education</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentSchool">Current School/Institution</Label>
                <Input
                  id="currentSchool"
                  type="text"
                  placeholder="Name of your current school"
                  value={profileData.currentSchool}
                  onChange={(e) => handleInputChange("currentSchool", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="programType">Program Type</Label>
                  <select
                    id="programType"
                    value={profileData.programType}
                    onChange={(e) => handleInputChange("programType", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Select program type</option>
                    <option value="SHS">Senior High School (SHS)</option>
                    <option value="A-Level">A-Level</option>
                    <option value="IB">International Baccalaureate (IB)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                  <Input
                    id="expectedGraduation"
                    type="month"
                    value={profileData.expectedGraduation}
                    onChange={(e) => handleInputChange("expectedGraduation", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <Phone className="h-12 w-12 text-unibridge-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Emergency Contact</h2>
              <p className="text-gray-600">Someone we can contact in case of emergency</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Full Name</Label>
                <Input
                  id="emergencyName"
                  type="text"
                  placeholder="Emergency contact's full name"
                  value={profileData.emergencyName}
                  onChange={(e) => handleInputChange("emergencyName", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <select
                    id="emergencyRelationship"
                    value={profileData.emergencyRelationship}
                    onChange={(e) => handleInputChange("emergencyRelationship", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="guardian">Guardian</option>
                    <option value="sibling">Sibling</option>
                    <option value="relative">Relative</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone Number</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={profileData.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <BookOpen className="h-8 w-8 text-unibridge-primary" />
            <span className="text-2xl font-bold text-gray-900">UniBridge GH</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="text-gray-600 mt-2">Help us personalize your application experience</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-unibridge-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Completing..." : "Complete Profile"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
