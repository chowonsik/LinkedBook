# LINKED BOOK



### git Merge Request 

- `git pull origin develop`을 통해 최신 버전을 다운받는다.
- 로컬에서 새로운 브랜치를 생성한다.
  - `git switch -c feature/#이슈번호`
  - ex) `git switch -c feature/#26` 
  - 위의 명령은 새로운 브랜치 `feature/#26`을 생성하고 해당 브랜치로 이동하는 명령이다
- 로컬에서 작업한 것을 해당 브랜치에 업로드한다.
- `git status` : 변경사항 확인
- `git add .` -> `git commit -m 'feat: <커밋 메시지> (#이슈번호)'`
- `git push origin feature/#26`
- `add` -> `commit` -> `push` 완료 후 `gitlab`의 원격저장소에 접속한다.
- 본인이 push한 커밋에 대해 `Merge Request`를 생성한다.
- 생성 후에 **develop** 브랜치로 **Merge**되는지 확인한다.
  - 맨 윗 부분에 `into develop`인지 확인
- 이후 충돌이 있다면 충돌 해결하고 `Merge`버튼을 클릭한다.
