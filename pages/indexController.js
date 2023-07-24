export default {
  data() {
    return {
      restaurants: [],
      doneLoading: false
    }
  },
  async mounted() {
    const restaurantsFetch = useFetch('/api/restaurants/', {immediate: false});   
    await restaurantsFetch.execute({ _initial: true });
    this.restaurants = restaurantsFetch.data.value.restaurants;
    this.doneLoading = true;
  }
}