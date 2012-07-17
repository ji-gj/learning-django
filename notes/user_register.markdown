사용자 등록 및 관리
================

###실습 준비

실습을 위해서 이전 장의 상태로 코드를 준비하자.

####github에서 복제해 오기

이전 장까지 실습한 코드가 있다면 실습한 코드가 있는 디렉터리로 이동한다.

	$ cd learning-django

_참고:_	이전 장까지 실습한 코드가 로컬에 없다면 github에서 가져온 뒤 이전 장의 상태인 eof-bookmarks-app 태그를 checkout한다.

	$ git clone https://github.com/username/learning-django.git

_참고:_	github에 올려놓은 코드도 없다면 아래 주소에서 가져온 뒤 이전 장의 상태인 eof-bookmarks-app 태그를 checkout한다.

	$ git clone https://github.com/onmoving/learning-django.git

__태그 체크아웃하기:__ 필요하다면(코드가 전 장의 상태가 아니라면) 이전 장의 상태로 만들기 위해서 eof-bookmarks-app 태그를 체크아웃한다.

	$ git checkout eof-bookmarks-app

####브랜치 생성하기

이 장을 실습하기 위한 새로운 브랜치를 만들자. 브랜치의 이름은 user-register로 정한다.

	$ git checkout -b user-register
	Switched to a new branch 'user-register'

####syncdb 수행

필요하다면 syncdb를 수행한다. manage.py 파일이 있는 디렉터리에서 syncdb를 수행한다. superuser를 만들겠냐고 물어보면 계정을 한 개 만든다.

	$ python manage.py syncdb

####runserver로 개발 웹서버 실행

아래 명령으로 개발 웹서버를 실행한 후, 인터넷 브라우저에서 주소로 http://localhost:8000/ 입력하여 페이지가 출력이 되는 지 확인한다.

	$ python manage.py runserver

이제 실습을 위한 준비를 마쳤다.

세션 인증
--------

###로그인 페이지 만들기

	$ python manage.py shell
	Python 2.7.3 (default, Apr 20 2012, 22:44:07) 
	[GCC 4.6.3] on linux2
	Type "help", "copyright", "credits" or "license" for more information.
	(InteractiveConsole)
	>>> from django.contrib.auth.models import User
	>>> user = User.objects.get(id=1)
	>>> user.password
	u'pbkdf2_sha256$10000$0E5U0ngOa8wO$RU2yVxWpH/yxgRhCiqG+leYES7Ri9RRRJ4O9aRFxzA0='


사용자 등록
---------

###사용자 등록 폼 디자인

	$ python manage.py shell
	Python 2.7.3 (default, Apr 20 2012, 22:44:07) 
	[GCC 4.6.3] on linux2
	Type "help", "copyright", "credits" or "license" for more information.
	(InteractiveConsole)
	>>> from bookmarks.forms import *
	>>> form = RegistrationForm()
	>>> print form.as_table()
	<tr><th><label for="id_username">Username:</label></th><td><input id="id_username" type="text" name="username" maxlength="30" /></td></tr>
	<tr><th><label for="id_email">Email:</label></th><td><input type="text" name="email" id="id_email" /></td></tr>
	<tr><th><label for="id_password1">Password:</label></th><td><input type="password" name="password1" id="id_password1" /></td></tr>
	<tr><th><label for="id_password2">Password (Again):</label></th><td><input type="password" name="password2" id="id_password2" /></td></tr>
	>>> 
	>>> print form['username']
	<input id="id_username" type="text" name="username" maxlength="30" />
	>>> 
	>>> form = RegistrationForm({
	...   'username': 'test',
	...   'email': 'test@example.com',
	...   'password1': 'test',
	...   'password2': 'test'
	... })
	>>> form.is_valid()
	True
	>>> 
	>>> form = RegistrationForm({
	...   'username': 'test',
	...   'email': 'invalid email',
	...   'password1': 'test',
	...   'password2': 'test'
	... })
	>>> form.is_valid()
	False
	>>> 
	>>> form.errors
	{'email': [u'Enter a valid e-mail address.']}

