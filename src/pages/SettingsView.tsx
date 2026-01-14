import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your garden preferences and account settings
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Garden Preferences</CardTitle>
            <CardDescription>
              Customize your garden planning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Email Notifications</Label>
              <Switch id="notifications" />
            </div>
            <div className="space-y-2">
              <Label>Growing Zone</Label>
              <Select defaultValue="8b">
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8b">Zone 8b (Portland)</SelectItem>
                  <SelectItem value="8a">Zone 8a</SelectItem>
                  <SelectItem value="9a">Zone 9a</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>First Frost Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Last Frost Date</Label>
              <Input type="date" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Export or clear your garden data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Export Data</Button>
            <Button variant="destructive">Clear All Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}