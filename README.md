# ABC UI Template Web

Một thư viện UI components được xây dựng với shadcn/ui và Tailwind CSS.

## Cài đặt

```bash
npm install abc-ui-template-web
```

## Yêu cầu

- React >= 17
- Tailwind CSS >= 3.0.0

## Sử dụng

### 1. Import CSS

Trong file CSS chính của dự án (thường là `globals.css` hoặc `index.css`):

```css
@import 'abc-ui-template-web/src/globals.css';
```

### 2. Cấu hình Tailwind CSS

Trong `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... các file khác
    "./node_modules/abc-ui-template-web/**/*.{js,ts,jsx,tsx}",
  ],
  // ... cấu hình khác
}
```

### 3. Sử dụng Components

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon
} from 'abc-ui-template-web';

function App() {
  return (
    <div>
      <Button>Click me</Button>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
      </Card>

      <Input placeholder="Enter text..." />

      <Badge variant="default">New</Badge>

      <Alert variant="success">
        <AlertIcon variant="success" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your changes have been saved.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

## Components có sẵn

- **Button**: Nút với nhiều variant (default, destructive, outline, secondary, ghost, link) và size (default, sm, lg, icon)
- **Card**: Container component với CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Input**: Input field với styling nhất quán
- **Badge**: Badge component cho labels và status với variants (default, secondary, destructive, outline)
- **Alert**: Alert component cho notifications với variants (default, destructive, success, warning) và icons

## Phát triển

```bash
# Cài đặt dependencies
npm install

# Chạy build
npm run build

# Chạy dev mode
npm run dev

# Kiểm tra TypeScript
npm run lint

# Chạy Storybook
npm run storybook
```

## Storybook

Thư viện có Storybook để xem và test các component:

- **Button**: Các variant (default, destructive, outline, secondary, ghost, link) và sizes (sm, default, lg, icon)
- **Card**: Các layout khác nhau với header, content, footer

Truy cập: http://localhost:6006 sau khi chạy `npm run storybook`

## Demo

Xem file `demo.html` để thấy ví dụ sử dụng các component với CSS thuần.

## Xuất bản

```bash
npm publish
```

## Build Storybook (Optional)

Để build Storybook thành static files:

```bash
npm run build-storybook
```