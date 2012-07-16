장고앱 만들기
==========

###실습 준비

실습을 위해서 이전 장의 상태로 코드를 준비하자.

####github에서 복제해 오기

이 전 장까지 실습한 코드가 있다면 실습한 코드가 있는 디렉터리로 이동한다.

	$ cd learning-django

_참고:_	이 전 장까지 실습한 코드가 로컬에 없다면 github에서 가져온 뒤 이전 장의 상태인 eof-creating-app 태그를 checkout한다.

	$ git clone https://github.com/username/learning-django.git

_참고:_	github에 올려놓은 코드도 없다면 아래 주소에서 가져온 뒤 이전 장의 상태인 eof-creating-app 태그를 checkout한다.

	$ git clone https://github.com/onmoving/learning-django.git

__태그 체크아웃하기:__ 코드의 마지막 상태가 이미 이전 장의 상태(eof-creating-app 태그와 같은 상태)라면 태그를 체크아웃할 필요는 없다. 태그를 체크아웃하는 이유는 버전관리의 특정 상태로 전환하기 위해서 수행한다.

	$ git checkout eof-creating-app

####브랜치 생성하기

태그를 체크아웃하였다면 이 장을 실습하기 위한 새로운 브랜치를 만들자. 브랜치의 이름은 bookmarks-app으로 정한다.

	$ git checkout -b bookmarks-app
	Switched to a new branch 'bookmarks-app'

####syncdb 수행

manage.py 파일이 있는 디렉터리에서 syncdb를 수행한다. superuser를 만들겠냐고 물어보면 계정을 한 개 만든다.

	$ python manage.py syncdb

####runserver로 개발 웹서버 실행

아래 명령으로 개발 웹서버를 실행한 후, 인터넷 브라우저에서 주소로 http://localhost:8000/ 입력하여 페이지가 출력이 되는 지 확인한다.

	$ python manage.py runserver

이제 실습을 위한 준비를 마쳤다.

startapp 명령 실행하기
-------------------

"bookmarks"라는 이름으로 장고 앱을 만든다.

	$ python manage.py startapp bookmarks

위 명령을 실행하면 bookmarks 디렉터리가 만들어지고 그 안에 다음과 같은 파일이 만들어진다.

	bookmarks
	├── __init__.py
	├── models.py
	├── tests.py
	└── views.py

Link, Bookmark 데이터모델 동기화하기
--------------------------------

	$ python manage.py syncdb
	Creating tables ...
	Creating table bookmarks_link
	Creating table bookmarks_bookmark
	Installing custom SQL ...
	Installing indexes ...
	Installed 0 object(s) from 0 fixture(s)

###동기화 시 사용할 SQL문 확인

	$ python manage.py sql bookmarks
	BEGIN;
	CREATE TABLE "bookmarks_link" (
	    "id" integer NOT NULL PRIMARY KEY,
	    "url" varchar(200) NOT NULL UNIQUE
	)
	;
	CREATE TABLE "bookmarks_bookmark" (
	    "id" integer NOT NULL PRIMARY KEY,
	    "title" varchar(200) NOT NULL,
	    "user_id" integer NOT NULL REFERENCES "auth_user" ("id"),
	    "link_id" integer NOT NULL REFERENCES "bookmarks_link" ("id")
	)
	;
	COMMIT;

###manage.py shell 실행하기

	$ python manage.py shell
	Python 2.7.3 (default, Apr 20 2012, 22:44:07) 
	[GCC 4.6.3] on linux2
	Type "help", "copyright", "credits" or "license" for more information.
	(InteractiveConsole)
	>>> from bookmarks.models import *
	>>> 
	>>> link1 = Link(url='http://www.packtpub.com/')
	>>> link1.save()
	>>> link2 = Link(url='http://www.example.com/')
	>>> link2.save()
	>>> 
	>>> link2.url
	'http://www.example.com/'
	>>> 
	>>> link2.url = 'http://www.google.com/'
	>>> link2.save()
	>>> 
	>>> links = Link.objects.all()
	>>> for link in links:
	...   print link.url
	... 
	http://www.packtpub.com/
	http://www.google.com/
	>>> 
	>>> Link.objects.get(id=1)
	<Link: Link object>
	>>> link2.delete()
	>>> Link.objects.count()
	1
	>>> 
	>>> from django.contrib.auth.models import User
	>>> User.objects.all()
	[<User: admin>]
	>>> 
	>>> user = User.objects.get(id=1)
	>>> dir(user)
	['DoesNotExist', 'MultipleObjectsReturned', '__class__', '__delattr__', '__dict__', '__doc__', '__eq__', '__format__', '__getattribute__', '__hash__', '__init__', '__metaclass__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__unicode__', '__weakref__', '_base_manager', '_default_manager', '_deferred', '_get_FIELD_display', '_get_next_or_previous_by_FIELD', '_get_next_or_previous_in_order', '_get_pk_val', '_get_unique_checks', '_meta', '_perform_date_checks', '_perform_unique_checks', '_set_pk_val', '_state', 'bookmark_set', 'check_password', 'clean', 'clean_fields', 'date_error_message', 'date_joined', 'delete', 'email', 'email_user', 'first_name', 'full_clean', 'get_absolute_url', 'get_all_permissions', 'get_full_name', 'get_group_permissions', 'get_next_by_date_joined', 'get_next_by_last_login', 'get_previous_by_date_joined', 'get_previous_by_last_login', 'get_profile', 'groups', 'has_module_perms', 'has_perm', 'has_perms', 'has_usable_password', 'id', 'is_active', 'is_anonymous', 'is_authenticated', 'is_staff', 'is_superuser', 'last_login', 'last_name', 'natural_key', 'objects', 'password', 'pk', 'prepare_database_save', 'save', 'save_base', 'serializable_value', 'set_password', 'set_unusable_password', 'unique_error_message', 'user_permissions', 'username', 'validate_unique']
	>>> 

