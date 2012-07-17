Ajax 사용하기
============

###실습 준비

실습을 위해서 이전 장의 상태로 코드를 준비하자.

####github에서 복제해 오기

이전 장까지 실습한 코드가 있다면 실습한 코드가 있는 디렉터리로 이동한다.

	$ cd learning-django

_참고:_	이전 장까지 실습한 코드가 로컬에 없다면 github에서 가져온 뒤 이전 장의 상태인 eof-tagging 태그를 checkout한다.

	$ git clone https://github.com/username/learning-django.git

_참고:_	github에 올려놓은 코드도 없다면 아래 주소에서 가져온 뒤 이전 장의 상태인 eof-tagging 태그를 checkout한다.

	$ git clone https://github.com/onmoving/learning-django.git

__태그 체크아웃하기:__ 필요하다면(코드가 전 장의 상태가 아니라면) 이전 장의 상태로 만들기 위해서 eof-tagging 태그를 체크아웃한다.

	$ git checkout eof-tagging

####브랜치 생성하기

이 장을 실습하기 위한 새로운 브랜치를 만들자. 브랜치의 이름은 using-ajax로 정한다.

	$ git checkout -b using-ajax
	Switched to a new branch 'using-ajax'

####syncdb 수행

필요하다면 syncdb를 수행한다. manage.py 파일이 있는 디렉터리에서 syncdb를 수행한다. superuser를 만들겠냐고 물어보면 계정을 한 개 만든다.

	$ python manage.py syncdb

####runserver로 개발 웹서버 실행

아래 명령으로 개발 웹서버를 실행한 후, 인터넷 브라우저에서 주소로 http://localhost:8000/ 입력하여 페이지가 출력이 되는 지 확인한다.

	$ python manage.py runserver

이제 실습을 위한 준비를 마쳤다.

TODO: 설명추가
-------------

####TODO: 설명추가

###결과 테스트

북마크 검색: 검색 결과가 ajax 기능을 이용하여 출력되는 지 확인

	http://localhost:8000/search/

사용자 페이지: 북마크의 수정 버튼을 누르면 ajax를 이용하여 북마크를 인라인으로 수정하는 지 체크

	http://localhost:8000/user/username/
	예)
	http://localhost:8000/user/test1/

북마크 저장: 입력 폼의 태그 필드에 입력할 때 ajax를 이용하여 추천 기능이 작동되는 지 체크

	http://localhost:8000/user/username/
	예)
	http://localhost:8000/user/test1/

###git commit하기

지금까지 실습한 내용을 git에 커밋하자

####스테이징 혹은 커밋할 파일 확인하기

	$ git status
	# On branch using-ajax
	# Changes not staged for commit:
	#   (use "git add <file>..." to update what will be committed)
	#   (use "git checkout -- <file>..." to discard changes in working directory)
	#
	#	modified:   bookmarks/forms.py
	#	modified:   bookmarks/views.py
	#	modified:   django_bookmarks/urls.py
	#	modified:   site_media/style.css
	#	modified:   templates/base.html
	#	modified:   templates/bookmark_list.html
	#	modified:   templates/bookmark_save.html
	#	modified:   templates/user_page.html
	#
	# Untracked files:
	#   (use "git add <file>..." to include in what will be committed)
	#
	#	site_media/bookmark_edit.js
	#	site_media/jquery.autocomplete.css
	#	site_media/jquery.autocomplete.js
	#	site_media/jquery.bgiframe.min.js
	#	site_media/jquery.js
	#	site_media/search.js
	#	site_media/tag_autocomplete.js
	#	templates/bookmark_save_form.html
	#	templates/search.html
	no changes added to commit (use "git add" and/or "git commit -a")


####스테이징 하기

	$ git add .

####커밋 하기

	$ git commit -m "major commit of using-ajax"
	[using-ajax 6d13b37] major commit of using-ajax
	 17 files changed, 4711 insertions(+), 118 deletions(-)
	 rewrite bookmarks/forms.py (66%)
	 create mode 100644 site_media/bookmark_edit.js
	 create mode 100644 site_media/jquery.autocomplete.css
	 create mode 100644 site_media/jquery.autocomplete.js
	 create mode 100644 site_media/jquery.bgiframe.min.js
	 create mode 100644 site_media/jquery.js
	 create mode 100644 site_media/search.js
	 create mode 100644 site_media/tag_autocomplete.js
	 rewrite templates/bookmark_list.html (96%)
	 create mode 100644 templates/bookmark_save_form.html
	 create mode 100644 templates/search.html

####태그 만들기

현재의 소스코드구조에 태그를 부여하자

	$ git tag eof-using-ajax
	$ git tag -l
	...
	eof-using-ajax
	...

####master브랜치에 병합

현재 브랜치인 using-ajax를 master 브랜치에 병합하자. 병합이 되는 타켓 브랜치가 현재 브랜치 이므로 master 브랜치를 현재 브랜치로 변경하자

	$ git checkout master
	Switched to branch 'master'

merge 명령을 수행한다.

	$ git merge using-ajax
	Updating 3ddae97..6d13b37
	Fast-forward
	 bookmarks/forms.py                 |   60 +-
	 bookmarks/views.py                 |  143 +-
	 django_bookmarks/urls.py           |    6 +-
	 site_media/bookmark_edit.js        |   62 +
	 site_media/jquery.autocomplete.css |   48 +
	 site_media/jquery.autocomplete.js  |  759 ++++++++
	 site_media/jquery.bgiframe.min.js  |   10 +
	 site_media/jquery.js               | 3549 ++++++++++++++++++++++++++++++++++++
	 site_media/search.js               |   11 +
	 site_media/style.css               |    4 +
	 site_media/tag_autocomplete.js     |    6 +
	 templates/base.html                |    6 +-
	 templates/bookmark_list.html       |   66 +-
	 templates/bookmark_save.html       |   20 +-
	 templates/bookmark_save_form.html  |    4 +
	 templates/search.html              |   18 +
	 templates/user_page.html           |    5 +
	 17 files changed, 4685 insertions(+), 92 deletions(-)
	 create mode 100644 site_media/bookmark_edit.js
	 create mode 100644 site_media/jquery.autocomplete.css
	 create mode 100644 site_media/jquery.autocomplete.js
	 create mode 100644 site_media/jquery.bgiframe.min.js
	 create mode 100644 site_media/jquery.js
	 create mode 100644 site_media/search.js
	 create mode 100644 site_media/tag_autocomplete.js
	 create mode 100644 templates/bookmark_save_form.html
	 create mode 100644 templates/search.html

eof-using-ajax 태그를 만들어 놓았으므로 using-ajax 브랜치는 필요 없다. using-ajax를 삭제하자.

	$ git branch -d using-ajax
	Deleted branch using-ajax (was 6d13b37).

###github에 올리기

지금까지 실습한 내용을 github에 올려보자.

####github에 푸시하기

push 명령을 수행하여 지금 까지 작업한 로컬 변경사항을 원격저장소에 올리자. push는 로컬의 변경사항을 원격저장소에 반영한다.

	$ git push origin master
	To https://github.com/onmoving/learning-django.git
	   3ddae97..6d13b37  master -> master

####태그 푸시하기

태그명을 명시하여 eof-using-ajax 태그를 원격저장소에 푸시하자.

	$ git push --tags
	To https://github.com/onmoving/learning-django.git
	 * [new tag]         eof-using-ajax -> eof-using-ajax
