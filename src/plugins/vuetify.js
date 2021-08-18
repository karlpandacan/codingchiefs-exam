import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#00539c',
        accent: '#000000',
        secondary: '#FFD662',
        success: '#4CAF50',
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
        bannercolor: '#FFFFFF'
      },
      dark: {
        primary: '#00539c',
        secondary: '#FFD662',
      }
    },
  },
  icons: {
    iconfont: 'mdiSvg',
  },
});