###TEMPLATE_DIRS설정 시 장고 1.4에서 고려해야 할 점

settings.py 안의 TEMPLATE_DIRS을 설정할 때 절대 경로로 전체경로를 지정해야 한다. 이 때 보통 settings.py 파일의 경로를 기준으로 템플릿 디렉터리를 지정하는 방법을 많이 사용한다. 1.4버전에서는 디렉터리 구조가 바뀌었으므로 템플릿의 경로 설정을 아래와 같이 변경해야 한다.

1.3 버전에서 주로 사용했던 방법

	import os.path
	TEMPLATE_DIRS = (
	    os.path.join(os.path.dirname(__file__), 'templates'),
	)

1.4 버전에서 사용할 수 있는 방법

	import os

	# cwd is django_bookmarks. determine project path
	cwd = os.path.dirname(os.path.abspath(__file__)) 
	project_path = os.path.dirname(cwd)
	...

	TEMPLATE_DIRS = (
	    '%s/templates' % ( project_path )
	)


###셸에서 Bookmark데이터 입력하기


	$ python manage.py shell
	Python 2.7.3 (default, Apr 20 2012, 22:44:07) 
	[GCC 4.6.3] on linux2
	Type "help", "copyright", "credits" or "license" for more information.
	(InteractiveConsole)
	>>> from django.contrib.auth.models import User
	>>> from bookmarks.models import *
	>>> user = User.objects.get(id=1)
	>>> link = Link.objects.get(id=1)
	>>> 
	>>> user.email
	u'admin@example.com'
	>>> 
	>>> link.url
	u'http://www.packtpub.com/'
	>>> 
	>>> user.bookmark_set.all()
	[]
	>>> bookmark = Bookmark(
	...   title='Packt Publishing',
	...   user=user,
	...   link=link
	... )
	>>> bookmark.save()
	>>> user.bookmark_set.all()
	[<Bookmark: Bookmark object>]
	>>> exit()

###결과 테스트

	$ python manage.py runserver
	Validating models...

	0 errors found
	Django version 1.4, using settings 'django_bookmarks.settings'
	Development server is running at http://127.0.0.1:8000/
	Quit the server with CONTROL-C.
	[16/Jul/2012 05:28:17] "GET / HTTP/1.1" 200 169
	[16/Jul/2012 05:28:22] "GET /does_not_exist/ HTTP/1.1" 404 2057
	[16/Jul/2012 05:30:36] "GET /user/admin/ HTTP/1.1" 200 275


요청 1

	http://localhost:8000/

응답

	Bookmarks for

	No bookmarks found.

요청 2

	http://localhost:8000/does_not_exist/

응답

	Page not found (404)
	  Request Method:	GET
	    Request URL:	http://localhost:8000/does_not_exist/
	Using the URLconf defined in django_bookmarks.urls, Django tried these URL patterns, in this order:
	  1. ^$
	  2. ^user/(\w+)/$
	The current URL, does_not_exist/, didn't match any of these.
	You're seeing this error because you have DEBUG = True in your Django settings file. Change that to False, and Django will display a standard 404 page.

요청 3

	http://localhost:8000/user/admin/

응답

	Bookmarks for admin

	Packt Publishing

###git commit하기

지금까지 실습한 내용을 git에 커밋하자

####스테이징 혹은 커밋할 파일 확인하기

	$ git status

####스테이징 하기

	$ git add .

####커밋 하기

	$ git commit -m "major commit of bookmarks-app"
	[bookmarks-app a8c943d] major commit of bookmarks-app
	 8 files changed, 370 insertions(+), 4 deletions(-)
	 create mode 100644 templates/main_page.html
	 create mode 100644 templates/user_page.html

####태그 만들기

현재의 소스코드구조에 태그를 부여하자

	$ git tag eof-bookmarks-app

####master브랜치에 병합

현재 브랜치인 bookmarks-app를 master 브랜치에 병합하자. 병합이 되는 타켓 브랜치가 현재 브랜치 이므로 master 브랜치를 현재 브랜치로 변경하자

	$ git checkout master
	Switched to branch 'master'

