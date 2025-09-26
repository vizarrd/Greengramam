# Supabase Database Setup

This guide explains how to set up the required database tables for the Green Gramam authentication and profile system.

## Required Tables

### 1. Profiles Table

You need to create a `profiles` table in your Supabase database with the following structure:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age < 150),
    taluk TEXT NOT NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    state TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view and edit their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

## Setup Instructions

### 1. Create the Table

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Create a new query and paste the SQL above
4. Click **Run** to create the table and set up security policies

### 2. Verify Table Creation

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the `profiles` table listed
3. Check that it has the following columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `age` (int4)
   - `taluk` (text)
   - `gender` (text)
   - `state` (text)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

### 3. Test the Setup

After setting up the table, test the authentication flow:

1. Start your app: `npm run dev`
2. Try signing up with a new account
3. Complete the profile creation form
4. Check in Supabase **Table Editor** > **profiles** that the data was saved

## Security Features

- **Row Level Security (RLS)**: Ensures users can only access their own profiles
- **Data Validation**: Age and gender constraints prevent invalid data
- **Automatic Timestamps**: Created and updated timestamps are handled automatically

## Troubleshooting

### Common Issues:

1. **"relation public.profiles does not exist"**
   - Make sure you've run the SQL to create the table

2. **"permission denied for table profiles"**
   - Ensure RLS policies are created correctly
   - Check that the user is authenticated

3. **"duplicate key value violates unique constraint"**
   - User might already have a profile
   - Check the profiles table for existing entries

### Check Your Setup:

```sql
-- Verify table exists
SELECT * FROM information_schema.tables WHERE table_name = 'profiles';

-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- View existing policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```