
import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Copy, Type, List, ToggleLeft, Calendar, Check } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type QuestionType = 'short-text' | 'long-text' | 'multiple-choice' | 'checkbox' | 'dropdown' | 'date';

type Question = {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[];
};

export const SurveyCreator: React.FC = () => {
  const [title, setTitle] = useState('Untitled Survey');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      type: 'short-text',
      title: 'Your Name',
      required: true
    }
  ]);
  const [activeTab, setActiveTab] = useState('create');
  
  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title: `Question ${questions.length + 1}`,
      required: false
    };
    
    if (type === 'multiple-choice' || type === 'checkbox' || type === 'dropdown') {
      newQuestion.options = ['Option 1', 'Option 2', 'Option 3'];
    }
    
    setQuestions([...questions, newQuestion]);
  };
  
  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };
  
  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return {
          ...q,
          options: [...q.options, `Option ${q.options.length + 1}`]
        };
      }
      return q;
    }));
  };
  
  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };
  
  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        return {
          ...q,
          options: q.options.filter((_, i) => i !== optionIndex)
        };
      }
      return q;
    }));
  };
  
  const getQuestionIcon = (type: QuestionType) => {
    switch (type) {
      case 'short-text': return <Type className="h-4 w-4" />;
      case 'long-text': return <List className="h-4 w-4" />;
      case 'multiple-choice': return <Check className="h-4 w-4" />;
      case 'checkbox': return <ToggleLeft className="h-4 w-4" />;
      case 'dropdown': return <List className="h-4 w-4" />;
      case 'date': return <Calendar className="h-4 w-4" />;
    }
  };
  
  const renderQuestionEditor = (question: Question) => {
    return (
      <Card key={question.id} className="mb-4 overflow-hidden">
        <div className="border-b p-4 bg-muted/20">
          <div className="flex justify-between">
            <div className="flex items-center">
              <GripVertical className="h-5 w-5 text-muted-foreground mr-2 cursor-move" />
              <span>{getQuestionIcon(question.type)}</span>
              <span className="ml-2 text-sm font-medium">{question.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
            </div>
            <div>
              <Button variant="ghost" size="icon" onClick={() => removeQuestion(question.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <Input
              value={question.title}
              onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
              placeholder="Question title"
              className="border-0 border-b rounded-none px-0 text-lg font-medium focus-visible:ring-0 focus-visible:border-primary"
            />
          </div>
          
          {(question.type === 'multiple-choice' || question.type === 'checkbox' || question.type === 'dropdown') && (
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center">
                    {question.type === 'multiple-choice' && <div className="w-4 h-4 rounded-full border border-input mr-2" />}
                    {question.type === 'checkbox' && <div className="w-4 h-4 rounded border border-input mr-2" />}
                    {question.type === 'dropdown' && <span className="w-4 mr-2 text-center">{index + 1}.</span>}
                  </div>
                  <Input
                    value={option}
                    onChange={(e) => updateOption(question.id, index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(question.id, index)}
                    disabled={question.options?.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => addOption(question.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          )}
          
          {question.type === 'short-text' && (
            <div className="border rounded p-2 bg-muted/10 text-muted-foreground">
              Short answer text
            </div>
          )}
          
          {question.type === 'long-text' && (
            <div className="border rounded p-2 bg-muted/10 text-muted-foreground">
              Long answer text
            </div>
          )}
          
          {question.type === 'date' && (
            <div className="border rounded p-2 bg-muted/10 text-muted-foreground">
              Date picker
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-end">
            <Label htmlFor={`required-${question.id}`} className="mr-2 text-sm">Required</Label>
            <Switch
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
            />
          </div>
        </div>
      </Card>
    );
  };
  
  const renderPreview = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="border-b pb-4">
              <div className="flex items-start mb-2">
                <h3 className="text-lg font-medium">{question.title}</h3>
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </div>
              
              {question.type === 'short-text' && (
                <Input placeholder="Your answer" />
              )}
              
              {question.type === 'long-text' && (
                <Textarea placeholder="Your answer" className="min-h-[100px]" />
              )}
              
              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options?.map((option, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded-full border border-primary"></div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'checkbox' && (
                <div className="space-y-2">
                  {question.options?.map((option, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-2 h-4 w-4 rounded border border-primary"></div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {question.type === 'dropdown' && (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {question.options?.map((option, i) => (
                      <SelectItem key={i} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {question.type === 'date' && (
                <Input type="date" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Button>Submit</Button>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="mb-6 flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button>Share Survey</Button>
          </div>
        </div>
        
        <TabsContent value="create" className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <Label htmlFor="survey-title">Survey Title</Label>
              <Input
                id="survey-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Survey Title"
                className="text-xl font-semibold mt-1"
              />
            </div>
            <div>
              <Label htmlFor="survey-description">Description</Label>
              <Textarea
                id="survey-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description to your survey..."
                className="min-h-[100px] mt-1"
              />
            </div>
          </Card>
          
          <div className="space-y-4">
            {questions.map(renderQuestionEditor)}
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => addQuestion('short-text')}
                className="flex items-center"
              >
                <Type className="h-4 w-4 mr-2" />
                Short Text
              </Button>
              <Button
                variant="outline"
                onClick={() => addQuestion('long-text')}
                className="flex items-center"
              >
                <List className="h-4 w-4 mr-2" />
                Long Text
              </Button>
              <Button
                variant="outline"
                onClick={() => addQuestion('multiple-choice')}
                className="flex items-center"
              >
                <Check className="h-4 w-4 mr-2" />
                Multiple Choice
              </Button>
              <Button
                variant="outline"
                onClick={() => addQuestion('checkbox')}
                className="flex items-center"
              >
                <ToggleLeft className="h-4 w-4 mr-2" />
                Checkboxes
              </Button>
              <Button
                variant="outline"
                onClick={() => addQuestion('dropdown')}
                className="flex items-center"
              >
                <List className="h-4 w-4 mr-2" />
                Dropdown
              </Button>
              <Button
                variant="outline"
                onClick={() => addQuestion('date')}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Date
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          {renderPreview()}
        </TabsContent>
      </Tabs>
    </div>
  );
};
