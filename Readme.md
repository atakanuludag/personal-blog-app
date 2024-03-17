# Personal Blog App

[![Deploying](https://github.com/atakanuludag/personal-blog-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/atakanuludag/personal-blog-app/actions/workflows/deploy.yml) [![Server Uptime](https://img.shields.io/badge/version-0.1.1-blue?style=flat&logo=npm)](https://github.com/atakanuludag/personal-blog-app) [![Server Uptime](https://img.shields.io/badge/server%20uptime-%2599-green?style=flat&logo=ubuntu)](https://atakanuludag.com)

Bu proje, NestJS ve NextJS kullanılarak geliştirilmiş bir kişisel blog sistemidir. Backend için NestJS, Frontend için ise NextJS kullanılmıştır. Genel olarak basit bir şekilde tasarlanmış olup geliştirilmeye müsait ve açık bir projedir.

## Başlarken

Bu bölümde projeyi lokal geliştirme ortamınızda nasıl çalıştıracağınız anlatılmaktadır.

### Önkoşullar

Projeyi çalıştırmadan önce, sisteminizde aşağıdaki yazılımların kurulu olduğundan emin olun:

- Node.js (v21 veya daha yüksek)
- npm veya yarn
- MongoDB (önerilen 7.0)

### Kurulum

1. Repo'yu klonlayın:

```bash
git clone https://github.com/atakanuludag/personal-blog-app
```

2. Api için api klasörü içerisine .env dosyası oluşturun (veya env.example dosyasını kullanabilirsiniz):

```env
MONGODB_URI="mongodb://database:27017"
MONGODB_DB_NAME="personal-blog"
MONGODB_DB_USER="example_user"
MONGODB_DB_PASS="example_password"
UPLOAD_FOLDER_PATH="./uploads"
API_PREFIX=/
SWAGGER_URL=swagger
SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=123456
API_PORT="4000"
JWT_SECRET_KEY="123456"
JWT_EXPIRES_IN="365 days"
```

3. NextJS tarafı için app klasörü içerisine .env dosyası oluşturun (veya env.example dosyasını kullanabilirsiniz):

```env
NEXT_PUBLIC_APP_URL=http://localhost:4001
NEXT_PUBLIC_VERSION=$npm_package_version
HOSTNAME=0.0.0.0
PORT=4001
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_REVALIDATE_SECRET=123456
NEXT_PUBLIC_UPLOAD_PATH_URL=http://localhost:4001/uploads
NEXT_PUBLIC_GA_ID="G-XYZ"
NEXT_PUBLIC_SITE_TITLE="Atakan Uludağ"
NEXT_PUBLIC_SITE_DESCRIPTION="Atakan Uludağ"
NEXT_PUBLIC_PERSONAL_DESCRIPTION="Description"
NEXT_PUBLIC_PERSONAL_TWITTER_URL="https://twitter.com/atknuludag"
NEXT_PUBLIC_PERSONAL_INSTAGRAM_URL="https://www.instagram.com/atknuludag"
NEXT_PUBLIC_PERSONAL_GITHUB_URL="https://github.com/atakanuludag"
NEXT_PUBLIC_PERSONAL_LINKEDIN_URL="https://www.linkedin.com/in/atknuludag"
NEXT_PUBLIC_PERSONAL_EMAIL="atknuludag@gmail.com"
NEXT_PUBLIC_PAGE_SIZE=25

# MongoDB pages table Object ids;
NEXT_PUBLIC_NAVBAR_PAGE_IDS="id1,id2"

NEXT_PUBLIC_REVALIDATE_HOURS=24
```

4. Projeyi çalıştırma:

   1. Developer modu:

   ```bash
   cd personal-blog-app/api
   npm run start:dev
   cd personal-blog-app/app
   npm run dev
   ```

   2. Build modu:

   ```bash
   cd personal-blog-app/api
   npm run build
   npm run start
   cd personal-blog-app/app
   npm run build
   npm run start
   ```

5. Yönetici hesabı oluşturma:
   POST /user/register endpointine istek atarak admin hesabı oluşturabilirsiniz. Admin hesabını oluşturduktan sonra **"/api/src/user/user.controller.ts"** dosyasında bulunan **"Disable here after initial installation;"** bölümündeki kodları devre dışı bırakmanız önerilir. Bu fonksiyon tek kullanımlık olarak kurgulanmıştır.

## Resimler

<a href="https://github.com/atakanuludag/personal-blog-app/assets/6053742/9ef9b21b-6187-4121-8a15-d5ba47ae342b"  target="_blank"><img  src="https://github.com/atakanuludag/personal-blog-app/assets/6053742/9ef9b21b-6187-4121-8a15-d5ba47ae342b"  width="400"  /></a>
<a href="https://github.com/atakanuludag/personal-blog-app/assets/6053742/3c2230af-a295-4082-91a3-619b7736a47d"  target="_blank"><img  src="https://github.com/atakanuludag/personal-blog-app/assets/6053742/3c2230af-a295-4082-91a3-619b7736a47d"  width="400"  /></a>
<a href="https://github.com/atakanuludag/personal-blog-app/assets/6053742/34ffceb3-5980-4078-bc97-62ccf6101958"  target="_blank"><img  src="https://github.com/atakanuludag/personal-blog-app/assets/6053742/34ffceb3-5980-4078-bc97-62ccf6101958"  width="400"  /></a>
<a href="https://github.com/atakanuludag/personal-blog-app/assets/6053742/b34b5322-393a-4db8-8159-b333c9ab3a07"  target="_blank"><img  src="https://github.com/atakanuludag/personal-blog-app/assets/6053742/b34b5322-393a-4db8-8159-b333c9ab3a07"  width="400"  /></a>
<a href="https://github.com/atakanuludag/personal-blog-app/assets/6053742/8a5f80c9-a4c2-4f8a-bbc5-187551032c00"  target="_blank"><img  src="https://github.com/atakanuludag/personal-blog-app/assets/6053742/8a5f80c9-a4c2-4f8a-bbc5-187551032c00"  width="400"  /></a>
<a href="https://github.com/atakanuludag/personal-blog-app/assets/6053742/7bc44fdb-bce1-4e3d-99fe-2d18c7db229a"  target="_blank"><img  src="https://github.com/atakanuludag/personal-blog-app/assets/6053742/7bc44fdb-bce1-4e3d-99fe-2d18c7db229a"  width="400"  /></a>

## Katkıda Bulunma

Katkıda bulunmak isteyenler için yönergeler:

1. Forklayın.
2. Özellik dalınızı oluşturun (`git checkout -b feature/fooBar`).
3. Değişikliklerinizi commit edin (`git commit -am 'Feature: Add some fooBar'`).
4. Dalınızı push edin (`git push origin feature/fooBar`).
5. Yeni bir Pull Request oluşturun.
