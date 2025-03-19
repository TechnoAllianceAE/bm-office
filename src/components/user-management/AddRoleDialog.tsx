
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';

interface AddRoleDialogProps {
  fetchRoles: () => void;
}

// List of applications/modules that can have permissions
const applications = [
  'Dashboard',
  'Timesheet',
  'Projects',
  'Calendar',
  'HR',
  'Directory',
  'Mailbox',
  'AI Assistant',
  'AI Workflow',
  'DMS',
  'Tools',
  'Analytics',
  'MIS',
  'Requisition',
  'Help Desk',
  'LMS',
  'Claims',
  'User Management'
];

export function AddRoleDialog({ fetchRoles }: AddRoleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleSchema = z.object({
    name: z.string().min(2, { message: 'Role name must be at least 2 characters' }),
    description: z.string().optional(),
  });

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleAddRole = async (values: z.infer<typeof roleSchema>) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('roles')
        .insert({
          name: values.name,
          description: values.description,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast.success('Role created successfully');
      form.reset();
      setIsOpen(false);
      fetchRoles();
      
      // Create default permissions for the new role
      const newPermissions = applications.map(app => ({
        role_id: data.id,
        application: app,
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
      }));
      
      const { error: permError } = await supabase
        .from('permissions')
        .insert(newPermissions);
      
      if (permError) {
        console.error('Error creating permissions:', permError);
      }
    } catch (error) {
      console.error('Error adding role:', error);
      toast.error('Failed to create role');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>
            Create a new role and define its permissions.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddRole)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Marketing Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of this role's responsibilities" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Role'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
