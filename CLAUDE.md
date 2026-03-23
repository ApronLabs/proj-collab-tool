# Collab Tool (버그/아이디어 협업 도구)

## 프로젝트 개요
- **종류**: 팀 협업 도구 (버그 리포트, 아이디어, 개선사항 관리)
- **스택**: Next.js 16, React 19, TypeScript 5, Prisma v7, TanStack React Query v5, Tailwind v4
- **포트**: 4000 (dev, prod 모두)
- **언어**: 한국어 서비스

## 주요 경로
- **페이지**: `src/app/`
- **API**: `src/app/collab/api/`
- **컴포넌트**: `src/components/`
- **Prisma 스키마**: `prisma/schema.prisma`
- **마이그레이션**: `prisma/run-migration.js` (SQL 직접 실행 방식)

## 인프라 구성

### EC2 서버
- **동일 EC2**: sales-keeper(매출지킴이)와 같은 EC2 인스턴스에서 서비스
- **Public IP**: `13.210.110.218`
- **PM2 프로세스명**: `collab-tool`
- **디렉토리**: `/home/ubuntu/proj-collab-tool/`
- **Nginx**: 별도 포트 또는 path 기반 라우팅 (port 4000)
- **.env 위치**: `/home/ubuntu/proj-collab-tool/.env` (git 미추적)

### 같은 EC2에서 실행 중인 다른 서비스
- **sales-keeper (매출지킴이)**: PM2 `apronlabs-pwa`, port 3000, `/home/ubuntu/apronlabs-pwa/apps/web/`
- **도메인**: `https://no-sim.co.kr` (sales-keeper용)

### DB 연결
- **RDS**: `apronlabs-db-prod.czwyoiiiolar.ap-southeast-2.rds.amazonaws.com:5432`
- **DB명**: `apronlabs_db`
- **스키마**: `collab` (collab-tool 전용), `public` (User 모델만 참조, read-only)
- **Prisma multi-schema**: `schemas = ["public", "collab"]`
- **사용자**: `postgres`
- **비밀번호**: `Apronlabs2026Prod`
- **DATABASE_URL**: `postgresql://postgres:Apronlabs2026Prod@apronlabs-db-prod.czwyoiiiolar.ap-southeast-2.rds.amazonaws.com:5432/apronlabs_db`
- **RDS 직접 접근 불가**: EC2 내부에서만 연결 가능, 로컬에서는 SSH 터널 필요

### SSH 터널 (로컬 개발 시)
```bash
ssh -f -N -L 15432:apronlabs-db-prod.czwyoiiiolar.ap-southeast-2.rds.amazonaws.com:5432 apronlabs-prod
# 이후 localhost:15432로 접속
```

### SSH 접속
```bash
ssh apronlabs-prod
# ~/.ssh/config에 설정되어 있음
```

## Prisma v7 주의사항
- **Engine**: client 엔진 사용, `@prisma/adapter-pg` 어댑터 필요
- **Import path**: `from '@/generated/prisma/client'` (NOT `from '@prisma/client'`)
- **Output**: `output = "../src/generated/prisma"`
- **No datasourceUrl**: PrismaClient 생성자에 `datasourceUrl` 불가, adapter 사용
- **SSL**: RDS 연결 시 `ssl: { rejectUnauthorized: false }` 필수
- **prisma db push**: Prisma v7에서 multi-schema 사용 시 주의 - `public` 스키마의 sales-keeper 테이블을 건드릴 수 있음
- **마이그레이션**: `prisma db push` 대신 `prisma/run-migration.js`로 SQL 직접 실행 권장

### prisma db push 위험성 (중요!)
- collab-tool의 Prisma 스키마에는 `public.users` 테이블이 참조로 포함됨
- `prisma db push` 실행 시 `public` 스키마의 다른 테이블(sales-keeper 소유)을 삭제할 수 있음
- **절대 `prisma db push`를 직접 실행하지 말 것** - 대신 `run-migration.js` 사용

## Auth 시스템
- sales-keeper와 동일한 JWT/session-token 방식 (쿠키 공유)
- Cookie 이름: `session-token`
- `jose` 라이브러리로 Edge Runtime 호환 JWT 검증
- `JWT_SECRET` 환경변수 필요 (sales-keeper와 동일한 값)

## 배포
- **CI/CD**: GitHub Actions (`deploy.yml`), main 브랜치 push 시 자동 배포
- **레포**: `ApronLabs/proj-collab-tool`
- **배포 흐름**: git pull → npm install → prisma generate → run-migration.js → build → pm2 restart

## API 구조
- **Prefix**: `/collab/api/` (React Query hooks에서 사용)
- **주요 API**:
  - `/collab/api/bugs` - 버그 CRUD
  - `/collab/api/ideas` - 아이디어 CRUD
  - `/collab/api/improvements` - 개선사항 CRUD

## GitHub 연동
- `GITHUB_PAT` + `GITHUB_REPOS` env var로 연동
- Octokit 라이브러리 사용
- 이슈 생성, PR 링크 기능
