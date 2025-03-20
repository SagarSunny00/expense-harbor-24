
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Coffee, Home, Car, Zap, Filter } from 'lucide-react';

// Example transaction data
const transactions = [
  {
    id: 1,
    description: 'Grocery Shopping',
    amount: -120.50,
    date: '2023-08-15',
    category: 'Food',
    icon: <ShoppingBag className="h-4 w-4" />
  },
  {
    id: 2,
    description: 'Coffee Shop',
    amount: -4.75,
    date: '2023-08-14',
    category: 'Food',
    icon: <Coffee className="h-4 w-4" />
  },
  {
    id: 3,
    description: 'Monthly Rent',
    amount: -1200,
    date: '2023-08-01',
    category: 'Housing',
    icon: <Home className="h-4 w-4" />
  },
  {
    id: 4,
    description: 'Gas Station',
    amount: -45.30,
    date: '2023-08-10',
    category: 'Transportation',
    icon: <Car className="h-4 w-4" />
  },
  {
    id: 5,
    description: 'Electric Bill',
    amount: -85.20,
    date: '2023-08-05',
    category: 'Utilities',
    icon: <Zap className="h-4 w-4" />
  }
];

interface TransactionItemProps {
  transaction: typeof transactions[0];
  index: number;
}

const TransactionItem = ({ transaction, index }: TransactionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between py-4 border-b border-border/50 last:border-0 group"
    >
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
          {transaction.icon}
        </div>
        <div>
          <p className="font-medium text-sm">
            {transaction.description}
          </p>
          <p className="text-xs text-muted-foreground">
            {new Date(transaction.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-xs font-normal px-2">
          {transaction.category}
        </Badge>
        <p className={`text-sm font-medium tabular-nums ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(transaction.amount)}
        </p>
      </div>
    </motion.div>
  );
};

const RecentTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredTransactions = transactions.filter(transaction => {
    // First filter by search term
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then filter by active tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'food') return matchesSearch && transaction.category === 'Food';
    if (activeTab === 'housing') return matchesSearch && transaction.category === 'Housing';
    if (activeTab === 'transport') return matchesSearch && transaction.category === 'Transportation';
    
    return matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
    >
      <Card className="overflow-hidden border border-border/50 shadow-soft hover:border-primary/20 hover:shadow-medium transition-all duration-500">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 font-normal">
                <Filter className="h-3 w-3" /> Filters
              </Badge>
            </div>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-10 bg-secondary/50 border-secondary focus-visible:ring-1 focus-visible:ring-offset-0"
            />
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 h-9 w-full bg-secondary/50">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="food" className="text-xs">Food</TabsTrigger>
              <TabsTrigger value="housing" className="text-xs">Housing</TabsTrigger>
              <TabsTrigger value="transport" className="text-xs">Transport</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-4">
          <AnimatePresence>
            {filteredTransactions.length > 0 ? (
              <div>
                {filteredTransactions.map((transaction, index) => (
                  <TransactionItem 
                    key={transaction.id} 
                    transaction={transaction}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <p className="text-muted-foreground">No transactions found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentTransactions;
