
import { Button } from '@/components/ui/button';
import { Apple, Github, Linkedin } from 'lucide-react';
import { Facebook } from 'lucide-react';

export const SocialLoginButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="outline" className="w-full">
        <Facebook className="h-4 w-4 mr-2" />
        Google
      </Button>
      <Button variant="outline" className="w-full">
        <Apple className="h-4 w-4 mr-2" />
        Apple ID
      </Button>
      <Button variant="outline" className="w-full">
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button variant="outline" className="w-full">
        <Github className="h-4 w-4 mr-2" />
        GitHub
      </Button>
    </div>
  );
};
