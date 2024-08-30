async function reverseGeocode(lat, lon) {
  const apiKey = "cd9f85c24a4f4150991a781e652016d7"; // Replace with your OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}&countrycode=lk`;

  const response = await fetch(url);
  const data = await response.json();
  if (data && data.results && data.results.length > 0) {
    const components = data.results[0].components;
    const city =
      components.city ||
      components.town ||
      components.village ||
      components.hamlet ||
      "Unknown";
    return city;
  } else {
    throw new Error("Reverse geocoding failed");
  }
}

export async function findLocation(lat, lon) {
  try {
    const locationName = await reverseGeocode(parseFloat(lat), parseFloat(lon));
    document.getElementById(
      "result"
    ).innerText = `Location Name: ${locationName}`;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText =
      "Error fetching location name.";
  }
}
