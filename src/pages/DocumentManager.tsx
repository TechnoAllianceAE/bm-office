
import React, { useState } from 'react';
import { Folder, FileText, Upload, Download, RefreshCw, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'document';
  modified: string;
  size?: string;
};

const DMS = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dummyFiles: FileItem[] = [
    { id: '1', name: 'Project Plans', type: 'folder', modified: '2023-11-15' },
    { id: '2', name: 'Marketing Assets', type: 'folder', modified: '2023-11-10' },
    { id: '3', name: 'Financial Reports', type: 'folder', modified: '2023-11-05' },
    { id: '4', name: 'Q4 Strategy.docx', type: 'document', modified: '2023-11-01', size: '2.4 MB' },
    { id: '5', name: 'Team Presentation.pptx', type: 'document', modified: '2023-10-28', size: '5.7 MB' },
    { id: '6', name: 'Budget 2024.xlsx', type: 'document', modified: '2023-10-25', size: '1.2 MB' },
  ];

  const filteredFiles = dummyFiles.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Document Management System</h1>
        <p className="text-muted-foreground">Access, manage, and collaborate on your documents</p>
      </div>

      <Tabs defaultValue="internal">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger value="internal">Internal Storage</TabsTrigger>
            <TabsTrigger value="gdrive">Google Drive</TabsTrigger>
            <TabsTrigger value="onedrive">Microsoft OneDrive</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode('grid')}>
              <Grid className={`h-4 w-4 ${viewMode === 'grid' ? 'text-primary' : ''}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode('list')}>
              <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search documents" 
              className="pl-9 bg-background/50 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-1">
            <Upload className="h-4 w-4" />
            Upload
          </Button>
          <Button variant="outline" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Sync
          </Button>
        </div>

        <TabsContent value="internal">
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-white/10">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center">
                      {file.type === 'folder' ? (
                        <Folder className="h-12 w-12 text-primary/70 mb-2" />
                      ) : (
                        <FileText className="h-12 w-12 text-secondary-foreground/70 mb-2" />
                      )}
                      <span className="font-medium truncate w-full">{file.name}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {file.modified} {file.size ? `• ${file.size}` : ''}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <table className="min-w-full divide-y divide-border/50">
                  <thead className="bg-secondary/30 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Modified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Size</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background/20 backdrop-blur-sm divide-y divide-border/50">
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-secondary/20 transition cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {file.type === 'folder' ? (
                              <Folder className="h-5 w-5 text-primary/70 mr-3" />
                            ) : (
                              <FileText className="h-5 w-5 text-secondary-foreground/70 mr-3" />
                            )}
                            <span>{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {file.modified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {file.size || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="gdrive">
          <Card className="flex items-center justify-center h-64 bg-card/40 backdrop-blur-md border border-white/10">
            <div className="text-center">
              <RefreshCw className="h-10 w-10 text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Connect to Google Drive</h3>
              <p className="text-muted-foreground mb-4">Sync your documents with Google Drive</p>
              <Button>Connect Account</Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="onedrive">
          <Card className="flex items-center justify-center h-64 bg-card/40 backdrop-blur-md border border-white/10">
            <div className="text-center">
              <RefreshCw className="h-10 w-10 text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Connect to Microsoft OneDrive</h3>
              <p className="text-muted-foreground mb-4">Sync your documents with OneDrive</p>
              <Button>Connect Account</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DMS;
