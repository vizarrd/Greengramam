// Debug utility for Supabase connection and data issues
import { supabase } from './supabase';

export const debugSupabaseConnection = async () => {
  console.log('🔧 === SUPABASE DEBUG REPORT ===');
  
  try {
    // 1. Test basic connection
    console.log('1️⃣ Testing Supabase connection...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (healthError) {
      console.error('❌ Connection failed:', healthError);
      return false;
    } else {
      console.log('✅ Connection successful');
    }

    // 2. Check current user
    console.log('2️⃣ Checking current user...');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('❌ User check failed:', userError);
      return false;
    }
    
    if (!user) {
      console.log('⚠️ No authenticated user found');
      return false;
    }
    
    console.log('✅ Current user:', {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    });

    // 3. Check if profile exists
    console.log('3️⃣ Checking if profile exists...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id);
    
    if (profileError) {
      console.error('❌ Profile query failed:', profileError);
      return false;
    }
    
    if (!profile || profile.length === 0) {
      console.log('⚠️ No profile found for user');
      console.log('💡 User needs to complete profile creation');
      return false;
    }
    
    console.log('✅ Profile found:', profile[0]);

    // 4. Test RLS policies
    console.log('4️⃣ Testing RLS policies...');
    const { data: rlsTest, error: rlsError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();
    
    if (rlsError) {
      console.error('❌ RLS policy test failed:', rlsError);
      return false;
    }
    
    console.log('✅ RLS policies working correctly');

    // 5. Check environment variables
    console.log('5️⃣ Checking environment variables...');
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'MISSING',
      keyPrefix: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'MISSING'
    });

    console.log('🎉 === DEBUG REPORT COMPLETE - ALL GOOD ===');
    return true;

  } catch (error) {
    console.error('💥 Debug failed:', error);
    return false;
  }
};

export const checkProfileCreationFlow = async () => {
  console.log('🔍 === PROFILE CREATION FLOW CHECK ===');
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('❌ No user authenticated');
      return;
    }

    // Check if user went through profile creation
    console.log('User info:', {
      id: user.id,
      email: user.email,
      emailConfirmed: user.email_confirmed_at,
      createdAt: user.created_at,
      lastSignIn: user.last_sign_in_at
    });

    // Check all profiles in table (for debugging)
    const { data: allProfiles, error } = await supabase
      .from('profiles')
      .select('id, name, created_at');
    
    if (error) {
      console.error('❌ Could not fetch profiles:', error);
    } else {
      console.log('📊 All profiles in database:', allProfiles);
      console.log('🔍 Looking for profile with ID:', user.id);
      
      const userProfile = allProfiles?.find(p => p.id === user.id);
      if (userProfile) {
        console.log('✅ Found user profile:', userProfile);
      } else {
        console.log('❌ User profile not found in database');
        console.log('💡 User needs to complete profile creation process');
      }
    }

  } catch (error) {
    console.error('💥 Profile creation flow check failed:', error);
  }
};