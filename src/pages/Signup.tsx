
import { Navigate } from 'react-router-dom';
import SignupForm from '@/components/auth/SignupForm';
import { motion } from 'framer-motion';

const Signup = () => {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('user') !== null;
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with image and brand */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 bg-primary p-8 flex flex-col justify-between text-white md:min-h-screen"
      >
        <div>
          <h1 className="text-2xl font-bold">ExpenseTracker</h1>
        </div>
        
        <div className="max-w-md">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Start your financial journey today</h2>
          <p className="text-primary-foreground/80">Track your expenses, set budgets, and achieve your financial goals with our simple yet powerful expense tracking tool.</p>
        </div>
        
        <div className="text-sm text-primary-foreground/60">
          &copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.
        </div>
      </motion.div>
      
      {/* Right side with signup form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Create an account</h2>
            <p className="text-muted-foreground mt-2">Sign up to start tracking your expenses</p>
          </div>
          
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
