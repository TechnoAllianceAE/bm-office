
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash, Edit, Calendar, Tag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/common/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export const QuickNote: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('quickNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const activeNote = notes.find(note => note.id === activeNoteId);
  
  useEffect(() => {
    localStorage.setItem('quickNotes', JSON.stringify(notes));
  }, [notes]);
  
  useEffect(() => {
    if (activeNote && !isEditing) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
      setTags(activeNote.tags.join(', '));
    }
  }, [activeNote, isEditing]);
  
  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setTitle(newNote.title);
    setContent(newNote.content);
    setTags('');
    setIsEditing(true);
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (activeNoteId) {
        saveNote();
      }
    }
    setIsEditing(!isEditing);
  };
  
  const saveNote = () => {
    const updatedNotes = notes.map(note => {
      if (note.id === activeNoteId) {
        return {
          ...note,
          title: title || 'Untitled Note',
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          updatedAt: new Date().toISOString(),
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setIsEditing(false);
  };
  
  const handleDeleteNote = () => {
    if (!activeNoteId) return;
    
    const updatedNotes = notes.filter(note => note.id !== activeNoteId);
    setNotes(updatedNotes);
    
    if (updatedNotes.length > 0) {
      setActiveNoteId(updatedNotes[0].id);
    } else {
      setActiveNoteId(null);
      setTitle('');
      setContent('');
      setTags('');
    }
  };
  
  const filteredNotes = notes.filter(note => {
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Note list sidebar */}
      <div className="md:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <Input 
            placeholder="Search notes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button 
            onClick={handleNewNote} 
            size="icon" 
            className="ml-2 flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <Card className="glassmorphic-card overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div 
                  key={note.id}
                  className={`p-3 border-b last:border-b-0 hover:bg-secondary/40 cursor-pointer transition-colors ${
                    note.id === activeNoteId ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    setIsEditing(false);
                  }}
                >
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <p className="text-sm text-muted-foreground truncate mt-1">{note.content}</p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(note.updatedAt)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <p>No notes found.</p>
                <Button 
                  variant="link" 
                  onClick={handleNewNote}
                  className="mt-2"
                >
                  Create your first note
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Note editor */}
      <div className="md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            {isEditing ? (
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="text-lg font-medium"
              />
            ) : (
              <h2 className="text-lg font-medium">
                {activeNote ? activeNote.title : 'Select or create a note'}
              </h2>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeNote && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleEditToggle}
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleDeleteNote}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        <Card className="glassmorphic-card overflow-hidden">
          {activeNote ? (
            <div className="p-4">
              <Tabs defaultValue="content">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content">
                  {isEditing ? (
                    <Textarea 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your note here..."
                      className="min-h-[300px]"
                    />
                  ) : (
                    <div className="prose max-w-none">
                      {activeNote.content ? (
                        <div className="whitespace-pre-wrap">{activeNote.content}</div>
                      ) : (
                        <p className="text-muted-foreground italic">
                          No content. Click the edit button to add content.
                        </p>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        Created
                      </div>
                      <p>{formatDate(activeNote.createdAt)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2 text-sm font-medium text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Last updated
                      </div>
                      <p>{formatDate(activeNote.updatedAt)}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2 text-sm font-medium text-muted-foreground">
                        <Tag className="h-4 w-4 mr-2" />
                        Tags
                      </div>
                      {isEditing ? (
                        <Input 
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="Add tags separated by commas"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {activeNote.tags.length > 0 ? (
                            activeNote.tags.map((tag, index) => (
                              <span key={index} className="bg-secondary/60 px-2 py-1 rounded-md text-sm">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <p className="text-muted-foreground italic">No tags</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {isEditing && (
                <div className="flex justify-end mt-4">
                  <Button onClick={saveNote}>
                    Save Note
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <p>Select a note from the list or create a new note to get started.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
