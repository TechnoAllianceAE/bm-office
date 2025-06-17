
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface MasterSetting {
  id: string;
  name: string;
  type: string;
  created_at: string;
}

interface MasterSettingTableProps {
  items: MasterSetting[];
  type: string;
  newValue: string;
  setNewValue: (value: string) => void;
  onAdd: (type: string, value: string) => void;
  onEdit: (id: string, currentValue: string) => void;
  onSaveEdit: (type: string) => void;
  onDelete: (id: string, type: string) => void;
  editingItem: string | null;
  editValue: string;
  setEditValue: (value: string) => void;
  setEditingItem: (id: string | null) => void;
}

export function MasterSettingTable({
  items,
  type,
  newValue,
  setNewValue,
  onAdd,
  onEdit,
  onSaveEdit,
  onDelete,
  editingItem,
  editValue,
  setEditValue,
  setEditingItem
}: MasterSettingTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder={`Enter ${type.replace('_', ' ')}`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onAdd(type, newValue)}
        />
        <Button onClick={() => onAdd(type, newValue)}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {editingItem === item.id ? (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && onSaveEdit(type)}
                  />
                ) : (
                  <Badge variant="outline">{item.name}</Badge>
                )}
              </TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {editingItem === item.id ? (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onSaveEdit(type)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingItem(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(item.id, item.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(item.id, type)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
