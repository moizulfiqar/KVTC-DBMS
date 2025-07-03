# School DBMS - Supabase Integration

This project connects your HTML frontend to Supabase for user authentication and data management.

## Setup Instructions

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your **Project URL** and **anon public** key

### 2. Configure the Application

1. Open `config.js` in the KVTC folder
2. Replace the placeholder values with your actual Supabase credentials:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project-id.supabase.co',
    anonKey: 'your-anon-key-here'
};
```

### 3. Database Setup

Make sure your Supabase database has the following table structure (already defined in `script.sql`):

```sql
create table "User" (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'employee')),
  created_at timestamp with time zone default now()
);
```

## Features Implemented

### Signup Process
- User fills out email and password
- System validates input (email format, password length, password confirmation)
- Creates user account in Supabase Auth
- Inserts user profile into the `User` table with role information
- Stores user data in localStorage for session management
- Redirects to home page after successful signup

### Login Process
- User enters email and password
- Authenticates with Supabase Auth
- Fetches user profile from the `User` table
- Stores user data in localStorage
- Redirects to home page after successful login

### Error Handling
- Form validation with user-friendly error messages
- Loading states during authentication
- Proper error handling for network issues and invalid credentials

## File Structure

- `signup.html` - User registration form with Supabase integration
- `login.html` - User login form with Supabase integration
- `config.js` - Supabase configuration file
- `script.sql` - Database schema for the User table

## Security Features

- Password validation (minimum 6 characters)
- Email format validation
- Secure authentication through Supabase Auth
- Role-based access control
- Session management through localStorage

## Usage

1. Open `role-selection.html` to select user role
2. Navigate to `signup.html` to create a new account
3. Or use `login.html` to sign in with existing credentials
4. After successful authentication, users are redirected to `home.html`

## Troubleshooting

### Common Issues

1. **"next is not recognized" error**: Run `npm install` in the project directory
2. **Authentication errors**: Check your Supabase credentials in `config.js`
3. **Database errors**: Ensure your Supabase database has the correct table structure

### Testing

1. Create a test account using the signup form
2. Try logging in with the created credentials
3. Check the browser console for any error messages
4. Verify data is being stored in your Supabase database

## Next Steps

- Implement logout functionality
- Add password reset functionality
- Implement role-based page access
- Add user profile management
- Implement data submission forms for your specific use case 