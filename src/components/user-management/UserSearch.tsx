
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UserSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function UserSearch({ searchTerm, setSearchTerm }: UserSearchProps) {
  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search users..." 
        className="pl-8" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
      />
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')} 
          className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
