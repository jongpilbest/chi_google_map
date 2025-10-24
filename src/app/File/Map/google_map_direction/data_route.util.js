    export const route___go = async (origin,destination) => {
      const res = await fetch("/api/itineray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: { location: origin },
          destination: { location: destination },
          ...routeOptions,
        }),
      });

      const data = await res.json();
      const [route] = data.routes;
      return route;

    }