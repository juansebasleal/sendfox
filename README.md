# sendfox

SendFox Problem - By Sebastian Leal, 2019  

This README is intender for Windows 7 (64 bits) Users.  
For other opertive systems, please try finding its proper installers/packages.  

***************************************************************
Installing tools

1. You can independetly install Apache, PHP .... ; or you can install a package/environment that contains all of them.  
I recomend using WAMP server: http://www.wampserver.com/en/  
Choose PHP 7.3  
Make sure it runs MySQL (5.7)

2. In MySQL, create a database called "sendfox" with collation = utf8mb4_general_ci

3. Install an IDE, for example Visual Studio Code. Also install Composer / npm / git for Windows.

4. Go to C:\wamp64\www and clone/download the main project. Run:  
git clone https://github.com/juansebasleal/sendfox.git

5. Configure it as sendfoxproblem.com  
Append  
127.0.0.1 sendfoxproblem.com  
at the bottom of this file: C:\Windows\System32\drivers\etc\hosts

1. Add vitualhost in C:\wamp64\bin\apache\apache2.4.39\conf\extra\httpd-vhosts.conf  
```<VirtualHost *:80>  
  ServerName localhost  
  ServerAlias localhost  
  DocumentRoot "${INSTALL_DIR}/www/SendFox/public"  
  <Directory "${INSTALL_DIR}/www/SendFox/public/">  
    Options +Indexes +Includes +FollowSymLinks +MultiViews  
    AllowOverride All  
    Require local  
  </Directory>  
</VirtualHost>  
```

7. Copy .env.example to .env and  edit this section as follows:  
DB_CONNECTION=mysql  
DB_HOST=127.0.0.1  
DB_PORT=3306  
DB_DATABASE=sendfox  
DB_USERNAME=root  
DB_PASSWORD=YOURPASSWORD

8. Run migrations. This should create tables within sendfox database. Run:  
php artisan migrate

9. Run the app:  
npm install  
npm run dev  
php artisan serve



------------- Possible issues:  

"Illuminate\Database\QueryException  : SQLSTATE[42000]: Syntax error or access violation: 1071 Specified key was too long; max key length is 1000 bytes"  
if MySQL older than the 5.7.7  
Go to app/Providers/AppServiceProvider.php::boot()  
and add this: Schema::defaultStringLength(191);  
Taken from: https://laravel.com/docs/master/migrations#creating-indexes



Special thanks to:  
https://blog.pusher.com/react-laravel-application/  
https://github.com/facebook/draft-js  
https://reactrocket.com/post/draft-js-persisting-content/  
https://medium.com/@siobhanpmahoney/  building-a-rich-text-editor-with-draft-js-react-redux-and-rails-ef8d2e2897bf


USEFUL COMMANDS  
npm run dev & php artisan serve  
php artisan view:clear  
php artisan cache:clear


FUTURE WORK, this that can be enhanced:  
- Add diagram(s) about its architecture  
- Paginator: support changing page size, persist current page when navigating. This might be achieve throug including a plugin.  
- enhance subject (js error) and email body (alert) validations  
- Do automated tests; try to test all posible scenarios: not logged users, sending inccorect vales to the API  
- rename create() to something like upsert() --  controller and view  
- Enhance REST API services security, maybe using JWT
