- Updated: 11/24/2019
  GIT from Clone Project- https://www.youtube.com/watch?v=-zvHQXnBO6c
  git remote –v //(check the remote repo)

* git remote add upstream <Link to the Repo> //use this line if upstream is not working
  git remote –v (check that both are included)
  git fetch upstream (will bring the updates from ORG fork to your computer)
  git merge upstream/master (merge the changes with your branch)
  git push origin master (push it to your Git master)

Basic Commands - https://www.youtube.com/watch?v=SWYqp7iY_Tc
Git init – initialize local git repository
Git add . //add ALL files to index
Git add <file> //add one file to index
Git status //check status
Git commit –m ‘info on the commit’ //commit changes
Git push – push to remote repository
git push origin <branch_name> // push to a specific branch
Git pull – pull the latest from a remote repository
git commit <FileName> // remove file from list of files to be update
git branch <NAME> //create a new branch
git checkout <Branch name> //to be on the new branch/ or master
git merge <branch name> //must be on the master branch to merge both branches
git branch -d <branch_name> //delete branch

## NPM

npm outdated
npm update <packge> --save
npm update <packge> --dev --save-dev
npm audit
run `npm audit fix` to fix them, or `npm audit` for details
