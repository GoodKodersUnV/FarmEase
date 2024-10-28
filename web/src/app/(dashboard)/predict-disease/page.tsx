'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Upload, Loader2 } from 'lucide-react'
import TextToSpeech from '@/components/TextToSpeech'

const crops = [
  { value: 'potato', label: 'Potato' },
  { value: 'tomato', label: 'Tomato' },
  { value: 'corn', label: 'Corn' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'rice', label: 'Rice' },
]

const mockPrediction = {
  disease: 'Late Blight',
  confidence: 0.92,
  description: 'Late blight is a devastating disease of potato and tomato caused by the oomycete pathogen Phytophthora infestans. It can destroy entire fields within days under favorable weather conditions.',
  recommendations: [
    'Remove and destroy all infected plant parts',
    'Apply fungicides preventatively',
    'Improve air circulation by proper spacing and pruning',
    'Use resistant varieties when available',
  ],
}

export default function CropDiseasePredictor() {
  const [selectedCrop, setSelectedCrop] = useState('potato')
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<typeof mockPrediction | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePredict = async () => {
    setIsLoading(true)
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPrediction(mockPrediction)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Upload an image of your crop</CardTitle>
          <CardDescription>Select your crop type and upload a clear image of the affected area for analysis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full bg-background max-w-sm items-center gap-1.5">
            <Label htmlFor="crop">Crop Type</Label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select a crop" />
              </SelectTrigger>
              <SelectContent className='bg-background'>
                {crops.map((crop) => (
                  <SelectItem key={crop.value} className='bg-background' value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Crop Image</Label>
            <div className="flex items-center gap-4">
              <input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Label
                htmlFor="picture"
                className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
              >
                {image ? (
                  <Image src={image} alt="Uploaded crop" width={200} height={200} className="max-h-full w-auto" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-300" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">Upload an image</span>
                  </div>
                )}
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePredict} disabled={!image || isLoading} className="w-full bg-green-500 text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Predict Disease'
            )}
          </Button>
        </CardFooter>
      </Card>

      {prediction && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Detected Disease: {prediction.disease}</h3>
              <p className="text-sm text-gray-500">Confidence: {(prediction.confidence * 100).toFixed(2)}%</p>
            </div>
            <div>
              <h4 className="font-semibold">Description:</h4>
              <p>{prediction.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Recommendations:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {prediction.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
            <TextToSpeech text={prediction.description} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}