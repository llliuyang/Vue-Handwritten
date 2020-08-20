import createRouteMap from "./create-route-map";
import { createRoute } from './history/base'

export default function createMatcher(routes) {
  let { pathMap } = createRouteMap(routes)

  function addRoutes(routes) {
    createRouteMap(routes, pathMap)
  }
  function match(location) {
    let record = pathMap[location]
    if (record) {
      return createRoute(record, {
        path: location
      })
    }
    return createRoute(null, {
      path: location
    })
  }
  return {
    addRoutes,
    match
  }
}