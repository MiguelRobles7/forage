export async function fetchRestaurant(id = null) {
  const endpoint = id ? `/api/restaurants/${id}` : '/api/restaurants/'
  const restaurantFetch = useFetch(endpoint, { immediate: false })
  await restaurantFetch.execute({ _initial: true })

  return restaurantFetch.data.value.restaurants
}

export async function fetchMenu(restaurantId) {
  const menuFetch = useFetch(`/api/menu/${restaurantId}`, { immediate: false })
  await menuFetch.execute({ _initial: true })

  return menuFetch.data.value.menu_items
}

export async function searchRestaurants(query) {
  const restaurants = await fetchRestaurant()
  return restaurants.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
}
