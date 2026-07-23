<script setup>
import { ref, onMounted, computed } from "vue";
import { m } from "../paraglide/messages";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";

const userAccount = ref(null);
const currentUser = computed(() => userAccount.value?.data?.user ?? null);

onMounted(async () => {
  const session = await authClient.getSession();
  userAccount.value = session;
});

const userSubmissionUrl = ref("");
const userSubmissionOpinion = ref("");

function emptyInputs() {
  userSubmissionUrl.value = "";
  userSubmissionOpinion.value = "";
}

async function submitForm() {
  const res = await fetch("http://localhost:3000/api/website/suggest", {
    method: "POST",
    body: JSON.stringify({
      url: userSubmissionUrl.value,
      body: userSubmissionOpinion.value,
    }),
    credentials: "include",
  }).then((r) => r.json());

  if (res.success == false && res.success != undefined) {
    emptyInputs();
    toast.error("Failed to submit", { message: res.message });
  } else if (res.success == true) {
    emptyInputs();
    toast.success("Submission successful!");
  } else {
    emptyInputs();
    console.error(res);
    toast.error("Unknown exception", { message: "Check the console for the response object." });
  }
}
</script>

<template>
  <form class="websiteForm" @submit.prevent="submitForm" v-if="currentUser">
    <div class="inputField">
      <label for="websiteUrl">{{ m.contribute_suggestion_form_websiteUrl() }}</label>
      <input
        type="text"
        name="url"
        id="websiteUrl"
        v-model="userSubmissionUrl"
        :placeholder="m.contribute_suggestion_form_websiteUrl_placeholder()"
      />
    </div>
    <div class="inputField">
      <label for="reason">{{ m.contribute_suggestion_form_opinion() }}</label>
      <textarea
        name="body"
        rows="4"
        id="reason"
        maxlength="1024"
        v-model="userSubmissionOpinion"
        :placeholder="m.contribute_suggestion_form_opinion_placeholder()"
      ></textarea>
    </div>
    <input type="submit" :value="m.contribute_suggestion_form_submit()" />
  </form>
  <div v-else class="notLoggedIn">
    <p>Please login to submit websites</p>
    <a href="/user/login" target="_blank" rel="noopener noreferrer">Login</a>
  </div>
</template>

<style lang="scss" scoped>
.notLoggedIn {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 50%;

  p {
    font-size: 18px;
    font-weight: 400;
    font-style: italic;
  }

  a,
  [type="submit"],
  button {
    width: auto;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    gap: 2px;
    font-weight: 600;
    font-size: 16px;
    background: var(--background);
    border: var(--text) 2px solid;
    padding: 6px 12px;
    border-radius: 4px;
    color: var(--text);
    transition: all 0.2s ease;

    &:hover {
      background: var(--text);
      color: var(--background);
      transition: all 0.1s ease;
    }
  }
}

.websiteForm {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 50%;

  .inputField {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--background);
      border: var(--text) 2px solid;
      padding: 6px;
      border-radius: 4px;
      color: var(--text);
      resize: none;
    }
  }

  a,
  [type="submit"],
  button {
    width: auto;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    gap: 2px;
    font-weight: 600;
    font-size: 16px;
    background: var(--background);
    border: var(--text) 2px solid;
    padding: 6px 12px;
    border-radius: 4px;
    color: var(--text);
    transition: all 0.2s ease;

    &:hover {
      background: var(--text);
      color: var(--background);
      transition: all 0.1s ease;
    }
  }
}
</style>
