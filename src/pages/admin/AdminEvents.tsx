import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DynamicFormBuilder } from '@/components/DynamicFormBuilder';
import { MultiImageUploader } from '@/components/MultiImageUploader';
import { Plus, Edit, Trash2, Calendar, Users, IndianRupee } from 'lucide-react';
import type { Event, FormField, EventImage } from '@/contexts/AdminContext';

const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, attendees } = useAdmin();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [category, setCategory] = useState<Event['category']>('financial');
  const [images, setImages] = useState<EventImage[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: 'name', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
    { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'Enter your email' },
    { id: 'phone', type: 'phone', label: 'Phone', required: true, placeholder: 'Enter phone number' },
  ]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setShortDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setTicketPrice('');
    setMaxAttendees('');
    setCategory('financial');
    setImages([]);
    setFormFields([
      { id: 'name', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your name' },
      { id: 'email', type: 'email', label: 'Email', required: true, placeholder: 'Enter your email' },
      { id: 'phone', type: 'phone', label: 'Phone', required: true, placeholder: 'Enter phone number' },
    ]);
    setEditingEvent(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setShortDescription(event.shortDescription);
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setTicketPrice(event.ticketPrice.toString());
    setMaxAttendees(event.maxAttendees.toString());
    setCategory(event.category);
    setImages(event.images);
    setFormFields(event.formFields);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title,
      description,
      shortDescription,
      date,
      time,
      location,
      ticketPrice: parseFloat(ticketPrice) || 0,
      maxAttendees: parseInt(maxAttendees) || 50,
      category,
      images,
      formFields,
      status: 'upcoming',
      createdAt: editingEvent?.createdAt || new Date().toISOString(),
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const getEventAttendeeCount = (eventId: string) => {
    return attendees.filter(a => a.eventId === eventId).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">Create and manage your events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Basic Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Brief tagline for the event"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your event..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 10:00 AM"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Event venue or online link"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={category} onValueChange={(val) => setCategory(val as Event['category'])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial Learning</SelectItem>
                        <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                        <SelectItem value="social">Social Service</SelectItem>
                        <SelectItem value="mental-health">Mental Health</SelectItem>
                        <SelectItem value="innovation">Innovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Pricing & Capacity
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ticketPrice">Ticket Price (₹)</Label>
                    <Input
                      id="ticketPrice"
                      type="number"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      placeholder="0 for free events"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAttendees">Max Attendees *</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={maxAttendees}
                      onChange={(e) => setMaxAttendees(e.target.value)}
                      placeholder="Maximum attendees"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Event Images
                </h3>
                <MultiImageUploader images={images} onChange={setImages} maxImages={5} />
              </div>

              {/* Registration Form Builder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                  Registration Form Fields
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customize the fields attendees will fill when registering
                </p>
                <DynamicFormBuilder fields={formFields} onChange={setFormFields} />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="hero">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No events yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first event to get started
            </p>
            <Button variant="hero" onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {event.images[0] && (
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={event.images[0].url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">{event.title}</CardTitle>
                  <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                    {event.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{event.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    <span>{event.ticketPrice === 0 ? 'Free' : `₹${event.ticketPrice}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{getEventAttendeeCount(event.id)} / {event.maxAttendees} registered</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(event)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
