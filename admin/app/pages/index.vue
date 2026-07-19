<script>
const userPassword = ref("");
const userEmail = ref("");
</script>

<template>
  <h1>Admin Panel</h1>
  <div class="loginForm">
    <div class="group">
      <label for="userEmail">Email</label>
      <input type="email" :value="userEmail" id="userEmail" />
    </div>
    <div class="group">
      <label for="userPassword">Password</label>
      <input type="password" :value="userPassword" id="userPassword" />
    </div>
    <button>Login</button>
  </div>
</template>

<style lang="scss">
body {
  background: var(--background);
  color: var(--text);
  font-family: "Fixel";
  justify-content: center;
  align-items: center;
  display: flex;

  h1 {
    justify-self: center;
  }

  .loginForm {
    padding: 10px;
    border: 2px solid var(--text);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    .group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: start;
      gap: 2px;

      label {
        color: var(--dimmed-text);
      }

      input {
        padding: 8px 8px;
        color: var(--text);
        background: var(--background);
        border: 2px solid var(--text);
        border-radius: 4px;
      }
    }

    button {
      border: 2px solid var(--text);
      border-radius: 4px;
      background: var(--background);
      color: var(--text);
      padding: 4px 16px;
      font-size: 16px;
      font-weight: 500;
      transition: 0.1s linear all;
      font-family: "Fixel";
      margin-top: 12px;

      &:hover {
        background: var(--text);
        color: var(--background);
        transition: 0.1s linear all;
      }
    }
  }
}
</style>