###결과 테스트

	$ python manage.py runserver
	Validating models...

	0 errors found
	Django version 1.4, using settings 'django_bookmarks.settings'
	Development server is running at http://127.0.0.1:8000/
	Quit the server with CONTROL-C.


요청 1

	http://localhost:8000/

요청 2

	http://localhost:8000/login/

요청 3

	http://localhost:8000/logout/

요청 4

	http://localhost:8000/register/

###git commit하기

지금까지 실습한 내용을 git에 커밋하자

####스테이징 혹은 커밋할 파일 확인하기

	$ git status
	# On branch user-register
	# Changes not staged for commit:
	#   (use "git add <file>..." to update what will be committed)
	#   (use "git checkout -- <file>..." to discard changes in working directory)
	#
	#	modified:   bookmarks/views.py
	#	modified:   django_bookmarks/urls.py
	#	modified:   templates/main_page.html
	#	modified:   templates/user_page.html
	#
	# Untracked files:
	#   (use "git add <file>..." to include in what will be committed)
	#
	#	bookmarks/forms.py
	#	site_media/
	#	templates/base.html
	#	templates/registration/
	no changes added to commit (use "git add" and/or "git commit -a")

####스테이징 하기

	$ git add .

####커밋 하기

	$ git commit -m "major commit of user-register"
	[user-register 3fb666d] major commit of user-register
	 10 files changed, 189 insertions(+), 54 deletions(-)
	 create mode 100644 bookmarks/forms.py
	 create mode 100644 site_media/style.css
	 create mode 100644 templates/base.html
	 rewrite templates/main_page.html (92%)
	 create mode 100644 templates/registration/login.html
	 create mode 100644 templates/registration/register.html
	 create mode 100644 templates/registration/register_success.html
	 rewrite templates/user_page.html (87%)

####태그 만들기

현재의 소스코드구조에 태그를 부여하자

	$ git tag eof-user-register
	$ git tag -l
	eof-bookmarks-app
	eof-creating-app
	...

####master브랜치에 병합

현재 브랜치인 user-register를 master 브랜치에 병합하자. 병합이 되는 타켓 브랜치가 현재 브랜치 이므로 master 브랜치를 현재 브랜치로 변경하자

	$ git checkout master
	Switched to branch 'master'

merge 명령을 수행한다.

	$ git merge user-register
	Updating ed209e7..3fb666d
	Fast-forward
	 bookmarks/forms.py                           |   35 ++++++++++++++++
	 bookmarks/views.py                           |   56 ++++++++++++++++++--------
	 django_bookmarks/urls.py                     |   16 +++++++-
	 site_media/style.css                         |    7 ++++
	 templates/base.html                          |   25 ++++++++++++
	 templates/main_page.html                     |   27 +++++--------
	 templates/registration/login.html            |   18 +++++++++
	 templates/registration/register.html         |    9 +++++
	 templates/registration/register_success.html |   13 ++++++
	 templates/user_page.html                     |   27 ++++++-------
	 10 files changed, 184 insertions(+), 49 deletions(-)
	 create mode 100644 bookmarks/forms.py
	 create mode 100644 site_media/style.css
	 create mode 100644 templates/base.html
	 create mode 100644 templates/registration/login.html
	 create mode 100644 templates/registration/register.html
	 create mode 100644 templates/registration/register_success.html

eof-user-register 태그를 만들어 놓았으므로 user-register 브랜치는 필요 없다. user-register를 삭제하자.

	$ git branch -d user-register
	Deleted branch user-register (was 3fb666d).

###github에 올리기

지금까지 실습한 내용을 github에 올려보자.

####github에 푸시하기

push 명령을 수행하여 지금 까지 작업한 로컬 변경사항을 원격저장소에 올리자. push는 로컬의 변경사항을 원격저장소에 반영한다.

	$ git push origin master
	To https://github.com/onmoving/learning-django.git
	   ed209e7..3fb666d  master -> master

####태그 푸시하기

태그명을 명시하여 eof-user-register 태그를 원격저장소에 푸시하자.

	$ git push origin eof-user-register
	To https://github.com/onmoving/learning-django.git
	 * [new tag]         eof-user-register -> eof-user-register

