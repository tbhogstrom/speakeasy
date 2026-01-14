import { useState } from 'react';
import { Plant } from '@/types/garden';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

const initialPlants: Plant[] = [
  {
    id: '1',
    name: 'Tomato',
    variety: 'San Marzano',
    daysToMaturity: 80,
    spacing: 24,
    companionPlants: ['Basil', 'Marigold', 'Carrots'],
    avoidPlants: ['Potato', 'Brassicas'],
  },
  {
    id: '2',
    name: 'Kale',
    variety: 'Mixed varieties',
    daysToMaturity: 55,
    spacing: 12,
    companionPlants: ['Onions', 'Herbs', 'Potatoes'],
    avoidPlants: ['Tomatoes', 'Strawberries'],
  },
  {
    id: '3',
    name: 'Cucumber',
    variety: 'Standard',
    daysToMaturity: 55,
    spacing: 12,
    companionPlants: ['Beans', 'Peas', 'Radishes'],
    avoidPlants: ['Potatoes', 'Aromatic herbs'],
  },
  {
    id: '4',
    name: 'Pumpkin',
    variety: 'Black Futsu',
    daysToMaturity: 105,
    spacing: 36,
    companionPlants: ['Corn', 'Beans', 'Marigold'],
    avoidPlants: ['Potatoes'],
  },
  {
    id: '5',
    name: 'Salsify',
    variety: 'Mammoth Sandwich Island',
    daysToMaturity: 120,
    spacing: 4,
    companionPlants: ['Carrots', 'Onions'],
  },
  {
    id: '6',
    name: 'Blueberry',
    variety: 'Mixed varieties',
    daysToMaturity: 365,
    spacing: 48,
    companionPlants: ['Strawberries', 'Thyme'],
  },
  {
    id: '7',
    name: 'Honeyberry',
    variety: 'Standard',
    daysToMaturity: 365,
    spacing: 48,
    companionPlants: ['Blueberries'],
  },
  {
    id: '8',
    name: 'Strawberry',
    variety: 'Everbearing',
    daysToMaturity: 60,
    spacing: 12,
    companionPlants: ['Lettuce', 'Spinach', 'Beans'],
    avoidPlants: ['Brassicas'],
  },
  {
    id: '9',
    name: 'Rose',
    variety: 'Mixed varieties',
    daysToMaturity: 365,
    spacing: 24,
    companionPlants: ['Garlic', 'Chives', 'Marigold'],
  },
];

export function PlantsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [plants] = useState<Plant[]>(initialPlants);

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.variety?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Plants Database</h2>
        <p className="text-muted-foreground">
          Browse and manage your plant varieties
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlants.map((plant) => (
          <Card key={plant.id}>
            <CardHeader>
              <CardTitle>{plant.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                {plant.variety && (
                  <div>
                    <dt className="text-muted-foreground">Variety</dt>
                    <dd>{plant.variety}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-muted-foreground">Days to Maturity</dt>
                  <dd>{plant.daysToMaturity} days</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Spacing</dt>
                  <dd>{plant.spacing} inches</dd>
                </div>
                {plant.companionPlants && (
                  <div>
                    <dt className="text-muted-foreground">Companion Plants</dt>
                    <dd>{plant.companionPlants.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}