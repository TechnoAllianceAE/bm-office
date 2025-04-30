
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { 
  Inbox, Send, Trash, Star, Tag, 
  Plus, Settings, Search, Check, RefreshCw, 
  ChevronDown, Filter, MoreVertical, Paperclip, 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, 
  Link, Image, Smile, AtSign, 
  Send as SendIcon, X, PanelLeftClose,
  FileText, // Using FileText instead of Draft which doesn't exist
} from 'lucide-react';

// Add your MailBox component implementation here
const MailBox = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Mail</h1>
          <p className="text-muted-foreground">Manage your emails and messages</p>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card className="p-4 h-full">
            <div className="space-y-1 mb-6">
              <button className="bg-primary text-white px-4 py-2 rounded-md w-full flex items-center justify-center">
                <Plus className="mr-2 h-4 w-4" /> Compose
              </button>
            </div>
            
            <div className="space-y-1">
              <button className="flex items-center w-full p-2 rounded-md bg-primary/10 text-primary">
                <Inbox className="mr-2 h-4 w-4" /> Inbox <span className="ml-auto bg-primary text-white rounded-full px-2 text-xs">12</span>
              </button>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                <Send className="mr-2 h-4 w-4" /> Sent
              </button>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                <FileText className="mr-2 h-4 w-4" /> Drafts <span className="ml-auto bg-muted text-muted-foreground rounded-full px-2 text-xs">2</span>
              </button>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                <Star className="mr-2 h-4 w-4" /> Starred
              </button>
              <button className="flex items-center w-full p-2 rounded-md hover:bg-muted/80">
                <Trash className="mr-2 h-4 w-4" /> Trash
              </button>
            </div>
            
            <div className="border-t mt-4 pt-4">
              <h3 className="font-medium text-sm mb-2">Labels</h3>
              <div className="space-y-1">
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span> Work
                </div>
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> Personal
                </div>
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span> Important
                </div>
                <div className="flex items-center p-2 hover:bg-muted/80 rounded-md cursor-pointer text-muted-foreground">
                  <Tag className="h-4 w-4 mr-2" /> Manage labels
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="col-span-9">
          <Card className="h-full">
            <div className="border-b p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search emails..." 
                    className="w-full pl-8 pr-4 py-2 rounded-md border bg-transparent"
                  />
                </div>
                <button className="p-2 rounded-md hover:bg-muted">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-md hover:bg-muted">
                  <RefreshCw className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs text-muted-foreground hover:text-foreground">
                  1-50 of 234
                </button>
                <button className="p-1 rounded-md hover:bg-muted">
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-md hover:bg-muted">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                <div className="border rounded-md p-4">
                  <h2 className="text-lg font-medium mb-4">New Message</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <label className="w-16 text-right text-muted-foreground">To:</label>
                      <input type="text" className="flex-1 p-2 border-b focus:outline-none" placeholder="Recipients" />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="w-16 text-right text-muted-foreground">Subject:</label>
                      <input type="text" className="flex-1 p-2 border-b focus:outline-none" placeholder="Subject" />
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <button className="p-1.5 rounded hover:bg-muted" title="Bold">
                          <Bold className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Italic">
                          <Italic className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Underline">
                          <Underline className="h-4 w-4" />
                        </button>
                        <span className="border-r h-6"></span>
                        <button className="p-1.5 rounded hover:bg-muted" title="Bullet list">
                          <List className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Numbered list">
                          <ListOrdered className="h-4 w-4" />
                        </button>
                        <span className="border-r h-6"></span>
                        <button className="p-1.5 rounded hover:bg-muted" title="Align left">
                          <AlignLeft className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Align center">
                          <AlignCenter className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Align right">
                          <AlignRight className="h-4 w-4" />
                        </button>
                        <span className="border-r h-6"></span>
                        <button className="p-1.5 rounded hover:bg-muted" title="Insert link">
                          <Link className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Insert image">
                          <Image className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Insert emoji">
                          <Smile className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 rounded hover:bg-muted" title="Mention someone">
                          <AtSign className="h-4 w-4" />
                        </button>
                        <span className="border-r h-6"></span>
                        <button className="p-1.5 rounded hover:bg-muted flex items-center gap-1 text-sm" title="AI Assist">
                          <span className="text-xs font-medium">AI</span>
                          <span className="text-xs text-muted-foreground">Assist</span>
                        </button>
                      </div>
                      <div className="p-4 min-h-[200px]" contentEditable>
                        <p>Write your message here...</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded hover:bg-muted" title="Attach files">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 rounded bg-muted hover:bg-muted/80 text-sm font-medium">
                          Save as Draft
                        </button>
                        <button className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium flex items-center gap-2">
                          Send
                          <SendIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Adding the default export that was missing
export default MailBox;
