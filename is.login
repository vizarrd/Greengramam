# Login Status File
# This file tracks the authentication state of the application

# Current login status (true/false)
isLoggedIn=false

# User information (when logged in)
userId=
userEmail=
userName=
lastLoginTime=
loginMethod=

# Session management
sessionToken=
sessionExpiry=
rememberMe=false

# Login attempts and security
failedAttempts=0
lockoutTime=
lastAttemptTime=

# Application preferences for logged-in user
preferredLanguage=en
darkMode=false
notifications=true

# Timestamps
createdAt=
updatedAt=

# Notes:
# - Set isLoggedIn=true when user successfully authenticates
# - Clear sensitive data on logout
# - Update timestamps on login/logout events
# - Track failed attempts for security purposes