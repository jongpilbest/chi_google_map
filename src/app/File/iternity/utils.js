 const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return null;
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainSeconds}s`;
  };

  function haversineDistance(p1, p2) {
  const R = 6371; // 지구 반지름 (단위: km)
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(p2[0] - p1[0]);
  const dLon = toRad(p2[1] - p1[1]);
  const lat1 = toRad(p1[0]);
  const lat2 = toRad(p2[0]);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // km 단위 거리
}
  function makeOrderedRoute(points) {
  if (points.length <= 2) return points;


  // ✅ Haversine 기반 거리 계산
  let maxDist = 0;
  let endpoints = [null, null];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = haversineDistance(points[i], points[j]) **2;
      if (dist > maxDist) {
        maxDist = dist;
        endpoints = [points[i], points[j]];
      }
    }
  }

  const [origin, destination] = endpoints;

  // ✅ 중간 포인트를 출발점에서의 거리순으로 정렬
  const middlePoints = points
    .filter(
      (p) => !(p[0] === origin[0] && p[1] === origin[1]) &&
             !(p[0] === destination[0] && p[1] === destination[1])
    )
    .map((p) => ({
      point: p,
      dist: haversineDistance(origin, p),
    }))
    .sort((a, b) => a.dist - b.dist)
    .map((d) => d.point);

     
  return [origin, ...middlePoints, destination];
}
