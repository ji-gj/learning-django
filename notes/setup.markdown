환경 설정
=======

github에서 복제해 오기
-------------------

	$ git clone https://github.com/onmoving/learning-django.git

syncdb 수행
----------

manage.py 파일이 있는 디렉터리에서 syncdb를 수행한다. superuser를 만들겠냐고 물어보면 계정을 한 개 만든다.

	$ python manage.py syncdb

runserver로 개발 웹서버 실행
-------------------------

아래 명령으로 개발 웹서버를 실행한 후, 인터넷 브라우저에서 주소로 http://localhost:8000/ 입력하여 페이지 출력이 되는 지 확인한다.

	$ python manage.py runserver
