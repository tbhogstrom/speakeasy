import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/lib/dates';
import { Plus } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  weather?: string;
  tasks?: string[];
}

const initialEntries: JournalEntry[] = [
  {
    id: '1',
    date: new Date('2026-01-13'),
    title: '2026 Garden Planning - Week 1',
    content: `Starting garden observations for 2026. Planning for a productive year with focus on food production and preservation.

Crop Plan:
- Kale and greens: 200 sq ft
- San Marzano tomatoes: Goal of 250 lb harvest
- Cucumbers for fresh eating and pickling
- Black Futsu pumpkin for winter storage
- Salsify (experimental)
- Berries: Blueberries, honeyberries, and strawberries
- Roses for beauty and pollinators`,
    weather: 'Winter - monitoring soil temps',
    tasks: [
      'Finalize irrigation system design',
      'Plan tomato transplant timing',
      'Source materials for 24 sq ft coldframes',
      'Begin root cellar project planning',
      'Monitor soil temperature for spring timing',
    ],
  },
];

export function JournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    weather: '',
    tasks: '',
  });

  const handleAddEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      weather: newEntry.weather || undefined,
      tasks: newEntry.tasks ? newEntry.tasks.split('\n').filter(t => t.trim()) : undefined,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: '', content: '', weather: '', tasks: '' });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Garden Journal</h2>
          <p className="text-muted-foreground">
            Document your garden's progress and observations
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Journal Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder="Entry title"
                />
              </div>
              <div>
                <Label htmlFor="weather">Weather (optional)</Label>
                <Input
                  id="weather"
                  value={newEntry.weather}
                  onChange={(e) => setNewEntry({ ...newEntry, weather: e.target.value })}
                  placeholder="e.g., Sunny, 65°F"
                />
              </div>
              <div>
                <Label htmlFor="content">Notes & Observations</Label>
                <Textarea
                  id="content"
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder="What happened in the garden today?"
                  rows={8}
                />
              </div>
              <div>
                <Label htmlFor="tasks">Tasks (one per line, optional)</Label>
                <Textarea
                  id="tasks"
                  value={newEntry.tasks}
                  onChange={(e) => setNewEntry({ ...newEntry, tasks: e.target.value })}
                  placeholder="Task 1&#10;Task 2&#10;Task 3"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  Add Entry
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{entry.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(entry.date)}
                  </p>
                </div>
                {entry.weather && (
                  <span className="text-sm text-muted-foreground">
                    {entry.weather}
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{entry.content}</p>
              {entry.tasks && (
                <div>
                  <h4 className="font-semibold mb-2">Tasks:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {entry.tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}