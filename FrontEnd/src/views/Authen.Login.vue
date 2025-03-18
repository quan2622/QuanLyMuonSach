<script>
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    setTimeout(() => {
      const redirectPath =  `/login?redirect=${route.query.redirect}`;
      router.replace(redirectPath);
    }, 1500);

    return {};
  },
}
</script>

<template>
  <main>
    <div class="authen">
      <div class="authen-content">
        <h3>
          Ôiii không! Vui lòng hãy <a href="/login">đăng nhập</a> rồi truy cập lại bạn nhé.🤗
        </h3>
        <p>Bạn sẽ được chuyển hướng sau vài giây ...</p>
      </div>
    </div>
  </main>
</template>