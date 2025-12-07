import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("catalog", "routes/catalog.tsx"),
  route("product/:id", "routes/product.$id.tsx"),
  route("admin", "routes/admin.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