병합은 merge 명령을 수행한다.

	$ git merge bookmarks-app
	Updating c8b25c7..f919392
	Fast-forward
	 bookmarks/models.py              |   12 ++
	 bookmarks/tests.py               |   16 ++
	 bookmarks/views.py               |   34 ++++
	 django_bookmarks/settings.py     |    8 +
	 django_bookmarks/urls.py         |    3 +
	 notes/bookmarks_app.markdown     |  331 ++++++++++++++++++++++++++++++++++++++
	 notes/table_of_contents.markdown |    3 +-
	 templates/main_page.html         |   18 +++
	 templates/user_page.html         |   18 +++
	 9 files changed, 442 insertions(+), 1 deletion(-)
	 create mode 100644 bookmarks/__init__.py
	 create mode 100644 bookmarks/models.py
	 create mode 100644 bookmarks/tests.py
	 create mode 100644 bookmarks/views.py
	 create mode 100644 notes/bookmarks_app.markdown
	 create mode 100644 templates/main_page.html
	 create mode 100644 templates/user_page.html

병합을 하였다면 bookmarks-app 브랜치를 삭제하자. 브랜치를 삭제하였더라도 eof-bookmarks-app 태그를 만들어 놓았으므로 이 장의 마지막 상태로 체크아웃할 수 있다.

	$ git branch -d bookmarks-app

_참고:_ 원격브랜치가 연결되어 있는 경우에는 경고 메시지가 출력되면서 삭제 되지 않는다. 이 때에는 -D 옵션을 이용하던지 혹은 원격브랜치를 삭제한 후에 로컬브랜치를 삭제할 수 있다. 원격 브랜치의 삭제 방법은 아래 "기타 git 명령"을 참고한다.

	$ git branch -d bookmarks-app
	warning: not deleting branch 'bookmarks-app' that is not yet merged to
	         'refs/remotes/origin/bookmarks-app', even though it is merged to HEAD.
	error: The branch 'bookmarks-app' is not fully merged.
	If you are sure you want to delete it, run 'git branch -D bookmarks-app'.

###github에 올리기

지금까지 실습한 내용을 github에 올려보자.

####github에 푸시하기

push 명령을 수행하여 지금 까지 작업한 로컬 변경사항을 원격저장소에 올리자. push는 로컬의 변경사항을 원격저장소에 반영한다.

	$ git push origin master
	To https://github.com/onmoving/learning-django.git
	   c8b25c7..f919392  master -> master

_참고:_ 푸시와는 반대로 원격 정장소의 변경된 내용을 가져오는 것은 풀(pull)이다. 원격저장소와 연결되어 있는 로컬저장소로 이동하여 pull 명령을 수행하면 원격 저장소의 변경된 내용을 로컬 저장소로 동기화 한다.

	$ git pull

####태그 푸시하기

태그명을 명시하여 eof-bookmarks-app 태그를 원격저장소에 푸시하자.

	$ git push origin eof-bookmarks-app
	To https://github.com/onmoving/learning-django.git
	 * [new tag]         eof-bookmarks-app -> eof-bookmarks-app

####참고: 기타 git 명령

git와 github를 이용하다 보면 여러 가지 상황이 생긴다. 특정 상황에 도움이 될 만한 내용을 추가로 정리하였다.

__브랜치를 원격저장소로 푸시하기:__ 브랜치에 대한 작업이 아직 끝나지 않은 상태여서 혹은 브랜치를 (특정 시점까지 아니면 무기한) 유지하기 위해서 원격 저장소에 푸시하고 싶다면 master브랜치 대시 푸시하려는 브랜치 명을 명시하면 된다.

	$ git push origin bookmarks-app
	To https://github.com/onmoving/learning-django.git
	   a26145a..f919392  bookmarks-app -> bookmarks-app

__원격브랜치를 체크아웃하기:__ 원격브랜치를 체크아웃하려면 git clone 이나 git pull한 상태이어야 한다. git branch -a를 수행하여 원격브랜치를 확인할 수 있다.

	$ git clone ... 혹은 git pull을 수행한 상태임

	$ git branch -a
	* master
	  remotes/origin/HEAD -> origin/master
	  remotes/origin/bookmarks-app
	  remotes/origin/master

	$ git checkout -b bookmarks-app origin/bookmarks-app
	Branch bookmarks-app set up to track remote branch bookmarks-app from origin.
	Switched to a new branch 'bookmarks-app'
	
	$ git branch -a
	* bookmarks-app
	  master
	  remotes/origin/HEAD -> origin/master
	  remotes/origin/bookmarks-app
	  remotes/origin/master

__원격브랜치 삭제하기:__ 원격브랜치가 필요없어져서 삭제할고자 할 경우 아래와 같이 한다.

	$ git push origin :bookmarks-app
	To https://github.com/onmoving/learning-django.git
	 - [deleted]         bookmarks-app

