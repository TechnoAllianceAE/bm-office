
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Plus,
  Trash,
  GripVertical,
  Video,
  FileText,
  Youtube,
  Image as ImageIcon,
  File,
  ArrowUp,
  ArrowDown,
  Edit,
} from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Sample units data
const initialUnits = [
  {
    id: 1,
    title: 'Introduction to the Course',
    order: 1,
    contents: [
      {
        id: 1,
        type: 'video',
        title: 'Welcome to the Course',
        description: 'A brief introduction to what you will learn.',
        url: 'https://example.com/video1.mp4',
        duration: '5:20',
      },
      {
        id: 2,
        type: 'pdf',
        title: 'Course Syllabus',
        description: 'Detailed overview of course topics and schedule.',
        url: 'https://example.com/syllabus.pdf',
      },
    ],
  },
  {
    id: 2,
    title: 'Getting Started',
    order: 2,
    contents: [
      {
        id: 3,
        type: 'youtube',
        title: 'Basic Setup Tutorial',
        description: 'Learn how to set up your environment.',
        url: 'https://youtube.com/watch?v=12345',
        duration: '10:45',
      },
    ],
  },
];

const contentTypeSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.enum(['video', 'youtube', 'image', 'pdf', 'document']),
  description: z.string().optional(),
  url: z.string().min(1, { message: "URL is required" }),
  duration: z.string().optional(),
});

const unitSchema = z.object({
  title: z.string().min(1, { message: "Unit title is required" }),
});

