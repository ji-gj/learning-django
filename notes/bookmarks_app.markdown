장고앱 만들기
==========

###실습 준비

이 전 장까지 실습한 코드가 없다면 github에서 가져온 뒤 이전 장의 상태인 eof-creating-app 태그를 checkout한다.

####github에서 복제해 오기

	$ git clone https://github.com/onmoving/learning-django.git

####태그 체크아웃하기

	$ git checkout eof-creating-app

####브랜치 생성하기

태그를 체크아웃하였다면 이 장을 실습하기 위한 새로운 브랜치를 만들자. 브랜치의 이름은 bookmarks-app으로 정한다.

	$ git checkout -b bookmarks-app

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

