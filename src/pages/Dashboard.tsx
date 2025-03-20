
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { LogOut, PieChart, List, Plus, WalletCards } from 'lucide-react';
import ExpenseSummary from '@/components/dashboard/ExpenseSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import AddExpenseForm from '@/components/dashboard/AddExpenseForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
      navigate('/login');
    }
    
    // Simulate data loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WalletCards className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">ExpenseTracker</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-sm h-9 px-3"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </motion.div>
              
              <div className="text-sm font-medium">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Hello, {user?.name || user?.email.split('@')[0]}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-semibold tracking-tight"
          >
            Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Track your expenses and manage your financial goals
          </motion.p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="h-11 w-full max-w-sm grid grid-cols-3">
            <TabsTrigger value="overview" className="text-sm flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-sm flex items-center gap-2">
              <List className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="text-sm flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Expense</span>
            </TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <TabsContent value="overview" className="mt-6">
              <ExpenseSummary />
            </TabsContent>
            
            <TabsContent value="transactions" className="mt-6">
              <RecentTransactions />
            </TabsContent>
            
            <TabsContent value="add" className="mt-6">
              <div className="max-w-md mx-auto">
                <AddExpenseForm />
              </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
