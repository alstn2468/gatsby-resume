# Static Website Resume with GatsbyJS

> 데이터 파일만 수정해 자신만의 정적 웹사이트 이력서를 만들어보세요.

<div align="center" id="badge">

![lighthouse accessibility](./lighthouse/lighthouse_accessibility.svg) ![lighthouse best practices](./lighthouse/lighthouse_best-practices.svg) ![lighthouse performance](./lighthouse/lighthouse_performance.svg) ![lighthouse pwa](./lighthouse/lighthouse_pwa.svg) ![lighthouse seo](./lighthouse/lighthouse_seo.svg)<br/>
![Deploy Gatsby Resume](https://github.com/alstn2468/gatsby_resume/workflows/Deploy%20Gatsby%20Resume/badge.svg) ![LICENSE](https://img.shields.io/github/license/alstn2468/Gatsby_Resume) ![Last Commit](https://img.shields.io/github/last-commit/alstn2468/Gatsby_Resume)<br/>
![React Version](https://img.shields.io/github/package-json/dependency-version/alstn2468/Gatsby_Resume/react) ![Gatsby Version](https://img.shields.io/github/package-json/dependency-version/alstn2468/Gatsby_Resume/gatsby) ![TypeScript Version](https://img.shields.io/github/package-json/dependency-version/alstn2468/Gatsby_Resume/dev/typescript) ![emotion Version](https://img.shields.io/github/package-json/dependency-version/alstn2468/Gatsby_Resume/emotion)
</div>

## Demo

- [Demo URL](https://alstn2468.github.io/Gatsby_Resume/)

<details>
  <summary>Use case</summary>
  <p>
    <ul>
      <li>alstn2468: https://alstn2468.github.io/Gatsby_Resume/</li>
    </ul>
  </p>
</details>

> 이 템플릿을 사용하고 계시다면 `Use case`를 추가해 Pull Request를 남겨주세요!

## 🚚 프로젝트 시작하기

### 1. 프로젝트 생성하기

```bash
npx gatsby new <생성되는 프로젝트 이름> https://github.com/alstn2468/Gatsby_Resume
```

> `npx`를 사용하지 않으면 [Gatsby Getting Started](https://www.gatsbyjs.org/docs/quick-start)를 따라해주세요.

```bash
npm install -g gatsby-cli
gatsby new <생성되는 프로젝트 이름> https://github.com/alstn2468/Gatsby_Resume
```

### 2. 의존성 설치

이 프로젝트는 의존성 관리를 위하여 패키지 매니저 [pnpm](https://pnpm.js.org/)을 사용합니다.

> `npx`를 이용해 프로젝트를 생성했다면 `install` 명령어는 실행하지 않아도 됩니다.

```bash
cd <생성되는 프로젝트 이름>
npm install -g pnpm
pnpm install
```

> 프로젝트 폴더 내부에서 `install` 명령어를 실행해야합니다.

pnpm을 설치하는 다른 방법은 [pnpm 문서](https://pnpm.js.org/en/installation)를 참고해주세요.

### 3. 프로젝트 실행하기

- `.env` 파일 설정하기

`.env.example` 파일을 복사해 각자의 설정에 맞추어 수정합니다.<br/>
또한 `.github/workflows/deploy-gh-pages.yml` 파일을 열어 50, 51, 62, 63번 줄을 수정합니다.

```env
PUBLIC_URL="https://<GITHUB_ID>.github.io/<REPOSITORY_NAME>/"
PATH_PREFIX="/<REPOSITORY_NAME>"
GATSBY_STRICT_L10N="<Boolean>"
```

- `develop` 명령어 실행하기

> 프로젝트 폴더 내부에서 명령어를 실행해야합니다.

```bash
pnpm develop
# localhost:8000에서 확인할 수 있습니다.
```

### 4. Git 레파지토리 생성 및 연결하기

명령어를 이용해 Git 연결을 진행하기 전 Github에서 새로운 레파지토리를 생성해야합니다.

> 프로젝트 폴더 내부에서 명령어를 실행해야합니다.

```bash
git init -b main
git add --all
git commit -m "Some commit comment."
git remote add origin https://github.com/<username>/<respository_name>
git push -u origin main
```

### 5. Github Action 배포 자동화 설정

> 이 프로젝트는 Github Action을 이용한 배포 자동화를 지원합니다.

1. [Personal access tokens](https://github.com/settings/tokens) 페이지에서 새로운 토큰을 발급 받아 복사합니다.
2. 자신의 프로젝트 Repository의 Settings탭의 Secrets에 들어갑니다.
3. `ACCESS_TOKEN`이라는 이름으로 새로운 secret을 생성하고 복사한 토큰을 붙여넣습니다.

이로써 기본적인 프로젝트 설정은 마쳤습니다.<br/>
변경사항을 커밋한 후 `main` 브랜치에 푸시가 되면 자동적으로 배포가 진행됩니다.<br/>
배포된 웹사이트는 `https://<username>.github.io/<repository name>`에서 확인할 수 있습니다.<br/>
README 상단의 [뱃지](#badge)의 주소들을 변경해 뱃지도 관리해보세요.

## 🚀 사용법

```bash
// Todo
```

## 🙏 기여

여러분들의 코드 작성, 오탈자 수정 등 모든 기여는 감사합니다.

1. 기여할 내용에 대한 [이슈를 작성](https://github.com/alstn2468/Gatsby_Resume/issues/new)해주세요.
2. 이 프로젝트를 Fork 해주세요.
3. 작업을 진행할 branch를 만들어주세요. (git checkout -b somefeature)
4. 작업을 진행한 후 Commit을 해주세요. (git commit -m 'Add some feature')
5. 작업한 branch에 Push를 해주세요. (git push origin somefeature)
6. Pull Request를 생성해주세요.

프로젝트가 도움이 된다면 ⭐ 을 눌러주세요.

## 📝 To do

- [x] GatsbyJs + TypeScript 세팅
- [x] CI/CD 파이프라인 구성 (배포는 gh-pages)
- [x] 데이터 구조 설계
- [x] yml을 이용한 국문+영문 데이터 소싱
- [ ] 반응형 페이지 레이아웃 디자인
- [ ] 색상 테마 기능
- [ ] 컴포넌트 개발
- [ ] 페이지 개발
- [ ] pdf export 기능
- [ ] 문서 작성
- [ ] 테스트 코드 작성

<div align="center">

<sub><sup>Written by <a href="https://github.com/alstn2468">@Minsu Kim</a></sup></sub><small>✌</small>

</div>