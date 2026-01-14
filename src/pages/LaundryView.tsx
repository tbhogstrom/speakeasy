import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ChevronRight } from 'lucide-react';
import type { LaundryLoad } from '@/types/home';

const statusFlow: LaundryLoad['status'][] = [
  'dirty',
  'washing',
  'drying',
  'clean',
  'folded',
  'put-away',
];

const statusConfig = {
  dirty: { label: 'Dirty', color: 'bg-gray-100 text-gray-800' },
  washing: { label: 'Washing', color: 'bg-blue-100 text-blue-800' },
  drying: { label: 'Drying', color: 'bg-cyan-100 text-cyan-800' },
  clean: { label: 'Clean', color: 'bg-green-100 text-green-800' },
  folded: { label: 'Folded', color: 'bg-purple-100 text-purple-800' },
  'put-away': { label: 'Put Away', color: 'bg-emerald-100 text-emerald-800' },
};

const loadTypeConfig = {
  'rags': { label: 'Rags', emoji: '🧹' },
  'tyler-laundry': { label: 'Tyler Laundry', emoji: '👨' },
  'kailey-laundry': { label: 'Kailey Laundry', emoji: '👧' },
  'sylvie-laundry': { label: 'Sylvie Laundry', emoji: '👶' },
  'sheets': { label: 'Sheets', emoji: '🛏️' },
  'blankets': { label: 'Blankets', emoji: '🛋️' },
  'diapers': { label: 'Diapers', emoji: '🍼' },
  'towels': { label: 'Towels', emoji: '🛁' },
  'heavily-soiled': { label: 'Heavily Soiled', emoji: '⚠️' },
};

export function LaundryView() {
  const [loads, setLoads] = useState<LaundryLoad[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<LaundryLoad['type']>('tyler-laundry');

  const handleAddLoad = () => {
    const newLoad: LaundryLoad = {
      id: crypto.randomUUID(),
      type: selectedType,
      status: 'dirty',
      startedAt: new Date(),
    };
    setLoads([...loads, newLoad]);
    setIsDialogOpen(false);
  };

  const handleAdvanceStatus = (id: string) => {
    setLoads(
      loads.map((load) => {
        if (load.id === id) {
          const currentIndex = statusFlow.indexOf(load.status);
          if (currentIndex < statusFlow.length - 1) {
            const newStatus = statusFlow[currentIndex + 1];
            return {
              ...load,
              status: newStatus,
              completedAt: newStatus === 'put-away' ? new Date() : load.completedAt,
            };
          } else {
            // Remove completed loads
            return null;
          }
        }
        return load;
      }).filter(Boolean) as LaundryLoad[]
    );
  };

  const handleDeleteLoad = (id: string) => {
    setLoads(loads.filter((load) => load.id !== id));
  };

  const activeLoads = loads.filter((load) => load.status !== 'put-away');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laundry Tracker</h1>
          <p className="text-muted-foreground">
            Never forget which load needs what next
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Load
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Laundry Load</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Load Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {Object.entries(loadTypeConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedType(key as LaundryLoad['type'])}
                      className={`p-4 border rounded-md text-left transition-colors ${
                        selectedType === key
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      <div className="text-2xl mb-1">{config.emoji}</div>
                      <div className="font-medium">{config.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLoad}>Add Load</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {activeLoads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">No active laundry loads</p>
            <p className="text-sm text-muted-foreground">
              Click "Add Load" to start tracking your laundry!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeLoads.map((load) => {
            const typeConfig = loadTypeConfig[load.type];
            const currentStatus = statusConfig[load.status];
            const currentIndex = statusFlow.indexOf(load.status);
            const nextStatus =
              currentIndex < statusFlow.length - 1
                ? statusFlow[currentIndex + 1]
                : null;

            return (
              <Card key={load.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl mb-1">{typeConfig.emoji}</div>
                      <CardTitle className="text-lg">{typeConfig.label}</CardTitle>
                    </div>
                    <Badge className={`${currentStatus.color} border-0`}>
                      {currentStatus.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex gap-1">
                    {statusFlow.map((status, index) => (
                      <div
                        key={status}
                        className={`flex-1 h-2 rounded-full ${
                          index <= currentIndex
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>

                  {nextStatus && (
                    <Button
                      onClick={() => handleAdvanceStatus(load.id)}
                      className="w-full"
                      size="sm"
                    >
                      Move to {statusConfig[nextStatus].label}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}

                  {load.status === 'put-away' && (
                    <Button
                      onClick={() => handleDeleteLoad(load.id)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Complete & Remove
                    </Button>
                  )}

                  <Button
                    onClick={() => handleDeleteLoad(load.id)}
                    variant="ghost"
                    size="sm"
                    className="w-full text-destructive hover:text-destructive"
                  >
                    Cancel Load
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Add a load when you have dirty laundry ready to wash</li>
            <li>2. Click "Move to..." as you progress through each stage</li>
            <li>
              3. The tracker helps you remember: "Oh right, that load is still in the
              dryer!"
            </li>
            <li>4. Remove loads once they're put away</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
