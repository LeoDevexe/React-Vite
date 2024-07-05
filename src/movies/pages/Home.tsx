import { Suspense } from "react";
import { CarouselSuspense } from "../components/Carousel";
import { MainLayout } from "../layout";

export default function Home() {
  return (
    <MainLayout>
      <Suspense fallback={<h1>Cargando..</h1>}>
        <CarouselSuspense title="Lo más visto" slug="trending/all/week?" />
        <CarouselSuspense title="Infantiles" slug="discover/movie?with_genres=16&" />
        <CarouselSuspense title="Lo más nuevo" slug="discover/movie??with_genres=12&" />
        <CarouselSuspense title="Acción" slug="discover/movie?with_genres=18&" />
        <CarouselSuspense title="Variedad" slug="discover/movie?with_genres=14&" />
      </Suspense>
    </MainLayout>
  );
}
