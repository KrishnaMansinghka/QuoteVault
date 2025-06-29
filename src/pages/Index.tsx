import { useState, useEffect } from 'react';
import { Moon, Sun, Plus, Search, Sparkles, BookOpen, Quote, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

// Mock data for development
const mockQuotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    source: "Stanford Commencement Address",
    tags: ["motivation", "work", "passion"]
  },
  {
    id: 2,
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    source: "Personal Letters",
    tags: ["opportunity", "challenges", "wisdom"]
  },
  {
    id: 3,
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    source: "Beautiful Boy",
    tags: ["life", "philosophy", "present"]
  },
  {
    id: 4,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    source: "Speeches",
    tags: ["dreams", "future", "inspiration"]
  },
  {
    id: 5,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    source: "Nicomachean Ethics",
    tags: ["hope", "philosophy", "resilience"]
  },
  {
    id: 6,
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
    tags: ["journey", "beginning", "wisdom"]
  }
];

const FloatingGlyphs = () => {
  const glyphs = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating alphabets */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`glyph-${i}`}
          className="absolute text-muted-foreground/50 dark:text-muted-foreground/40 text-3xl font-playfair animate-float-glyph"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          {glyphs[Math.floor(Math.random() * glyphs.length)]}
        </div>
      ))}
      {/* Floating book icons */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`bookicon-${i}`}
          className="absolute animate-float-glyph"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${18 + Math.random() * 12}s`
          }}
        >
          <BookOpen className="w-8 h-8 text-[#7c6f5c] opacity-70" />
        </div>
      ))}
    </div>
  );
};

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [quotes, setQuotes] = useState(mockQuotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [newQuote, setNewQuote] = useState({
    text: '',
    author: '',
    source: '',
    tags: ''
  });

  // Theme toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Filter quotes
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = searchQuery === '' || 
      quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.source.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => quote.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Get all unique tags
  const allTags = [...new Set(quotes.flatMap(quote => quote.tags))];

  const handleAddQuote = () => {
    if (!newQuote.text || !newQuote.author) {
      toast({
        title: "Missing fields",
        description: "Please fill in at least the quote text and author.",
        variant: "destructive"
      });
      return;
    }

    const tags = newQuote.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const quote = {
      id: quotes.length + 1,
      text: newQuote.text,
      author: newQuote.author,
      source: newQuote.source || 'Unknown',
      tags
    };

    setQuotes([quote, ...quotes]);
    setNewQuote({ text: '', author: '', source: '', tags: '' });
    setIsAddDialogOpen(false);
    
    // Quote-burst confetti effect
    const confettiElements = ['❝', '❞', '—', '•', '‚', '"', '"'];
    confettiElements.forEach((glyph, i) => {
      const element = document.createElement('div');
      element.textContent = glyph;
      element.className = 'fixed text-2xl text-vault-primary pointer-events-none z-50 animate-quote-burst';
      element.style.left = '50%';
      element.style.top = '50%';
      element.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg)`;
      element.style.animationDelay = `${i * 50}ms`;
      document.body.appendChild(element);
      
      setTimeout(() => element.remove(), 2000);
    });
    
    toast({
      title: "Quote added!",
      description: "Your quote has been added to the vault.",
    });
  };

  const handleEditQuote = (quote) => {
    setEditingQuote(quote);
    setNewQuote({
      text: quote.text,
      author: quote.author,
      source: quote.source,
      tags: quote.tags.join(', ')
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateQuote = () => {
    if (!newQuote.text || !newQuote.author) {
      toast({
        title: "Missing fields",
        description: "Please fill in at least the quote text and author.",
        variant: "destructive"
      });
      return;
    }

    const tags = newQuote.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const updatedQuote = {
      ...editingQuote,
      text: newQuote.text,
      author: newQuote.author,
      source: newQuote.source || 'Unknown',
      tags
    };

    setQuotes(quotes.map(quote => quote.id === editingQuote.id ? updatedQuote : quote));
    setNewQuote({ text: '', author: '', source: '', tags: '' });
    setIsEditDialogOpen(false);
    setEditingQuote(null);
    
    toast({
      title: "Quote updated!",
      description: "Your quote has been successfully updated.",
    });
  };

  const handleDeleteQuote = (quoteId) => {
    setQuotes(quotes.filter(quote => quote.id !== quoteId));
    toast({
      title: "Quote deleted",
      description: "The quote has been removed from your vault.",
    });
  };

  const generateAIQuote = async () => {
    // TODO: Implement OpenAI integration
    const aiQuotes = [
      "The canvas of tomorrow is painted with the brushstrokes of today's choices.",
      "In silence, we find the loudest truths waiting to be discovered.",
      "Every ending is merely a comma in the sentence of our becoming.",
      "The strongest trees grow in the winds of uncertainty.",
      "What we seek is often seeking us in return."
    ];
    
    const randomQuote = aiQuotes[Math.floor(Math.random() * aiQuotes.length)];
    
    toast({
      title: "AI Inspiration",
      description: randomQuote,
      duration: 8000
    });
  };

  const scrollToVault = () => {
    document.getElementById('vault-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Glyphs Background */}
      <FloatingGlyphs />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-vault-primary" />
            <span className="font-playfair text-2xl font-bold text-foreground">Quote Vault</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="glassmorphism rounded-full w-12 h-12 transition-all duration-300"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </Button>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Literary punctuation field (both modes with better visibility) */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute text-muted-foreground/40 dark:text-muted-foreground/30 animate-literary-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${8 + Math.random() * 6}px`
                }}
              >
                {['·', '—', '.', '‚', '"', '"', '…'][Math.floor(Math.random() * 7)]}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="font-playfair text-6xl md:text-8xl font-bold mb-6 text-balance text-foreground">
            Words Worth{' '}
            <span className="text-vault-primary">Keeping</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
            A private, delightfully aesthetic vault where readers stash, tag, search, and serendipitously surface the quotes that move them.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToVault}
              size="lg"
              className="bg-vault-primary hover:bg-vault-primary/90 text-white px-8 py-4 text-lg font-medium"
            >
              Enter Vault
            </Button>
            
            <Button 
              onClick={generateAIQuote}
              variant="outline"
              size="lg"
              className="border-vault-secondary text-vault-secondary hover:bg-vault-secondary hover:text-white px-8 py-4 text-lg font-medium"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              AI Surprise Me
            </Button>
          </div>
        </div>
      </section>

      {/* Vault Section */}
      <section id="vault-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Bar */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search quotes, authors, or sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg glassmorphism border-vault-primary/20 focus:border-vault-primary text-foreground"
              />
            </div>
            
            {/* Magnetic Tag Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {allTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 magnetic-chip ${
                    selectedTags.includes(tag) 
                      ? 'bg-vault-primary text-white' 
                      : 'hover:bg-vault-primary/10 text-foreground'
                  }`}
                  onClick={() => {
                    setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Masonry Grid with Elastic Brackets and Edit/Delete */}
          <div className="masonry-grid">
            {filteredQuotes.map((quote, index) => (
              <div
                key={quote.id}
                className="quote-card animate-fade-in elastic-brackets-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-vault-primary/30 mb-3" />
                  <p className="text-lg leading-relaxed font-medium text-balance text-foreground">
                    "{quote.text}"
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="author-attribution text-foreground/80">
                    — {quote.author}
                  </div>
                  
                  {quote.source && (
                    <div className="text-sm text-muted-foreground italic">
                      {quote.source}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {quote.tags.map(tag => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Edit/Delete buttons - only visible on hover */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditQuote(quote)}
                      className="text-xs"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteQuote(quote.id)}
                      className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuotes.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">No quotes found matching your criteria.</p>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Floating Add Button */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-vault-primary hover:bg-vault-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-40"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] glassmorphism">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-foreground">Add New Quote</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="quote-text" className="text-base font-medium text-foreground">Quote Text *</Label>
              <Textarea
                id="quote-text"
                placeholder="Enter the quote text..."
                value={newQuote.text}
                onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
                className="min-h-[120px] resize-none typewriter-trail text-foreground"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author" className="text-base font-medium text-foreground">Author *</Label>
                <Input
                  id="author"
                  placeholder="Author name"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                  className="text-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source" className="text-base font-medium text-foreground">Source</Label>
                <Input
                  id="source"
                  placeholder="Book, speech, etc."
                  value={newQuote.source}
                  onChange={(e) => setNewQuote({...newQuote, source: e.target.value})}
                  className="text-foreground"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base font-medium text-foreground">Tags</Label>
              <Input
                id="tags"
                placeholder="inspiration, wisdom, life (comma-separated)"
                value={newQuote.tags}
                onChange={(e) => setNewQuote({...newQuote, tags: e.target.value})}
                className="text-foreground"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddQuote}
                className="bg-vault-primary hover:bg-vault-primary/90"
              >
                Add Quote
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Quote Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] glassmorphism">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl text-foreground">Edit Quote</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-quote-text" className="text-base font-medium text-foreground">Quote Text *</Label>
              <Textarea
                id="edit-quote-text"
                placeholder="Enter the quote text..."
                value={newQuote.text}
                onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
                className="min-h-[120px] resize-none typewriter-trail text-foreground"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-author" className="text-base font-medium text-foreground">Author *</Label>
                <Input
                  id="edit-author"
                  placeholder="Author name"
                  value={newQuote.author}
                  onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                  className="text-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-source" className="text-base font-medium text-foreground">Source</Label>
                <Input
                  id="edit-source"
                  placeholder="Book, speech, etc."
                  value={newQuote.source}
                  onChange={(e) => setNewQuote({...newQuote, source: e.target.value})}
                  className="text-foreground"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-tags" className="text-base font-medium text-foreground">Tags</Label>
              <Input
                id="edit-tags"
                placeholder="inspiration, wisdom, life (comma-separated)"
                value={newQuote.tags}
                onChange={(e) => setNewQuote({...newQuote, tags: e.target.value})}
                className="text-foreground"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingQuote(null);
                  setNewQuote({ text: '', author: '', source: '', tags: '' });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateQuote}
                className="bg-vault-primary hover:bg-vault-primary/90"
              >
                Update Quote
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
