<template>
  <footer class="footer" :class="nightMode ? 'footer-night' : ''">
    <div class="row">
      <div class="footer-logo">
        <img src="@/assets/logo.png" width="150px" alt="" class="logo" />
      </div>
      <div class="links-container">
        <div class="social-links" v-for="link in links">
          <a class="link" :href="link?.url" target="_blank">
            <img
              width="30px"
              :src="require(`@/assets/footer/${link?.icon}`)"
              v-if="!nightMode"
            />
            <img
              width="30px"
              :src="require(`@/assets/footer/${link?.iconNight}`)"
              v-else
            />
            <p :class="nightMode ? 'link-text-night' : 'link-text'">{{ link?.name }}</p>
          </a>
        </div>
      </div>
      <h3>Phanes Network</h3>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";
import { Icon } from "@iconify/vue2";
export default {
  name: "FooterComp",
  components: {
    Icon,
  },
  data() {
    return {
      links: [
        {
          url: "https://docs.phanes.network/",
          name: "Docs",
          icon: "doc.svg",
          iconNight: "docNight.svg",
        },
        {
          url: "https://t.me/phanesnetwork",
          name: "Telegram",
          icon: "telegram.svg",
          iconNight: "telegramNight.svg",
        },
        {
          url: "https://twitter.com/phanes_network",
          name: "Twitter",
          icon: "twitter.svg",
          iconNight: "twitterNight.svg",
        },
        {
          url: "https://github.com/PhanesNetwork",
          name: "Github",
          icon: "github.svg",
          iconNight: "githubNight.svg",
        },
      ],
    };
  },
  computed: {
    ...mapState(["nightMode"]),
  },
};
</script>

<style lang="scss" scoped>
.links-container {
        display: flex;
        gap: 16px;    
      }
       .social-links {
            display: block;        
        }
         .link {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
.footer {
  background: linear-gradient(
    rgba(10, 134, 156, 0.05),
    rgba(10, 134, 156, 0.034)
  );
  padding: 20px 18px;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-logo {
      
    }

    
    h3 {
        color: #0a869c;
    }
  }
}
.footer-night {
  background: #08241F;
  backdrop-filter: blur(20px); 

}
.link-text-night {
    color: white;
}
.link-text {
      font-size: 14px;
      line-height: 16px;
      color: #0a869c;
    }
</style>
