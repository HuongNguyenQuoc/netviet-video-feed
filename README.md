Công nghệ sử dụng:
Next.js App Router
TypeScript
Tailwind CSS
HTML <video>
Intersection Observer API
Vercel

Logic Play/Pause

Mỗi video card sử dụng useRef để tham chiếu trực tiếp tới thẻ HTML <video>.

Khi người dùng click vào video, ứng dụng sẽ kiểm tra video hiện tại đang tạm dừng hay đang phát. Nếu video đang tạm dừng, ứng dụng gọi video.play() để phát video. Nếu video đang phát, ứng dụng gọi video.pause() để tạm dừng video.

Đối với tính năng tự động phát/dừng khi cuộn trang, ứng dụng sử dụng Intersection Observer API. Mỗi video card được theo dõi trong viewport. Khi một video card hiển thị ít nhất 70% trên màn hình, video đó sẽ tự động phát. Khi video bị cuộn qua và không còn hiển thị đủ trong viewport, video sẽ tự động dừng.
