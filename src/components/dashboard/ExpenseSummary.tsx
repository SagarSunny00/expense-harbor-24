
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, DollarSign, CreditCard, Calendar, PieChart } from 'lucide-react';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface SummaryCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  delay: number;
}

const SummaryCard = ({ title, value, change, icon, delay }: SummaryCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: delay * 0.1
      }}
    >
      <Card className="overflow-hidden h-full border border-border/50 shadow-soft hover:border-primary/20 hover:shadow-medium transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
              <AnimatedNumber 
                value={value} 
                className="text-2xl font-semibold" 
              />
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className={`text-xs font-medium flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {Math.abs(change)}%
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const CategoryDistribution = () => {
  const categories = [
    { name: 'Housing', value: 35, color: 'bg-blue-500' },
    { name: 'Food', value: 25, color: 'bg-green-500' },
    { name: 'Transportation', value: 15, color: 'bg-yellow-500' },
    { name: 'Entertainment', value: 15, color: 'bg-purple-500' },
    { name: 'Others', value: 10, color: 'bg-gray-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="col-span-2 lg:col-span-1 row-span-2"
    >
      <Card className="overflow-hidden h-full border border-border/50 shadow-soft hover:border-primary/20 hover:shadow-medium transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">Spending by Category</p>
              <h3 className="text-xl font-semibold">Distribution</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <PieChart className="h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-4">
            {categories.map((category, index) => (
              <motion.div 
                key={category.name}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${category.color} rounded-full`}
                    style={{ width: `${category.value}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.value}%` }}
                    transition={{ duration: 1.5, delay: 0.2 + (0.1 * index) }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ExpenseSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Spent"
        value={2580.25}
        change={12.5}
        icon={<DollarSign className="h-5 w-5" />}
        delay={1}
      />
      <SummaryCard
        title="Monthly Budget"
        value={3500}
        change={0}
        icon={<CreditCard className="h-5 w-5" />}
        delay={2}
      />
      <SummaryCard
        title="Remaining"
        value={919.75}
        change={-12.5}
        icon={<Calendar className="h-5 w-5" />}
        delay={3}
      />
      <CategoryDistribution />
    </div>
  );
};

export default ExpenseSummary;
