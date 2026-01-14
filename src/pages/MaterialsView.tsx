import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Material } from '@/types/slp';

const initialMaterials: Material[] = [
  {
    id: '1',
    name: 'Articulation Cards - /r/ sound',
    category: 'articulation',
    location: 'Shelf 2A',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Social Skills Stories',
    category: 'social',
    location: 'Bookshelf',
    quantity: 3,
  },
];

const categoryConfig = {
  articulation: { label: 'Articulation', color: 'bg-blue-100 text-blue-800' },
  language: { label: 'Language', color: 'bg-purple-100 text-purple-800' },
  social: { label: 'Social Skills', color: 'bg-pink-100 text-pink-800' },
  fluency: { label: 'Fluency', color: 'bg-green-100 text-green-800' },
  voice: { label: 'Voice', color: 'bg-yellow-100 text-yellow-800' },
  aac: { label: 'AAC', color: 'bg-cyan-100 text-cyan-800' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800' },
};

export function MaterialsView() {
  const [materials] = useState<Material[]>(initialMaterials);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Materials</h1>
            <p className="text-muted-foreground">Organize therapy materials and resources</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map((material) => {
          const catConfig = categoryConfig[material.category];

          return (
            <Card key={material.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{material.name}</CardTitle>
                    {material.location && (
                      <p className="text-sm text-muted-foreground mt-1">{material.location}</p>
                    )}
                  </div>
                  {material.lowStock && (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge className={`${catConfig.color} border-0`}>{catConfig.label}</Badge>
                  {material.quantity && <Badge variant="outline">Qty: {material.quantity}</Badge>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
