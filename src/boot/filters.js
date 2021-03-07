// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar -cli/boot-files
export default ({ app, router, Vue}) => {
  Vue.filter('capitalize', (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
  
  Vue.prototype.$filters = Vue.options.filters;
}
