#accounts
The accounts app for the project.

Houses the django exposed backend. Renders the home page, the landing page, the login and register pages.

Where all ```@login_required``` decorators are pointed to redirect to.

For simplicity, the home page hosts both the landing page and the application. It just includes a different subtemplate 
depending on if a user is logged in or not.

