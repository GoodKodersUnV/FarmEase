'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Search } from 'lucide-react'

const products = [
  { id: 1, name: "Organic Fertilizer", price: 29.99, category: "Fertilizers", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Eco-Friendly Pesticide", price: 19.99, category: "Pesticides", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "High-Yield Seeds", price: 9.99, category: "Seeds", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Soil pH Tester", price: 39.99, category: "Tools", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Drip Irrigation Kit", price: 89.99, category: "Equipment", image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Compost Accelerator", price: 14.99, category: "Fertilizers", image: "/placeholder.svg?height=200&width=200" },
]

const categories = ["All", "Fertilizers", "Pesticides", "Seeds", "Tools", "Equipment"]

export default function FarmerStore() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState([])

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Farmer's Store</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Button variant="outline" className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col justify-between">
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-500 text-white" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}