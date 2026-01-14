import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';
import type { GrowingZone } from '@/types/garden';
import { updateBedDetails } from '@/lib/db';
import { useToast } from '@/hooks/use-toast';

interface EditBedDialogProps {
  bed: GrowingZone;
  onUpdate: (updatedBed: GrowingZone) => void;
}

export function EditBedDialog({ bed, onUpdate }: EditBedDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(bed);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBedDetails(formData);
      onUpdate(formData);
      toast({
        title: "Success",
        description: "Bed details updated successfully",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bed details",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bed Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as GrowingZone['status'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unused">Needs Planting</SelectItem>
                <SelectItem value="overgrown">Overgrown</SelectItem>
                <SelectItem value="planted">Planted</SelectItem>
                <SelectItem value="ready-for-harvest">Ready for Harvest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sunExposure">Sun Exposure</Label>
            <Select
              value={formData.sunExposure}
              onValueChange={(value) => setFormData({ ...formData, sunExposure: value as GrowingZone['sunExposure'] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sun exposure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Sun</SelectItem>
                <SelectItem value="partial">Partial Sun</SelectItem>
                <SelectItem value="shade">Shade</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soil">Soil Type</Label>
            <Input
              id="soil"
              value={formData.soil || ''}
              onChange={(e) => setFormData({ ...formData, soil: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}