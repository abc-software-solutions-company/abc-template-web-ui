# 🚀 Hướng dẫn Publish lên NPM

## Bước 1: Chuẩn bị tài khoản NPM

### Tạo tài khoản NPM (nếu chưa có)
```bash
# Truy cập https://www.npmjs.com/ để đăng ký tài khoản
```

### Login vào NPM CLI
```bash
npm login
# Nhập username, password, và email
```

### Xác minh login
```bash
npm whoami
# Nên hiển thị username của bạn
```

---

## Bước 2: Chuẩn bị Package

### Đảm bảo package.json đã đầy đủ thông tin
```json
{
  "name": "abc-ui-template-web",
  "version": "1.0.0",
  "description": "UI component library built with shadcn/ui and Tailwind CSS",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist", "src/globals.css"],
  "author": "ABC Company <dev@abc.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/abc-company/abc-ui-template-web.git"
  }
}
```

### Build package
```bash
npm run build
```

---

## Bước 3: Publish Package

### Publish công khai (Free)
```bash
npm publish
```

### Publish với tag cụ thể
```bash
npm publish --tag latest
npm publish --tag beta
npm publish --tag alpha
```

### Publish scoped package (Private)
```bash
# 1. Tạo organization trên npm
# 2. Thêm member vào org
# 3. Đổi tên package thành scoped
{
  "name": "@abc-company/ui-components"
}

# 4. Publish
npm publish --access public  # hoặc private
```

---

## Bước 4: Quản lý Package

### Cập nhật version
```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

### Deprecate version cũ
```bash
npm deprecate abc-ui-template-web@1.0.0 "Use version 2.0.0 instead"
```

### Xem thông tin package
```bash
npm view abc-ui-template-web
npm view abc-ui-template-web versions
npm view abc-ui-template-web downloads
```

---

## Bước 5: Sử dụng Package trong Công ty

### Cài đặt từ NPM
```bash
npm install abc-ui-template-web
# hoặc
npm install @abc-company/ui-components
```

### Cập nhật trong các dự án
```bash
npm update abc-ui-template-web
```

### CI/CD Integration
```yaml
# .github/workflows/publish.yml
name: Publish to NPM
on:
  release:
    types: [published]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org/'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 📋 Checklist trước khi Publish

- [ ] Build thành công: `npm run build`
- [ ] Test package: `npm pack` và test locally
- [ ] README.md đầy đủ
- [ ] Package.json có đủ thông tin
- [ ] Version chính xác
- [ ] Dependencies và peerDependencies đúng
- [ ] Files array chỉ include cần thiết
- [ ] License phù hợp

---

## 🔒 Bảo mật và Quyền riêng tư

### Scoped Private Packages (Có phí)
```bash
# Tạo scoped package
npm init --scope=@abc-company

# Publish private
npm publish --access private

# Chỉ member trong org mới có thể install
npm install @abc-company/ui-components
```

### Public Packages với Access Control
```bash
# Publish public nhưng chỉ admin có thể publish
npm publish --access public

# Sử dụng trong công ty bằng cách:
# 1. Internal documentation
# 2. VPN restrictions
# 3. License terms
```

---

## 🆘 Troubleshooting

### Lỗi "403 Forbidden"
```bash
# Package name đã tồn tại
npm view abc-ui-template-web
# Đổi tên package hoặc sử dụng scoped name
```

### Lỗi "You must be logged in"
```bash
npm login
npm whoami
```

### Lỗi "Package size too large"
```bash
# Kiểm tra files trong package
npm pack --dry-run
# Tối ưu .npmignore
```

### Lỗi version conflicts
```bash
# Kiểm tra version hiện tại
npm view abc-ui-template-web version
# Update version trong package.json
npm version patch
```

---

## 📞 Liên hệ

Nếu gặp vấn đề khi publish, hãy:
1. Kiểm tra [npm docs](https://docs.npmjs.com/)
2. Kiểm tra [GitHub Issues](https://github.com/abc-company/abc-ui-template-web/issues)
3. Liên hệ team DevOps