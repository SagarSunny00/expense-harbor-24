
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, hardcoded login check
      if (formData.email === 'demo@example.com' && formData.password === 'password') {
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md p-8 mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="h-12 pl-4 pr-4 rounded-xl bg-secondary/50 border-secondary focus-visible:ring-1 focus-visible:ring-offset-0"
              autoComplete="email"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="h-12 pl-4 pr-12 rounded-xl bg-secondary/50 border-secondary focus-visible:ring-1 focus-visible:ring-offset-0"
              autoComplete="current-password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl font-medium relative overflow-hidden group transition-all"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? 'Logging in...' : 'Login'}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
        
        <div className="text-center text-sm text-muted-foreground mt-4">
          <span>Don't have an account? </span>
          <Button 
            variant="link" 
            className="p-0 h-auto font-medium text-primary" 
            onClick={() => navigate('/signup')}
          >
            Sign up
          </Button>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Demo account: demo@example.com / password</p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
