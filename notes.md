 # Adding a code base to Github
1. Check if you have .git in any of your folders
2. Initialize a git repository
> git init
3. create a .gitignore file -> this should include items like node
  -git ignore a file that contains all the files and folders you dont want to add to github
4. Add all the files to our git repository using:
   > git add .  
5. Add a commit message
   > git commit -m 'my first commit'  
6. Connect to the online repository using 
   > git remote add origin ___________________
7. Push the code
   > git push origin master

# Making commits
- Ideally each time you make a substantial change
  > git add .
  > git commit -m 'message related to the changes'
  > git push origin master
