
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log('Checking Supabase connection...');
        // A simple query to check if we can connect to Supabase
        const { data, error } = await supabase.from('fake_table').select('*').limit(1);
        
        // We expect an error about the table not existing, but the connection worked
        if (error && error.code === '42P01') {
          console.log('Supabase connection successful (expected table not found error)');
          setConnectionStatus('connected');
        } else if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('error');
        } else {
          console.log('Supabase connection successful');
          setConnectionStatus('connected');
        }
      } catch (err) {
        console.error('Supabase connection error:', err);
        setConnectionStatus('error');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">ExpenseTracker</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Supabase Connection Status:</h2>
          {connectionStatus === 'checking' && (
            <p className="text-yellow-600">Checking connection to Supabase...</p>
          )}
          {connectionStatus === 'connected' && (
            <p className="text-green-600">Successfully connected to Supabase!</p>
          )}
          {connectionStatus === 'error' && (
            <div className="text-red-600">
              <p>Error connecting to Supabase.</p>
              <p className="mt-2 text-sm">Make sure to:</p>
              <ol className="list-decimal pl-5 mt-1 text-sm">
                <li>Create a .env file in the root directory</li>
                <li>Add your Supabase URL as VITE_SUPABASE_URL</li>
                <li>Add your anon key as VITE_SUPABASE_ANON_KEY</li>
                <li>Restart the development server</li>
              </ol>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Link 
            to="/login" 
            className="block w-full py-2 px-4 bg-primary text-white text-center rounded-md hover:bg-primary/90 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="block w-full py-2 px-4 border border-primary text-primary text-center rounded-md hover:bg-primary/10 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
