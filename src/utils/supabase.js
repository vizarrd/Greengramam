import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication functions for username/password
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

export const getSession = () => {
  return supabase.auth.getSession();
};

// Profile functions
export const createProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ 
      id: userId,
      ...profileData 
    }]);
  
  return { data, error };
};

export const getProfile = async (userId) => {
  console.log('🔍 Fetching profile for user ID:', userId);
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  console.log('📋 Database response:', { data, error });
  
  return { data, error };
};

// Test function to check if profiles table exists and is accessible
export const testProfilesTable = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    console.log('🏗️ Profiles table test:', { data, error });
    return { data, error };
  } catch (err) {
    console.error('❌ Profiles table test failed:', err);
    return { data: null, error: err };
  }
};