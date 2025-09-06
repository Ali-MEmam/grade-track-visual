import React, { useState, useCallback, useMemo } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views, View } from 'react-big-calendar'
import moment from 'moment'
import { Card } from '@/components/atoms/Card/Card'
import { Button } from '@/components/atoms/Button/Button'
import { Badge } from '@/components/atoms/Badge/Badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Plus, Clock, MapPin, Users } from 'lucide-react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: 'class' | 'meeting' | 'event' | 'holiday'
  description?: string
  location?: string
  attendees?: string[]
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Mathematics - Class 10A',
    start: new Date(2024, 6, 15, 9, 0),
    end: new Date(2024, 6, 15, 10, 0),
    type: 'class',
    description: 'Algebra and Linear Equations',
    location: 'Room 201',
    attendees: ['John Smith', 'Sarah Johnson']
  },
  {
    id: '2',
    title: 'Science - Class 10B',
    start: new Date(2024, 6, 15, 10, 30),
    end: new Date(2024, 6, 15, 11, 30),
    type: 'class',
    description: 'Physics - Motion and Force',
    location: 'Lab 1',
    attendees: ['Dr. Wilson', 'Mike Davis']
  },
  {
    id: '3',
    title: 'Staff Meeting',
    start: new Date(2024, 6, 16, 14, 0),
    end: new Date(2024, 6, 16, 15, 30),
    type: 'meeting',
    description: 'Monthly department meeting',
    location: 'Conference Room',
    attendees: ['All Staff']
  },
  {
    id: '4',
    title: 'School Sports Day',
    start: new Date(2024, 6, 18, 8, 0),
    end: new Date(2024, 6, 18, 17, 0),
    type: 'event',
    description: 'Annual sports competition',
    location: 'Sports Ground',
    attendees: ['All Students', 'All Staff']
  },
  {
    id: '5',
    title: 'Summer Holiday',
    start: new Date(2024, 6, 20, 0, 0),
    end: new Date(2024, 6, 25, 23, 59),
    type: 'holiday',
    description: 'Summer break',
    location: 'N/A'
  }
]

const eventTypeColors = {
  class: 'bg-blue-500',
  meeting: 'bg-green-500',
  event: 'bg-purple-500',
  holiday: 'bg-orange-500'
}

const eventTypeBadgeVariants = {
  class: 'default',
  meeting: 'secondary',
  event: 'outline',
  holiday: 'destructive'
} as const

export const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [view, setView] = useState<View>(Views.MONTH)
  const [date, setDate] = useState(new Date())
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showCreateDrawer, setShowCreateDrawer] = useState(false)

  const [newEvent, setNewEvent] = useState<{
    title: string
    start: string
    end: string
    type: 'class' | 'meeting' | 'event' | 'holiday'
    description: string
    location: string
    attendees: string
  }>({
    title: '',
    start: '',
    end: '',
    type: 'class',
    description: '',
    location: '',
    attendees: ''
  })

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventDialog(true)
  }, [])

  const handleSelectSlot = useCallback(({ start, end }: { start: Date; end: Date }) => {
    const startTime = moment(start).format('YYYY-MM-DDTHH:mm')
    const endTime = moment(end).format('YYYY-MM-DDTHH:mm')
    
    setNewEvent(prev => ({
      ...prev,
      start: startTime,
      end: endTime
    }))
    setShowCreateDrawer(true)
  }, [])

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      type: newEvent.type,
      description: newEvent.description,
      location: newEvent.location,
      attendees: newEvent.attendees.split(',').map(a => a.trim()).filter(Boolean)
    }

    setEvents(prev => [...prev, event])
    setNewEvent({
      title: '',
      start: '',
      end: '',
      type: 'class',
      description: '',
      location: '',
      attendees: ''
    })
    setShowCreateDrawer(false)
  }

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const backgroundColor = eventTypeColors[event.type]
    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px',
        fontWeight: '500'
      }
    }
  }, [])

  const formats = useMemo(() => ({
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => 
      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
    agendaTimeFormat: 'HH:mm',
    agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => 
      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
  }), [])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            School Calendar
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage classes, meetings, and events
          </p>
        </div>
        
        <Drawer open={showCreateDrawer} onOpenChange={setShowCreateDrawer}>
          <DrawerTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create New Event</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => 
                    setNewEvent(prev => ({ ...prev, type: value as 'class' | 'meeting' | 'event' | 'holiday' }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="class">Class</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start">Start Time</Label>
                  <Input
                    id="start"
                    type="datetime-local"
                    value={newEvent.start}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, start: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end">End Time</Label>
                  <Input
                    id="end"
                    type="datetime-local"
                    value={newEvent.end}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Room, building, or venue"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Attendees</Label>
                  <Input
                    id="attendees"
                    placeholder="Comma-separated names"
                    value={newEvent.attendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateEvent} className="flex-1">
                  Create Event
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDrawer(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Calendar Controls */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <Button
              variant={view === Views.MONTH ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView(Views.MONTH)}
            >
              Month
            </Button>
            <Button
              variant={view === Views.WEEK ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView(Views.WEEK)}
            >
              Week
            </Button>
            <Button
              variant={view === Views.DAY ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView(Views.DAY)}
            >
              Day
            </Button>
            <Button
              variant={view === Views.AGENDA ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView(Views.AGENDA)}
            >
              Agenda
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{moment(date).format('MMMM YYYY')}</span>
          </div>
        </div>
      </Card>

      {/* Calendar */}
      <Card className="p-6">
        <div style={{ height: '600px' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            formats={formats}
            className="calendar-custom"
            step={30}
            showMultiDayTimes
            messages={{
              allDay: 'All Day',
              previous: 'Back',
              next: 'Next',
              today: 'Today',
              month: 'Month',
              week: 'Week',
              day: 'Day',
              agenda: 'Agenda',
              date: 'Date',
              time: 'Time',
              event: 'Event',
              noEventsInRange: 'There are no events in this range.',
              showMore: total => `+${total} more`
            }}
          />
        </div>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Event Details
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                <Badge variant={eventTypeBadgeVariants[selectedEvent.type]} className="mt-1">
                  {selectedEvent.type}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {moment(selectedEvent.start).format('MMM DD, YYYY HH:mm')} - {' '}
                    {moment(selectedEvent.end).format('HH:mm')}
                  </span>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Attendees:</p>
                      <p className="text-muted-foreground">
                        {selectedEvent.attendees.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="text-sm">
                    <p className="font-medium">Description:</p>
                    <p className="text-muted-foreground">{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1">
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}