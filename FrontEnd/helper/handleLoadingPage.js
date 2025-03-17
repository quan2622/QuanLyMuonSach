import { ElLoading } from "element-plus";

export default function reloadPage() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Đang tải',
    background: 'rgba(0, 0, 0, 0.3)',
  })
  setTimeout(() => {
    loading.close()
  }, 400);
}
