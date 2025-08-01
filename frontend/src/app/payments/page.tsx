'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CommonAppLayout from '@/components/layout/CommonAppLayout'

interface ApplicationFee {
  id: string
  university: string
  program: string
  fee: number
  currency: string
  status: 'pending' | 'paid' | 'processing' | 'failed'
  deadline: Date
  paymentReference?: string
  paidAt?: Date
}

interface PaymentMethod {
  id: string
  name: string
  type: 'mobile_money' | 'card' | 'bank_transfer'
  icon: string
  fees: string
  processingTime: string
  available: boolean
}

const PaymentIntegration: React.FC = () => {
  const [applicationFees] = useState<ApplicationFee[]>([
    {
      id: '1',
      university: 'University of Ghana',
      program: 'Computer Science',
      fee: 150,
      currency: 'GHS',
      status: 'paid',
      deadline: new Date('2024-03-15'),
      paymentReference: 'PAY-UG-2024-001',
      paidAt: new Date('2024-01-15')
    },
    {
      id: '2',
      university: 'KNUST',
      program: 'Mechanical Engineering',
      fee: 200,
      currency: 'GHS',
      status: 'pending',
      deadline: new Date('2024-03-20')
    },
    {
      id: '3',
      university: 'Ashesi University',
      program: 'Business Administration',
      fee: 300,
      currency: 'GHS',
      status: 'processing',
      deadline: new Date('2024-03-25'),
      paymentReference: 'PAY-ASH-2024-003'
    }
  ])

  const [selectedFee, setSelectedFee] = useState<ApplicationFee | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [paymentDetails, setPaymentDetails] = useState({
    mobileNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    bankAccount: '',
    bankName: ''
  })
  const [processing, setProcessing] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'mtn_momo',
      name: 'MTN Mobile Money',
      type: 'mobile_money',
      icon: '📱',
      fees: 'Free for payments above GHS 50',
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'vodafone_cash',
      name: 'Vodafone Cash',
      type: 'mobile_money',
      icon: '📱',
      fees: '1% transaction fee',
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'airteltigo_money',
      name: 'AirtelTigo Money',
      type: 'mobile_money',
      icon: '📱',
      fees: '1% transaction fee',
      processingTime: 'Instant',
      available: true
    },
    {
      id: 'visa_mastercard',
      name: 'Visa/Mastercard',
      type: 'card',
      icon: '💳',
      fees: '2.5% + GHS 1',
      processingTime: '1-2 minutes',
      available: true
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      type: 'bank_transfer',
      icon: '🏦',
      fees: 'Bank charges apply',
      processingTime: '1-3 business days',
      available: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      type: 'card',
      icon: '🅿️',
      fees: '3.4% + GHS 2',
      processingTime: '1-2 minutes',
      available: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return '✅'
      case 'processing':
        return '⏳'
      case 'pending':
        return '⏰'
      case 'failed':
        return '❌'
      default:
        return '○'
    }
  }

  const isDeadlineNear = (deadline: Date) => {
    const now = new Date()
    const diffTime = deadline.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  const handlePayment = async () => {
    if (!selectedFee || !selectedPaymentMethod) return

    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // In real app, this would integrate with actual payment gateways
      console.log('Payment processed:', {
        fee: selectedFee,
        method: selectedPaymentMethod,
        details: paymentDetails
      })
      
      setProcessing(false)
      setShowPaymentForm(false)
      setSelectedFee(null)
      setSelectedPaymentMethod('')
      
      // Show success message
      alert('Payment successful! You will receive a confirmation email shortly.')
    }, 3000)
  }

  const totalPending = applicationFees
    .filter(fee => fee.status === 'pending')
    .reduce((sum, fee) => sum + fee.fee, 0)

  const totalPaid = applicationFees
    .filter(fee => fee.status === 'paid')
    .reduce((sum, fee) => sum + fee.fee, 0)

  return (
    <CommonAppLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Payment Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Application Payments</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  GHS {totalPending}
                </div>
                <div className="text-sm text-gray-600">Pending Payments</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  GHS {totalPaid}
                </div>
                <div className="text-sm text-gray-600">Total Paid</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {applicationFees.length}
                </div>
                <div className="text-sm text-gray-600">Applications</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {!showPaymentForm ? (
          /* Application Fees List */
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Fees</h2>
            
            {applicationFees.map(fee => (
              <Card key={fee.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {fee.university}
                        </h3>
                        <Badge className={getStatusColor(fee.status)}>
                          {getStatusIcon(fee.status)} {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                        </Badge>
                        {fee.status === 'pending' && isDeadlineNear(fee.deadline) && (
                          <Badge className="bg-red-100 text-red-800">
                            ⚠️ Due Soon
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4">{fee.program}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900">Amount</p>
                          <p className="text-gray-600">{fee.currency} {fee.fee}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Deadline</p>
                          <p className={`${isDeadlineNear(fee.deadline) && fee.status === 'pending' ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                            {fee.deadline.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Status</p>
                          <p className="text-gray-600">
                            {fee.status === 'paid' && fee.paidAt 
                              ? `Paid on ${fee.paidAt.toLocaleDateString()}`
                              : fee.status === 'processing'
                              ? 'Payment processing...'
                              : 'Payment required'
                            }
                          </p>
                        </div>
                      </div>
                      
                      {fee.paymentReference && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>Reference:</strong> {fee.paymentReference}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6">
                      {fee.status === 'pending' && (
                        <Button
                          onClick={() => {
                            setSelectedFee(fee)
                            setShowPaymentForm(true)
                          }}
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                        >
                          Pay Now
                        </Button>
                      )}
                      {fee.status === 'paid' && (
                        <Button variant="outline">
                          View Receipt
                        </Button>
                      )}
                      {fee.status === 'processing' && (
                        <Button variant="outline" disabled>
                          Processing...
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Payment Form */
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Complete Payment</CardTitle>
                <CardDescription>
                  Pay application fee for {selectedFee?.university} - {selectedFee?.program}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Application Fee</span>
                    <span className="text-lg font-bold">
                      {selectedFee?.currency} {selectedFee?.fee}
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Choose Payment Method
                  </Label>
                  <div className="grid grid-cols-1 gap-3">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPaymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : method.available
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                        }`}
                        onClick={() => method.available && setSelectedPaymentMethod(method.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{method.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900">{method.name}</p>
                              <p className="text-sm text-gray-600">
                                {method.fees} • {method.processingTime}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!method.available && (
                              <span className="text-xs text-gray-500">Coming Soon</span>
                            )}
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedPaymentMethod === method.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedPaymentMethod === method.id && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Details Form */}
                {selectedPaymentMethod && (
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Payment Details</Label>
                    
                    {selectedPaymentMethod.includes('momo') || selectedPaymentMethod.includes('money') ? (
                      <div>
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          placeholder="Enter your mobile number"
                          value={paymentDetails.mobileNumber}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            mobileNumber: e.target.value
                          }))}
                        />
                      </div>
                    ) : selectedPaymentMethod === 'visa_mastercard' ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="Name on card"
                            value={paymentDetails.cardName}
                            onChange={(e) => setPaymentDetails(prev => ({
                              ...prev,
                              cardName: e.target.value
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails(prev => ({
                              ...prev,
                              cardNumber: e.target.value
                            }))}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={paymentDetails.expiryDate}
                              onChange={(e) => setPaymentDetails(prev => ({
                                ...prev,
                                expiryDate: e.target.value
                              }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentDetails.cvv}
                              onChange={(e) => setPaymentDetails(prev => ({
                                ...prev,
                                cvv: e.target.value
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    ) : selectedPaymentMethod === 'bank_transfer' ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            placeholder="Select your bank"
                            value={paymentDetails.bankName}
                            onChange={(e) => setPaymentDetails(prev => ({
                              ...prev,
                              bankName: e.target.value
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bankAccount">Account Number</Label>
                          <Input
                            id="bankAccount"
                            placeholder="Enter your account number"
                            value={paymentDetails.bankAccount}
                            onChange={(e) => setPaymentDetails(prev => ({
                              ...prev,
                              bankAccount: e.target.value
                            }))}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowPaymentForm(false)}
                    disabled={processing}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    onClick={handlePayment}
                    disabled={!selectedPaymentMethod || processing}
                  >
                    {processing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      `Pay ${selectedFee?.currency} ${selectedFee?.fee}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </CommonAppLayout>
  )
}

export default PaymentIntegration