export const CourseUnitEditor = ({ courseId, onClose }) => {
  const [units, setUnits] = useState(initialUnits);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showAddUnitDialog, setShowAddUnitDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentMode, setContentMode] = useState('add'); // 'add' or 'edit'

  const unitForm = useForm({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      title: "",
    },
  });

  const contentForm = useForm({
    resolver: zodResolver(contentTypeSchema),
    defaultValues: {
      title: "",
      type: "video",
      description: "",
      url: "",
      duration: "",
    },
  });

  const handleAddUnit = (data) => {
    const newUnit = {
      id: Date.now(),
      title: data.title,
      order: units.length + 1,
      contents: [],
    };
    
    setUnits([...units, newUnit]);
    setShowAddUnitDialog(false);
    unitForm.reset();
    
    toast({
      title: "Unit Added",
      description: `"${data.title}" has been added to the course.`,
    });
  };

  const handleDeleteUnit = (unitId) => {
    setUnits(units.filter(unit => unit.id !== unitId));
    toast({
      title: "Unit Removed",
      description: "The unit has been removed from the course.",
    });
  };

  const handleMoveUnit = (unitId, direction) => {
    const unitIndex = units.findIndex(unit => unit.id === unitId);
    if (
      (direction === 'up' && unitIndex === 0) || 
      (direction === 'down' && unitIndex === units.length - 1)
    ) {
      return;
    }

    const newUnits = [...units];
    const targetIndex = direction === 'up' ? unitIndex - 1 : unitIndex + 1;
    
    // Swap units
    [newUnits[unitIndex], newUnits[targetIndex]] = [newUnits[targetIndex], newUnits[unitIndex]];
    
    // Update order
    newUnits[unitIndex].order = unitIndex + 1;
    newUnits[targetIndex].order = targetIndex + 1;
    
    setUnits(newUnits);
  };

  const handleAddContent = (data) => {
    if (!selectedUnit) return;
    
    const newContent = {
      id: Date.now(),
      ...data,
    };
    
    const updatedUnits = units.map(unit => {
      if (unit.id === selectedUnit.id) {
        return {
          ...unit,
          contents: [...unit.contents, newContent],
        };
      }
      return unit;
    });
    
    setUnits(updatedUnits);
    setShowContentDialog(false);
    contentForm.reset();
    
    toast({
      title: "Content Added",
      description: `"${data.title}" has been added to the unit.`,
    });
  };

  const handleEditContent = (data) => {
    if (!selectedUnit || !selectedContent) return;
    
    const updatedUnits = units.map(unit => {
      if (unit.id === selectedUnit.id) {
        const updatedContents = unit.contents.map(content => {
          if (content.id === selectedContent.id) {
            return {
              ...content,
              ...data,
            };
          }
          return content;
        });
        
        return {
          ...unit,
          contents: updatedContents,
        };
      }
      return unit;
    });
    
    setUnits(updatedUnits);
    setShowContentDialog(false);
    setSelectedContent(null);
    
    toast({
      title: "Content Updated",
      description: `"${data.title}" has been updated.`,
    });
  };

  const handleDeleteContent = (unitId, contentId) => {
    const updatedUnits = units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          contents: unit.contents.filter(content => content.id !== contentId),
        };
      }
      return unit;
    });
    
    setUnits(updatedUnits);
    
    toast({
      title: "Content Removed",
      description: "The content has been removed from the unit.",
    });
  };

  const openAddContentDialog = (unit) => {
    setSelectedUnit(unit);
    setContentMode('add');
    contentForm.reset();
    setShowContentDialog(true);
  };

  const openEditContentDialog = (unit, content) => {
    setSelectedUnit(unit);
    setSelectedContent(content);
    setContentMode('edit');
    contentForm.reset({
      title: content.title,
      type: content.type,
      description: content.description || "",
      url: content.url,
      duration: content.duration || "",
    });
    setShowContentDialog(true);
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'document':
        return <File className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Organize your course by creating units and adding content.
          </p>
        </div>
        <Dialog open={showAddUnitDialog} onOpenChange={setShowAddUnitDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Unit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Unit</DialogTitle>
            </DialogHeader>
            <Form {...unitForm}>
              <form onSubmit={unitForm.handleSubmit(handleAddUnit)} className="space-y-4">
                <FormField
                  control={unitForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter unit title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed as the section header in the course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddUnitDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Unit</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {units.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
          <div className="mx-auto flex flex-col items-center">
            <Plus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Units Added</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Start adding units to organize your course content. Each unit can contain multiple
              content items such as videos, documents, and images.
            </p>
            <Button onClick={() => setShowAddUnitDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Unit
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {units.map((unit) => (
            <Card key={unit.id} className="relative">
              <CardHeader className="bg-muted/30 flex flex-row items-center justify-between py-4">
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium mr-3">
                    {unit.order}
                  </span>
                  <h3 className="text-lg font-medium">{unit.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveUnit(unit.id, 'up')}
                    disabled={unit.order === 1}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveUnit(unit.id, 'down')}
                    disabled={unit.order === units.length}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAddContentDialog(unit)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Content
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUnit(unit.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {unit.contents.length === 0 ? (
                  <div className="text-center py-8 bg-muted/10 rounded border border-dashed">
                    <p className="text-sm text-muted-foreground">
                      No content items yet. Click "Add Content" to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {unit.contents.map((content) => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-3 bg-background rounded-md border hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
                            {getContentTypeIcon(content.type)}
                          </div>
                          <div>
                            <div className="font-medium">{content.title}</div>
                            <div className="text-xs text-muted-foreground max-w-[300px] truncate">
                              {content.description || content.url}
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {content.type}
                          </Badge>
                          {content.duration && (
                            <Badge variant="secondary" className="ml-1">
                              {content.duration}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditContentDialog(unit, content)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteContent(unit.id, content.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Content Dialog for adding/editing content */}
      <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {contentMode === 'add' ? 'Add Content Item' : 'Edit Content Item'}
            </DialogTitle>
          </DialogHeader>
          <Form {...contentForm}>
            <form 
              onSubmit={contentForm.handleSubmit(
                contentMode === 'add' ? handleAddContent : handleEditContent
              )} 
              className="space-y-4"
            >
              <FormField
                control={contentForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter content title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contentForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="youtube">YouTube Video</SelectItem>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="document">Other Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Select the type of content you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contentForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL or File Path</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input 
                          placeholder={`Enter ${contentForm.watch('type')} URL`} 
                          {...field} 
                          className="flex-1"
                        />
                        <Button type="button" variant="outline">
                          Browse
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      {contentForm.watch('type') === 'youtube' 
                        ? 'Enter the YouTube video URL' 
                        : 'Enter a URL or upload a file'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter a brief description" 
                        {...field} 
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(contentForm.watch('type') === 'video' || contentForm.watch('type') === 'youtube') && (
                <FormField
                  control={contentForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 10:30" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContentDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {contentMode === 'add' ? 'Add Content' : 'Update Content'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end pt-4">
        <Button variant="outline" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button onClick={onClose}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
