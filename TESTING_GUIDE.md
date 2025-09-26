# Complete Testing Guide for Green Gramam Authentication System

## Prerequisites

1. **Supabase Database Setup**
   - Run the SQL from `setup_database.sql` in your Supabase SQL Editor
   - Verify the `profiles` table was created successfully
   - Ensure your `.env` file has the correct Supabase credentials

2. **Development Server**
   - Make sure `npm run dev` is running
   - App should be accessible at `http://localhost:5174/`

## Testing Checklist

### 🔐 **Authentication Flow Testing**

#### **New User Sign Up**
1. **Navigate to**: `http://localhost:5174/`
2. **Expected**: Should see Sign In/Sign Up page (not main app)
3. **Click**: "Sign Up" tab
4. **Enter**:
   - Email: `test@example.com` (or any valid email)
   - Password: `password123` (at least 8 characters)
   - Confirm Password: `password123`
5. **Click**: "Create Account" button
6. **Expected**: Should redirect to Profile Creation page

#### **Profile Creation**
1. **Fill in the form**:
   - **Name**: `John Doe`
   - **Age**: `25`
   - **Gender**: Select any option
   - **State**: Select a state (should load from API)
   - **District**: Select a district (should load after state selection)
   - **Taluk**: Select a taluk (should load after district selection)
2. **Click**: "Complete Profile"
3. **Expected**: Should redirect to Home page with navbar visible

#### **Sign Out**
1. **Click**: Logout icon (arrow) in the navbar
2. **Expected**: Should redirect back to Sign In/Sign Up page

#### **Existing User Sign In**
1. **Click**: "Sign In" tab
2. **Enter**: Same credentials used for sign up
3. **Click**: "Sign In" button
4. **Expected**: Should go directly to Home page (skip profile creation)

### 🗺️ **Location API Testing**

#### **API Integration Test**
1. **Navigate to**: `http://localhost:5174/location-test`
2. **Test the dropdown cascade**:
   - Select a state → Districts should load
   - Select a district → Taluks should load
3. **Check browser console** for API calls and data loading
4. **Expected**: Should see hierarchical location data loading

#### **Profile Creation Location Testing**
1. **Go through sign up flow again** with different email
2. **On Profile Creation page**:
   - Select different states and observe district loading
   - Test loading indicators
   - Verify all dropdowns work properly
3. **Submit profile** and verify data is saved correctly

### 🔍 **Database Verification**

#### **Check Profile Data**
1. **Go to Supabase Dashboard** → Table Editor → profiles
2. **Verify**: New profile entries appear after completing profile creation
3. **Check**: All fields are populated correctly
4. **Test**: Row Level Security (users can only see their own profiles)

#### **Authentication Data**
1. **Go to Supabase Dashboard** → Authentication → Users
2. **Verify**: New user entries appear after sign up
3. **Check**: Email addresses match what you entered

### 🧪 **Error Handling Testing**

#### **Authentication Errors**
1. **Try signing up** with same email twice → Should show error
2. **Try signing in** with wrong password → Should show error
3. **Try signing in** with non-existent email → Should show error

#### **Profile Creation Errors**
1. **Leave required fields empty** → Should show validation errors
2. **Enter invalid age** (like 0 or 200) → Should show error
3. **Test form without selecting location** → Should prevent submission

#### **Network/API Errors**
1. **Disconnect internet** and try location API test → Should fall back to static data
2. **Test profile creation** without internet → Should still work with fallback data

### 🎨 **UI/UX Testing**

#### **Responsive Design**
1. **Test on different screen sizes** (mobile, tablet, desktop)
2. **Check**: All forms remain usable and readable
3. **Verify**: Navigation works on mobile

#### **Loading States**
1. **Observe loading spinners** during:
   - Authentication requests
   - Location data loading
   - Profile creation
2. **Verify**: Loading indicators appear and disappear correctly

#### **Visual Design**
1. **Check**: Farming theme elements (crop emojis, green colors)
2. **Verify**: Consistent styling across all pages
3. **Test**: Form validation states and error messages

## Common Issues & Solutions

### 🚨 **Troubleshooting**

#### **"Missing Supabase environment variables"**
- Check that `.env` file exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart development server after changing `.env`

#### **"relation public.profiles does not exist"**
- Run the SQL from `setup_database.sql` in Supabase SQL Editor
- Check Table Editor in Supabase to verify table creation

#### **Authentication not working**
- Verify Supabase project URL and anon key are correct
- Check that email authentication is enabled in Supabase
- Look for error messages in browser console

#### **Location API not loading**
- Check browser console for network errors
- Verify fallback data is loading if API fails
- Test with `/location-test` route first

#### **Profile creation fails**
- Check database policies are set up correctly
- Verify user is authenticated before accessing profile creation
- Check for validation errors in form fields

## Success Criteria

✅ **Complete Flow Works**:
- Sign Up → Profile Creation → Home → Sign Out → Sign In → Home

✅ **Data Persistence**:
- Profiles are saved to database
- Users can sign out and back in
- Location data loads properly

✅ **Error Handling**:
- Appropriate error messages show for invalid inputs
- Fallback data works when API is unavailable
- Form validation prevents invalid submissions

✅ **User Experience**:
- Smooth transitions between pages
- Loading states provide feedback
- Mobile responsive design works

## Next Steps After Testing

1. **Customize**: Add more Indian states/regions as needed
2. **Enhance**: Add profile editing functionality
3. **Extend**: Add village-level location data
4. **Deploy**: Set up production environment with proper SMS/email providers
5. **Scale**: Add role-based access control for different user types

---

**Ready to test?** Start with the database setup, then follow the testing checklist step by step! 🚀