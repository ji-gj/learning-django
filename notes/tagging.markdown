태그 추가 기능 구현
================

###실습 준비

실습을 위해서 이전 장의 상태로 코드를 준비하자.

####github에서 복제해 오기

이전 장까지 실습한 코드가 있다면 실습한 코드가 있는 디렉터리로 이동한다.

	$ cd learning-django

_참고:_	이전 장까지 실습한 코드가 로컬에 없다면 github에서 가져온 뒤 이전 장의 상태인 eof-user-register 태그를 checkout한다.

	$ git clone https://github.com/username/learning-django.git

_참고:_	github에 올려놓은 코드도 없다면 아래 주소에서 가져온 뒤 이전 장의 상태인 eof-user-register 태그를 checkout한다.

	$ git clone https://github.com/onmoving/learning-django.git

__태그 체크아웃하기:__ 필요하다면(코드가 전 장의 상태가 아니라면) 이전 장의 상태로 만들기 위해서 eof-user-register 태그를 체크아웃한다.

	$ git checkout eof-user-register

####브랜치 생성하기

이 장을 실습하기 위한 새로운 브랜치를 만들자. 브랜치의 이름은 tagging로 정한다.

	$ git checkout -b tagging
	Switched to a new branch 'tagging'

####syncdb 수행

필요하다면 syncdb를 수행한다. manage.py 파일이 있는 디렉터리에서 syncdb를 수행한다. superuser를 만들겠냐고 물어보면 계정을 한 개 만든다.

	$ python manage.py syncdb

####runserver로 개발 웹서버 실행

아래 명령으로 개발 웹서버를 실행한 후, 인터넷 브라우저에서 주소로 http://localhost:8000/ 입력하여 페이지가 출력이 되는 지 확인한다.

	$ python manage.py runserver

이제 실습을 위한 준비를 마쳤다.

태그 데이터 모델
-------------

####syncdb 하기

	$ python manage.py syncdb
	Creating tables ...
	Creating table bookmarks_tag_bookmarks
	Creating table bookmarks_tag
	Installing custom SQL ...
	Installing indexes ...
	Installed 0 object(s) from 0 fixture(s)

	$ python manage.py sql bookmarks
	BEGIN;
	...
	CREATE TABLE "bookmarks_tag_bookmarks" (
	    "id" integer NOT NULL PRIMARY KEY,
	    "tag_id" integer NOT NULL,
	    "bookmark_id" integer NOT NULL REFERENCES "bookmarks_bookmark" ("id"),
	    UNIQUE ("tag_id", "bookmark_id")
	)
	;
	CREATE TABLE "bookmarks_tag" (
	    "id" integer NOT NULL PRIMARY KEY,
	    "name" varchar(64) NOT NULL UNIQUE
	)
	;
	COMMIT;


####쉘에서 태그 추가하기

	$ python manage.py shell
	Python 2.7.3 (default, Apr 20 2012, 22:44:07) 
	[GCC 4.6.3] on linux2
	Type "help", "copyright", "credits" or "license" for more information.
	(InteractiveConsole)
	>>> from bookmarks.models import *
	>>> bookmark = Bookmark.objects.get(id=1)
	>>> bookmark.link.url
	u'http://www.packtpub.com/'
	>>> tag1 = Tag(name='book')
	>>> tag1.save()
	>>> bookmark.tag_set.add(tag1)
	>>> tag2 = Tag(name='publisher')
	>>> tag2.save()
	>>> bookmark.tag_set.add(tag2)
	>>> bookmark.tag_set.all()
	[<Tag: book>, <Tag: publisher>]
	>>> tag1.bookmarks.all()
	[<Bookmark: admin, http://www.packtpub.com/>]
	>>> exit()

####@login_required 데코레이터

`@login_required`에서 처리할 때 로그인 페이지의 경로는 기본으로 /accounts/login/을 찾는다. 만일 다른 경로를 지정하고자 할 경우에는 settings.py에 `LOGIN_URL`을 지정해 주면 된다.

	LOGIN_URL = '/login/'


###결과 테스트

북마크 저장

	http://localhost:8000/save/

사용자의 북마크 보기

	http://localhost:8000/user/user_name/
	예)
	http://localhost:8000/user/admin/

태그로 북마크 보기

	http://localhost:8000/tag/tag_naem/
	예)
	http://localhost:8000/tag/book/

태그 클라우드

	http://localhost:8000/tag/

###git commit하기

지금까지 실습한 내용을 git에 커밋하자

####스테이징 혹은 커밋할 파일 확인하기

	$ git status
	# On branch tagging
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

	$ git commit -m "major commit of tagging"
	[tagging e76c62b] major commit of tagging
	 12 files changed, 248 insertions(+), 60 deletions(-)
	 rewrite site_media/style.css (62%)
	 rewrite templates/base.html (69%)
	 create mode 100644 templates/bookmark_list.html
	 create mode 100644 templates/bookmark_save.html
	 create mode 100644 templates/tag_cloud_page.html
	 create mode 100644 templates/tag_page.html
	 rewrite templates/user_page.html (66%)

####태그 만들기

현재의 소스코드구조에 태그를 부여하자

	$ git tag eof-tagging
	$ git tag -l
	...
	eof-tagging
	...

####master브랜치에 병합

현재 브랜치인 tagging를 master 브랜치에 병합하자. 병합이 되는 타켓 브랜치가 현재 브랜치 이므로 master 브랜치를 현재 브랜치로 변경하자

	$ git checkout master
	Switched to branch 'master'

merge 명령을 수행한다.

	$ git merge tagging
	Updating 2bb29d7..e76c62b
	Fast-forward
	 bookmarks/forms.py            |   16 +++++++
	 bookmarks/models.py           |   14 ++++++-
	 bookmarks/views.py            |   92 +++++++++++++++++++++++++++++++++++++----
	 django_bookmarks/settings.py  |    2 +
	 django_bookmarks/urls.py      |   16 ++++++-
	 site_media/style.css          |   25 ++++++++++-
	 templates/base.html           |   28 +++++++------
	 templates/bookmark_list.html  |   33 +++++++++++++++
	 templates/bookmark_save.html  |    9 ++++
	 templates/tag_cloud_page.html |   12 ++++++
	 templates/tag_page.html       |    6 +++
	 templates/user_page.html      |   13 +-----
	 12 files changed, 227 insertions(+), 39 deletions(-)
	 create mode 100644 templates/bookmark_list.html
	 create mode 100644 templates/bookmark_save.html
	 create mode 100644 templates/tag_cloud_page.html
	 create mode 100644 templates/tag_page.html

eof-tagging 태그를 만들어 놓았으므로 tagging 브랜치는 필요 없다. tagging를 삭제하자.

	$ git branch -d tagging
	Deleted branch tagging (was e76c62b).

###github에 올리기

지금까지 실습한 내용을 github에 올려보자.

####github에 푸시하기

push 명령을 수행하여 지금 까지 작업한 로컬 변경사항을 원격저장소에 올리자. push는 로컬의 변경사항을 원격저장소에 반영한다.

	$ git push origin master
	To https://github.com/onmoving/learning-django.git
	   2bb29d7..e76c62b  master -> master

####태그 푸시하기

태그명을 명시하여 eof-tagging 태그를 원격저장소에 푸시하자.

	$ git push --tags
	To https://github.com/onmoving/learning-django.git
	 * [new tag]         eof-tagging -> eof-tagging

